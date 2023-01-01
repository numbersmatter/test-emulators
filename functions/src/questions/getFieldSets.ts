/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { firestore } from "firebase-admin";
import { db } from "../firebase";

export const getFieldSets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formSectionId = req.params.sectionId;
    const fieldSetsCollRef = db.collection(
      `formSection/${formSectionId}/fieldSets`
    );
    const formSectionDoc = await fieldSetsCollRef.get();

    const docs = formSectionDoc.docs;

    const fieldSets = docs.reduce(
      (acc: { [key: string]: firestore.DocumentData }, cur) => {
        const key = cur.id;
        const data = {id: cur.id, ...cur.data()};
        acc[key] = data;
        return acc;
      },
      {}
    );


    return res.json({ fieldSets});
  } catch (error: any) {
    return res.status(400).json({ data: {}, error: error.message });
  }
};

exports.getFieldSets;
