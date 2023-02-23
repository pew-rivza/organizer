import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="vw_toolbar">
      <div className="vw_toolbar-forms">
        <button className="icon-button" onClick={() => navigate("clothes/add")}>
          <Icon icon="icon-park-outline:clothes-crew-neck" />
        </button>
        <button className="icon-button" onClick={() => navigate("look/add")}>
          <Icon icon="game-icons:clothes" />
        </button>
      </div>
      <div className="vw_toolbar-pages">
        <button className="icon-button" onClick={() => navigate("")}>
          <Icon icon="icon-park-outline:clothes-crew-neck" />
        </button>
        <button className="icon-button" onClick={() => navigate("?looks=1")}>
          <Icon icon="game-icons:clothes" />
        </button>
      </div>
    </div>
  );
};
