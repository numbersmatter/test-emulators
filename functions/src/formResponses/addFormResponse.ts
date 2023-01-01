/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";

export const addFormResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  const newResponseDoc = db.collection("formResponse").doc();

  try {
    const dataWrite = await newResponseDoc.create(requestBody);

    const sendBack = {
      docId: newResponseDoc.id,
      dataWrite,
    };

    return res.json(sendBack);
  } catch (error: any) {
    return res.status(400).json({ data: "some data", errorM: error.message });
  }
};

exports.addFormResponse;
