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
      MT_api: resolve(__dirname, "src/apps/medicationTaking/api"),
      MT_const: resolve(__dirname, "src/apps/medicationTaking/const"),
      MT_models: resolve(__dirname, "src/apps/medicationTaking/models"),
      MT_subpages: resolve(__dirname, "src/apps/medicationTaking/subpages"),
      MT_types: resolve(__dirname, "src/apps/medicationTaking/types"),
      MT_utils: resolve(__dirname, "src/apps/medicationTaking/utils"),
    },
  },
};
