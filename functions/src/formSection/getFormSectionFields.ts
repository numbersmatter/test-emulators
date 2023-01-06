/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";

export const getFormSectionFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formSectionId = req.params.sectionId;
    const formSectionDocRef = db.doc(`formSection/${formSectionId}`);
    const formSectionDoc = await formSectionDocRef.get();
    const docData = formSectionDoc.data();

    const fieldSetOrder = docData?.fieldOrder ?? [];
    // make an array of promises
    const p = fieldSetOrder.map((fieldId: string) =>
      db.doc(`formFields/${fieldId}`).get()
    );
    // wait for all promises to resolve
    const fieldSnapArray = await Promise.all(p);

    const fieldArray = fieldSnapArray.map((snap)=> {
      const obj = { id: snap.id, ...snap.data()};
      return obj;
    });


    // reduce to an object

    return res.json(fieldArray);
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getFormSectionFields;
