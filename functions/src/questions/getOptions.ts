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
    const fieldSetId = req.params.fieldSetId;
    const fieldSetDocRef = db.doc(`options/${fieldSetId}`);
    const fieldSetDoc = await fieldSetDocRef.get();

    const docData = fieldSetDoc.data();

    const sendBack = docData ? docData : {};

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getOptions;

