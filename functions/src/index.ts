/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { functions } from "./firebase";
import * as express from "express";
import type { Request, Response, NextFunction } from "express";
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from "./questions/createQuestion";
import { addFormResponse } from "./formResponses/addFormResponse";
import { createFormSection } from "./formSection/createFormSections";
import { getFormSection } from "./formSection/getFormSections";
import { getFormField } from "./formFields/getFormField";
import { addFormField } from "./formFields/addFormField";
import { addOption } from "./options/addOption";
import { getOptions } from "./options/getOptions";
import { deleteOption } from "./options/deleteOption";
import { getFormSectionFields } from "./formSection/getFormSectionFields";
import { getAllSections } from "./formSection/getAllSections";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ status: "success" });
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  throw new Error("this is error");
});

// formSections
app.get("/sections", getAllSections);
app.post("/sections", createFormSection);
app.get("/sections/:sectionId", getFormSection);
app.get("/sections/:sectionId/formFields", getFormSectionFields);
app.post("/sections/:sectionId/formFields", addFormField);


// formFields
app.get("/formFields/:formFieldId", getFormField);


// options
app.post("/options/:formFieldId", addOption);
app.get("/options/:formFieldId", getOptions);
app.post("/options/:formFieldId/delete", deleteOption);


app.post("/questions", createQuestion);
app.get("/questions/:questionId", getQuestionById);
app.post("/questions/:questionId/edit", updateQuestion);
app.post("/form", addFormResponse );
// app.get("/fieldSets/:sectionId/:fieldSetId", ()=>{

// });


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const text = err.message;
  res.status(500).json({ error: "from middleware", errorMessage: text });
});

exports.app = functions.https.onRequest(app);
