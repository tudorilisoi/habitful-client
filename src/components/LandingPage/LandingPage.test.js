import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import { HabitContextProvider } from "../../context/HabitContext";

it(`LandingPage renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});