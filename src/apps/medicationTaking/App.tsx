import React from "react";
import { Link } from "react-router-dom";

import "./App.scss";

export const App: React.FC = () => {
  return (
    <div data-testid="medication-taking" className="mt">
      <Link to="add">Добавить курс</Link>
    </div>
  );
};
