import { resolve } from "path";

export default {
  webpack: {
    alias: {
      apps: resolve(__dirname, "src/apps"),
      components: resolve(__dirname, "src/components"),
      const: resolve(__dirname, "src/const"),
      types: resolve(__dirname, "src/types"),
      utils: resolve(__dirname, "src/utils"),
      BW_api: resolve(__dirname, "src/apps/balanceWheel/api"),
      BW_components: resolve(__dirname, "src/apps/balanceWheel/components"),
      BW_const: resolve(__dirname, "src/apps/balanceWheel/const"),
      BW_models: resolve(__dirname, "src/apps/balanceWheel/models"),
      BW_types: resolve(__dirname, "src/apps/balanceWheel/types"),
      BW_utils: resolve(__dirname, "src/apps/balanceWheel/utils"),
    },
  },
};
