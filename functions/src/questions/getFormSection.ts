/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";

export const getFormSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formSectionId = req.params.sectionId;
    const formSectionDocRef = db.doc(`formSection/${formSectionId}`);
    const formSectionDoc = await formSectionDocRef.get();

    const docData = formSectionDoc.data();

    const sendBack = docData ? docData : {};

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getFormSection;
