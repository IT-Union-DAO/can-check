import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "rollup-plugin-chrome-extension";
import nodePolyfills from "rollup-plugin-polyfill-node";
import resolve from "@rollup/plugin-node-resolve";
import zip from "rollup-plugin-zip";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import { emptyDir } from "rollup-plugin-empty-dir";
import copyToBundle from "rollup-plugin-copy2";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import windicss from "rollup-plugin-windicss";
import manifest from "./manifest";

const path = require("path");
const twElements = require("tw-elements/dist/plugin");

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    envDir: absPathTo("env"),
    assetsInclude: ["public/*.png"],
    build: {
      emptyOutDir: false,
      rollupOptions: {
        input: [
          absPathTo("extension/popup/index.html"),
          absPathTo("extension/popup/verification.html"),
        ],
        output: {
          dir: "dist",
          format: "esm",
        },
      },
      commonjsOptions: {
        include: ["node_modules/react/**/*", "node_modules/react-dom/**/*"],
      },
    },
    resolve: {
      alias: {
        "@": absPathTo("src"),
        "@components": absPathTo("src/components"),
        "@store": absPathTo("src/core/redux"),
      },
    },
    plugins: [
      emptyDir(),
      applyWindiCSS(),
      react(),
      commonjs(),
      replace({
        "process.env.NODE_ENV": isProduction
          ? JSON.stringify("production")
          : JSON.stringify("development"),
        preventAssignment: true,
      }),
      crx({
        manifest,
      }),
      copyAdditionalPngAssets(isProduction),
      inject({
        modules: { Buffer: ["buffer", "Buffer"] },
      }),
      nodePolyfills(),
      resolve({ browser: true }),
      isProduction && zip({ dir: "releases" }),
    ],
  };
});

function absPathTo(pathToPackage: string) {
  return path.resolve(__dirname, pathToPackage);
}

const applyWindiCSS = () =>
  windicss({
    config: {
      plugins: [twElements],
    },
    scan: {
      dirs: ["."],
      fileExtensions: ["html", "js", "ts", "tsx"],
    },
  });

const copyAdditionalPngAssets = (isProduction) => {
  if (isProduction) {
    //plugin for adding png to zip
    return copyToBundle({
      assets: [
        "extension/icons/green16.png",
        "extension/icons/red16.png",
        "extension/icons/yellow16.png",
      ],
    });
  } else {
    return copy({
      verbose: true,
      hook: "options",
      targets: [
        { src: "extension/icons/green16.png", dest: "dist/extension/icons" },
        { src: "extension/icons/red16.png", dest: "dist/extension/icons" },
        { src: "extension/icons/yellow16.png", dest: "dist/extension/icons" },
      ],
    });
  }
};
