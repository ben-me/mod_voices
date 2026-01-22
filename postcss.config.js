import postcssPresetEnv from "postcss-preset-env";
import atImport from "postcss-import";

export default config = {
  plugins: [
    atImport(),
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
