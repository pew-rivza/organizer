import { Auth } from "types/other";

import { AreaFullInfo } from "BW_types/stores";

declare global {
  interface Window {
    _organizer: {
      balanceWheel: {
        areasFullInfo: AreaFullInfo[];
      };
      auth: null | Auth;
    };
  }
}
