import { Request, Response, NextFunction } from "express";
import QuestionModel from "../models/question.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// Tạo câu hỏi mới
export const createQuestionController = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { questionText, options, correctAnswer } = req.body;

  const newQuestion = await QuestionModel.create({
    questionText,
    options,
    correctAnswer,
  });

  res.status(201).json({
    success: true,
    message: "Question created successfully.",
    question: newQuestion,
  });
});

// Lấy danh sách câu hỏi
export const getAllQuestionsController = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const questions = await QuestionModel.find();

  res.status(200).json({
    success: true,
    questions,
  });
});

// Cập nhật thông tin câu hỏi
export const updateQuestionController = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedQuestion) {
    return res.status(404).json({ success: false, message: "Question not found." });
  }

  res.status(200).json({
    success: true,
    message: "Question updated successfully.",
    question: updatedQuestion,
  });
});

// Xóa câu hỏi theo ID
export const deleteQuestionController = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

  if (!deletedQuestion) {
    return res.status(404).json({ success: false, message: "Question not found." });
  }

  res.status(200).json({
    success: true,
    message: "Question deleted successfully.",
    question: deletedQuestion,
  });
});
