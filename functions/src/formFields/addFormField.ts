/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";
import { firestore } from "firebase-admin";

export const addFormField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sectionId = req.params.sectionId;
  const requestBody = req.body;
  const newFieldSetDocRef = db
    .collection("formFields")
    .doc();
  const formSectionDocRef = db.doc(`formSection/${sectionId}`);
  const optionsDocRef = db.doc(`fieldOptions/${formSectionDocRef.id}`);

  try {
    const dataWrites = [
      newFieldSetDocRef.create(requestBody),
      optionsDocRef.create({}),
      formSectionDocRef.update({
        fieldOrder: firestore.FieldValue.arrayUnion(newFieldSetDocRef.id),
      }),
    ];
    const allWrites = await Promise.all(dataWrites);

    const sendBack = {
      docId: newFieldSetDocRef.id,
      allWrites,
    };

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.createFieldSet;
