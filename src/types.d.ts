import { AreaFullInfo } from "BW_types";

declare global {
  interface Window {
    _organizer: {
      balanceWheel: {
        areasFullInfo: AreaFullInfo[];
      };
    };
  }
}
