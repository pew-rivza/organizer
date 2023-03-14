import React from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "effector-react";

import { $looks } from "VW_models/look";
import { Look } from "VW_types/stores";

import "./Looks.scss";

export const Looks: React.FC = () => {
  const looks = useStore<Look[]>($looks);
  const navigate = useNavigate();

  return (
    <div className="vw_looks">
      {looks.map((look) => (
        <div
          key={look.id}
          className="vw_looks-item"
          onClick={() => navigate(`edit/${look.id}`)}
        >
          <img alt="" src={look.image} />
        </div>
      ))}
    </div>
  );
};
