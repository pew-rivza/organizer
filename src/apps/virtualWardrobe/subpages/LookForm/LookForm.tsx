import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { findObject } from "utils/objects";

import { BACKEND_OPTIONS } from "VW_const/dnd-config";
import { $changedLook, $looks, updateChangedLook } from "VW_models/look";
import { Coords, LookParams } from "VW_types/other";
import { ChangedLook, DraggableImage, Look } from "VW_types/stores";
import { scaleClothes } from "VW_utils/canvas";

import { Canvas } from "./components/Canvas";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";

import "./LookForm.scss";

export const LookForm: React.FC = () => {
  const changedLook = useStore<ChangedLook>($changedLook);
  const { id } = useParams() as LookParams;
  const looks = useStore<Look[]>($looks);

  useEffect(() => {
    if (!id) {
      const canvasRect: DOMRect = (
        document.querySelector("#canvas-area > div") as HTMLDivElement
      ).getBoundingClientRect();
      updateChangedLook({ ...changedLook, canvasSize: canvasRect.width });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      const editedLook = findObject<number, Look>(looks, "id", +id);
      const { image, canvasSize, background } = editedLook || {};
      const currentCanvasSize: number = (
        document.querySelector("#canvas-area > div") as HTMLDivElement
      ).getBoundingClientRect().width;

      const clothes: (DraggableImage & Coords)[] = scaleClothes(
        editedLook?.clothes || [],
        currentCanvasSize,
        canvasSize,
      );

      updateChangedLook({
        image,
        canvasSize: currentCanvasSize,
        background,
        clothes,
      } as ChangedLook);
    }
  }, [looks, id]);

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
