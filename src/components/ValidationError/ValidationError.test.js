import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ValidationError from "./ValidationError";
import { HabitContextProvider } from "../../context/HabitContext";

describe("ValidationError Page", () => {
  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <HabitContextProvider>
        <BrowserRouter>
          <ValidationError />
        </BrowserRouter>
      </HabitContextProvider>
      ,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});