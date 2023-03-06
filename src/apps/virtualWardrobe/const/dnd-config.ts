import { HTML5Backend } from "react-dnd-html5-backend";
import { MouseTransition, TouchTransition } from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { TransformerConfig } from "konva/lib/shapes/Transformer";

export const BACKEND_OPTIONS = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

export const TRANSFORMER_CONFIG: TransformerConfig = {
  anchorStroke: "#92a69a",
  anchorFill: "#e9edeb",
  anchorSize: 10,
  anchorCornerRadius: 5,
  borderStroke: "#92a69a",
  rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315, 360],
  rotationSnapTolerance: 4,
  rotateAnchorOffset: 20,
  borderDash: [5, 3],
};
