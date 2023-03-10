/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";
import { firestore } from "firebase-admin";

export const deleteOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  const optionValue = requestBody?.deleteId ?? "";
  try {
    const formFieldId = req.params.formFieldId;
    const formFieldDocRef = db.doc(`formFields/${formFieldId}`);
    const docSnap = await formFieldDocRef.get();
    const docData = docSnap.data();
    const optionsObject = docData?.options ?? {};
    delete optionsObject[optionValue];
    const newOptionOrder = firestore.FieldValue.arrayRemove(optionValue);
    const writePost = await formFieldDocRef.update({
      optionOrder: newOptionOrder,
      options: optionsObject,
    });
    return res.json({writePost, optionValue});
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.deleteOption;
