import express from "express";
import { submitTestController } from "../controllers/test.controller";
import { isAutheticated } from "../middleware/auth";

const testRouter = express.Router();

// Route gửi câu trả lời và tính điểm, xác định level người dùng
testRouter.post(
  "/submit-test",
  isAutheticated,
  submitTestController
);

export default testRouter;
