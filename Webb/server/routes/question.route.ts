import express from "express";
import {
  createQuestionController,
  getAllQuestionsController,
  updateQuestionController,
  deleteQuestionController,
} from "../controllers/question.controller";
import { isAutheticated, authorizaRoles } from "../middleware/auth";

const questionRouter = express.Router();

// Route: Tạo câu hỏi mới (Chỉ admin mới được phép)
questionRouter.post(
  "/create-question",
  isAutheticated,
  authorizaRoles("admin"),
  createQuestionController
);

// Route: Lấy danh sách câu hỏi
questionRouter.get(
  "/get-all-questions",
  isAutheticated,
  getAllQuestionsController
);

// Route: Cập nhật thông tin câu hỏi
questionRouter.put(
  "/update/:id",
  isAutheticated,
  authorizaRoles("admin"),
  updateQuestionController
);

// Route: Xóa câu hỏi theo ID
questionRouter.delete(
  "/delete/:id",
  isAutheticated,
  authorizaRoles("admin"),
  deleteQuestionController
);

export default questionRouter;
