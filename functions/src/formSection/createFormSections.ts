/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { dbFolders } from "../constants";
import { db } from "../firebase";

export const createFormSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  const newFormSectionDocRef = db.collection(dbFolders.sections).doc();

  try {
    const dataWrite = await newFormSectionDocRef.create(requestBody);

    const sendBack = {
      docId: newFormSectionDocRef.id,
      dataWrite,
    };

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.createFormSection;
