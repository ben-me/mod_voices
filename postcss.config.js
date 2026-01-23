import postcssPresetEnv from "postcss-preset-env";
import atImport from "postcss-import";
import postcssCustomMedia from "postcss-custom-media";
import postcssGlobalData from "@csstools/postcss-global-data";

export default {
  plugins: [
    atImport(),
    postcssGlobalData({
      files: ["./src/styles/variables.css"],
    }),
    postcssCustomMedia(),
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
        "cascade-layers": false,
      },
    }),
  ],
};
