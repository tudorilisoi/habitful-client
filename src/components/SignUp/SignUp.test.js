import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import { HabitContextProvider } from "../../context/HabitContext";

it(`SignUp renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});