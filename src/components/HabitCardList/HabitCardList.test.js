import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HabitCardList from "./HabitCardList";
import { HabitContextProvider } from "../../context/HabitContext";

it(`HabitCardList renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <HabitCardList />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});