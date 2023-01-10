import {NextFunction, Request, Response} from "express";
import {dbFolders} from "../constants";
import {db} from "../firebase";


export const getAllSections = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
  const sectionsRef = db.collection(dbFolders.sections);
  const sectionsSnapshot = await sectionsRef.get();

  const sectionSnapArray = sectionsSnapshot.docs.map((doc) => {
    const data = doc.data();
    const label = data?.["sectionTitle"] ?? "not found";
    const fieldObj = {value: doc.id, label: label};
    return fieldObj;
  });

  const sections:unknown []=sectionSnapArray;
  return response.json({sections});
};

exports.getAllSections;
