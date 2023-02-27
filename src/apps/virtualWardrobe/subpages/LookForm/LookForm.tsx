import React, { useRef } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";

import { backendOptions } from "VW_const/dndConfig";
import { DraggableObject } from "VW_types/other";

import { Canvas } from "./components/Canvas";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";

import "./LookForm.scss";

export const LookForm: React.FC = () => {
  const draggableObject = useRef<DraggableObject>();

  return (
    <div className="vw_look_form">
      <Toolbar />
      <div className="vw_look_form_container">
        <DndProvider backend={MultiBackend} options={backendOptions}>
          <Canvas draggableObject={draggableObject} />
          <Sidebar draggableObject={draggableObject} />
        </DndProvider>
      </div>
    </div>
  );
};
