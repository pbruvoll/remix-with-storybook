import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook =
  process.argv[1]?.includes("storybook") &&
  process.argv[1]?.includes("node_modules");
export default defineConfig({
  plugins: [!isStorybook && remix(), tsconfigPaths()],
});
