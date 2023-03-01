import React from "react";

import Konva from "konva";

import { AreaFullInfo } from "BW_types/stores";

declare global {
  interface Window {
    _organizer: {
      balanceWheel: {
        areasFullInfo: AreaFullInfo[];
      };
      virtualWardrobe: {
        stageRef?: React.RefObject<Konva.Stage>;
      };
    };
  }
}
