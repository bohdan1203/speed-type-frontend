import { Result } from "./Result";

export interface Text {
  _id: string;
  createdBy: string;
  content: string;
  results: Result[];
}
