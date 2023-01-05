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
import { createFormSection } from "./questions/createFormSection";
import { getFormSection } from "./questions/getFormSection";
import { getFieldSets } from "./questions/getFieldSets";
import { createFieldSet } from "./questions/createFieldSet";
import { addOption } from "./questions/addOption";
import { getOptions } from "./questions/getOptions";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ status: "success" });
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  throw new Error("this is error");
});

app.post("/questions", createQuestion);
app.get("/questions/:questionId", getQuestionById);
app.post("/questions/:questionId/edit", updateQuestion);
app.post("/form", addFormResponse );
app.post("/section", createFormSection);
app.get("/section/:sectionId", getFormSection);
app.get("/fieldSets/:sectionId", getFieldSets);
app.post("/fieldSets/:sectionId/:fieldSetId", addOption);
app.post("/options/:fieldSetId", addOption);
app.get("/options/:fieldSetId", getOptions);
// app.get("/fieldSets/:sectionId/:fieldSetId", ()=>{

// });
app.post("/fieldSets/:sectionId", createFieldSet);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const text = err.message;
  res.status(500).json({ error: "from middleware", errorMessage: text });
});

exports.app = functions.https.onRequest(app);
