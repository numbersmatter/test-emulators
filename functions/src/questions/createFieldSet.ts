/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";
import { firestore } from "firebase-admin";

export const createFieldSet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sectionId = req.params.sectionId;
  const requestBody = req.body;
  const newFieldSetDocRef = db
    .collection(`formSection/${sectionId}/fieldSets`)
    .doc();
  const formSectionDocRef = db.doc(`formSection/${sectionId}`);

  try {
    const dataWrite = await newFieldSetDocRef.create(requestBody);
    const updateArray = await formSectionDocRef.update({
      fieldSetOrder: firestore.FieldValue.arrayUnion(newFieldSetDocRef.id),
    });

    const sendBack = {
      docId: newFieldSetDocRef.id,
      updateArray: updateArray.writeTime,
      dataWrite,
    };

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.createFieldSet;
