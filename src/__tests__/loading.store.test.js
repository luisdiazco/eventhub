import { expect } from "@jest/globals";
import { createAction } from "@reduxjs/toolkit";
import { hide, show } from "../store/loading/loading.actions";
import { loadingReducer } from "../store/loading/loading.reducers";

describe("loading store", () => {
  it("show", () => {
    const initialState = { show: false };
    const newState = loadingReducer(initialState, show);

    expect(newState).toEqual({ show: true });
  });
  it("hide", () => {
    const initialState = { show: true };
    const newState = loadingReducer(initialState, hide);

    expect(newState).toEqual({ show: false });
  });
  it("should keep state if action is unknown", () => {
    const initialState = { show: true };
    const action = createAction("UNKNOWN");
    const newState = loadingReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
