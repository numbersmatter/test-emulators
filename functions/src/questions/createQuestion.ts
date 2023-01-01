/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from "express";
import { db } from "../firebase";

export const createQuestion: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;

  try {
    const saveQuestion = await newQuestionRef.set(sentData);
    return res.status(200).json({
      questionId: newQuestionRef.id,
      writeTime: saveQuestion.writeTime.valueOf(),
    });
  } catch (error) {
    return next(error);
  }
};
export const updateQuestion: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const questionId = req.params.questionId;
  const questionDocRef = db.doc(`questions/${questionId}`);
  const sentData = req.body;
  console.log(questionId);
  console.log(sentData);
  try {
    const updateQuestion = await questionDocRef.update(sentData);
    return res.status(200).json({
      writeTime: updateQuestion.writeTime.valueOf(),
    });
  } catch (error) {
    return next(error);
  }
};
export const getQuestionById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const questionId = req.params.questionId;
  const docRef = db.doc(`/questions/${questionId}`);

  try {
    const docSnap = await docRef.get();
    const docData = docSnap.data();

    if (!docData) {
      return res.status(404).json({
        error: { name: "Not Found", message: "No question by that ID found." },
      });
    }

    return res.status(200).json(docData);
  } catch (error) {
    return next(error);
  }
};
