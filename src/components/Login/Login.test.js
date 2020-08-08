import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { HabitContextProvider } from "../../context/HabitContext";

it(`Login renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});