import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";

(window as Window)._organizer = {
  balanceWheel: {
    areasFullInfo: [],
  },
  virtualWardrobe: {},
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer autoClose={1000} limit={2} />
    </BrowserRouter>
  </React.StrictMode>,
);
