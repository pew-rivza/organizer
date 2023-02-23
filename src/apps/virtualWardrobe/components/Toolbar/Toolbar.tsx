import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const navigate = useNavigate();
  const isClothes: boolean = window.location.pathname.includes("clothes");

  return (
    <div className="vw_toolbar">
      <div className="vw_toolbar-forms">
        <button
          className="icon-button"
          onClick={() => navigate("/virtual-wardrobe/clothes/add")}
        >
          <Icon icon="icon-park-outline:clothes-crew-neck" />
        </button>
        <button
          className="icon-button"
          onClick={() => navigate("/virtual-wardrobe/look/add")}
        >
          <Icon icon="game-icons:clothes" />
        </button>
      </div>
      <div className="vw_toolbar-pages">
        <button
          className="icon-button"
          disabled={isClothes}
          onClick={() => navigate("/virtual-wardrobe/clothes")}
        >
          <Icon icon="icon-park-outline:clothes-crew-neck" />
        </button>
        <button
          className="icon-button"
          disabled={!isClothes}
          onClick={() => navigate("/virtual-wardrobe/looks")}
        >
          <Icon icon="game-icons:clothes" />
        </button>
      </div>
    </div>
  );
};
