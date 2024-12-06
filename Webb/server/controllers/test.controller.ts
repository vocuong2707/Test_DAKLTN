import UserModel from "../models/user.model";
import QuestionModel from "../models/question.model";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// Hàm xác định cấp độ người dùng dựa trên điểm
const determineLevel = (score: number): string => {
  if (score < 5) return "Beginner";
  if (score >= 5 && score < 8) return "Intermediate";
  return "Advanced";
};

// Nhận câu trả lời từ phía người dùng và tính điểm
export const submitTestController = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { userId, answers } = req.body;
  console.log('====================================');
  console.log("userId: " , userId);
  console.log("Answer: " , answers);
  console.log('====================================');
  try {
    // Lấy thông tin câu hỏi từ cơ sở dữ liệu
    const questionIds = answers.map((answer: any) => answer.questionId);
    const questions = await QuestionModel.find({ _id: { $in: questionIds } });
    // Tính điểm dựa vào câu trả lời đúng
    let score = 0;

    answers.forEach((userAnswer: any) => {
      const question = questions.find((q) => q._id.toString() === userAnswer.questionId);
      if (question && question.correctAnswer === userAnswer.answer) {
        score += 1; // Điểm cộng 1 nếu câu trả lời đúng
      }
    });

    // Dựa vào điểm tính level
    const level = determineLevel(score);

    // Cập nhật level người dùng
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { level },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Test submitted successfully.",
      score,
      level,
    });
  } catch (error: any) {
    return next(error);
  }
});
