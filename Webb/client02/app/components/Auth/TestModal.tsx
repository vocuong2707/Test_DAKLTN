import React, { useState } from "react";

type Props = {
  onComplete: (newLevel: string) => void;
};

const TestModal: React.FC<Props> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);

    let newLevel = "Beginner";
    if (totalScore > 5) newLevel = "Intermediate";
    if (totalScore > 10) newLevel = "Advanced";

    onComplete(newLevel);
  };

  return (
    <div className="modal">
      <h2>Bài Test Xác Định Level</h2>
      <div>
        <p>Câu hỏi 1: Bạn có biết React không?</p>
        <button onClick={() => handleAnswer(0, 1)}>Không</button>
        <button onClick={() => handleAnswer(0, 3)}>Có</button>
      </div>
      <div>
        <p>Câu hỏi 2: Bạn có kinh nghiệm với JavaScript không?</p>
        <button onClick={() => handleAnswer(1, 2)}>Không</button>
        <button onClick={() => handleAnswer(1, 4)}>Có</button>
      </div>
      <button onClick={handleSubmit}>Hoàn Thành</button>
    </div>
  );
};

export default TestModal;
