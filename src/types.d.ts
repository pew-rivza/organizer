import { AreaFullInfo } from "BW_types/stores";

declare global {
  interface Window {
    _organizer: {
      balanceWheel: {
        areasFullInfo: AreaFullInfo[];
      };
    };
  }
}
