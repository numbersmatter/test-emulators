/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { firestore } from "firebase-admin";

import { db } from "../firebase";

export const addOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fieldSet = req.params.fieldSetId;
  const fieldSetRef = db.doc(`options/${fieldSet}`);
  const testId = db.collection("uuid").doc().id;
  const requestBody = req.body;
  const label: string = requestBody.optionLabel ?? "";

  try {
    const newOption =
      {
        label: label,
        value: testId,
      };
    const otherOption = firestore.FieldValue.arrayUnion(testId);
    const optionKey = `options.${testId}`;

    const data = { optionOrder: otherOption, [optionKey]: newOption };
    const write = await fieldSetRef.update(data);
    return res.status(201).json(write);
  } catch (error) {
  return res.status(500).json({ data: {}, error: error});
  }
};

exports.addOption;
