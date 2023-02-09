import { render } from "@testing-library/react-native";
import LoadingComponent from "../components/loading/loading.component";
import { expect } from "@jest/globals";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { hide, show } from "../store/loading/loading.actions";

describe("loading component", () => {
  it("should hide loading component when not loading", () => {
    const component = render(
      <Provider store={store}>
        <LoadingComponent />
      </Provider>
    );

    store.dispatch(hide());

    const loading = component.queryAllByTestId("loadingComponent");

    expect(loading.length).toEqual(0);
  });

  it("should show loading component when loading", () => {
    const component = render(
      <Provider store={store}>
        <LoadingComponent />
      </Provider>
    );

    store.dispatch(show());

    const loading = component.queryAllByTestId("loadingComponent");

    expect(loading.length).toEqual(1);
  });
});
