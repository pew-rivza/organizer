import React from "react";

import { Category } from "./components/Category";
import { Toolbar } from "./components/Toolbar";
import { Uploader } from "./components/Uploader";

import "./ClothesForm.scss";

export const ClothesForm: React.FC = () => {
  return (
    <div className="vw_clothes_form">
      <Toolbar />
      <Category />
      <Uploader />
    </div>
  );
};
