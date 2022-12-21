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

  // const newQuestionData = {
  //   "label": label,
  //   "prompt": prompt,
  //   "placeholder": placeholder,
  //   "defaultValue": defaultValue,
  //   "questionType": questionType,
  // };

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
