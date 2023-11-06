import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import Showcase from "./Showcase";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
