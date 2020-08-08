import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HabitCard from "./HabitCard";
import { HabitContextProvider } from "../../context/HabitContext";

it(`HabitCard renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <HabitCard />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});