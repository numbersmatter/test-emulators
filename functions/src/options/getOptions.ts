/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";

export const getOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formFieldId = req.params.formFieldId;
    const formFieldOptionsDocRef = db.doc(`fieldOptions/${formFieldId}`);
    const formFieldOptionDoc = await formFieldOptionsDocRef.get();

    const docData = formFieldOptionDoc.data();

    const sendBack = docData ? docData : {};

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getOptions;

