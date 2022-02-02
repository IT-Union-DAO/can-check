import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {emptyDir} from "rollup-plugin-empty-dir";
import {chromeExtension} from "rollup-plugin-chrome-extension";
import nodePolyfills from "rollup-plugin-polyfill-node";
import resolve from "@rollup/plugin-node-resolve";
import zip from "rollup-plugin-zip"

import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";

const path = require("path");


export default defineConfig(({mode}) => {
  const isProduction = mode === 'production'

  return {
    envDir: absPathTo("env"),
    root: absPathTo("src"),
    build: {
      rollupOptions: {
        input: [absPathTo("src/manifest.json")],
        output: {
          dir: "dist",
          format: "esm",
          chunkFileNames: path.join("chunks", "[name]-[hash].js"),
        },
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
      inject({
        modules: {Buffer: ["buffer", "Buffer"]},
      }),
      chromeExtension(),
      commonjs(),
      nodePolyfills(),
      resolve(),
      react(),
      isProduction && zip({dir: "releases"})
    ],
  }
});

function absPathTo(pathToPackage: string) {
  return path.resolve(__dirname, pathToPackage);
}