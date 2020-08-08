import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MainNav from "./MainNav";
import { HabitContextProvider } from "../../context/HabitContext";

it.only(`MainNav renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HabitContextProvider>
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>
    </HabitContextProvider>
    ,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});