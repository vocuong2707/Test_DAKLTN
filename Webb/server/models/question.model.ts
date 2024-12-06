import mongoose, { Document, Schema, Model } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const QuestionSchema: Schema<IQuestion> = new Schema({
  questionText: {
    type: String,
    required: [true, "Please provide the question text."],
  },
  options: {
    type: [String],
    required: [true, "Please provide the answer options."],
  },
  correctAnswer: {
    type: String,
    required: [true, "Please specify the correct answer."],
  },
}, { timestamps: true });

const QuestionModel: Model<IQuestion> = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
