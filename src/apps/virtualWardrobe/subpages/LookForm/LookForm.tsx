import React from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";

import { BACKEND_OPTIONS } from "VW_const/dnd-config";

import { Canvas } from "./components/Canvas";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";

import "./LookForm.scss";

export const LookForm: React.FC = () => {
  return (
    <div className="vw_look_form">
      <Toolbar />
      <div className="vw_look_form_container">
        <DndProvider backend={MultiBackend} options={BACKEND_OPTIONS}>
          <Canvas />
          <Sidebar />
        </DndProvider>
      </div>
    </div>
  );
};
