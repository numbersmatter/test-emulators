/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
// import { firestore } from "firebase-admin";
import { db } from "../firebase";

export const getFormField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formFieldId = req.params.formFieldId;
  try {
    const formFieldDocRef = db.doc(`formFields/${formFieldId}`);
    const formFieldDoc = await formFieldDocRef.get();

    const formField = formFieldDoc.data() ?? {};
    // const docs = formSectionDoc.docs;

    // const fieldSets = docs.reduce(
    //   (acc: { [key: string]: firestore.DocumentData }, cur) => {
    //     const key = cur.id;
    //     const data = { id: cur.id, ...cur.data() };
    //     acc[key] = data;
    //     return acc;
    //   },
    //   {}
    // );

    return res.json({ formField });
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getFieldSets;
