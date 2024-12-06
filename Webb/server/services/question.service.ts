import QuestionModel from "../models/question.model";

// Fetch all questions with pagination
export const getAllQuestionsService = async (page: number, limit: number) => {
  const questions = await QuestionModel.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  return questions;
};

// Create a new question
export const createQuestionService = async (data: any) => {
  const question = await QuestionModel.create(data);
  return question;
};

// Update question logic
export const updateQuestionService = async (id: string, updateData: any) => {
  const question = await QuestionModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  return question;
};
