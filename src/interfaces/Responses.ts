import { Result } from "./Result";

export interface NewResultResponse {
  message: string;
  newResult: Result;
  isNewBestUserSpeedResult: boolean;
}

export interface AllResultsResponse {
  message: string;
  results: Result[];
}
