import { resolve } from "path";

module.exports = {
  webpack: {
    alias: {
      utils: resolve(__dirname, "src/utils"),
      BW_types: resolve(__dirname, "src/apps/balanceWheel/types.ts"),
      BW_const: resolve(__dirname, "src/apps/balanceWheel/const"),
      BW_models: resolve(__dirname, "src/apps/balanceWheel/models"),
      BW_components: resolve(__dirname, "src/apps/balanceWheel/components"),
    },
  },
};
