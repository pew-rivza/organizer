import React from "react";

import { Clothes } from "VW_components/Clothes";
import { Looks } from "VW_components/Looks";
import { Toolbar } from "VW_components/Toolbar";
import { AppProps } from "VW_types/props";

import "./App.scss";

export const App: React.FC<AppProps> = ({ page }) => {
  return (
    <div data-testid="virtual-wardrobe" className="vw">
      <Toolbar page={page} />

      {page === "clothes" && <Clothes />}
      {page === "looks" && <Looks />}
    </div>
  );
};
