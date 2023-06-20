import { useDispatch } from "react-redux";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../app/store";

function useDispatchWithTypes() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();

  return dispatch;
}

export default useDispatchWithTypes;
