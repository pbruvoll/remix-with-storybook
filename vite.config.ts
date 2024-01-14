import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/* Check for storybook. Note that we've added one more check to determine that storybook is running.
   The remix docs suggest to only check against the string "storybook",
   but if you have checked out your repo in a folder which also includes storybook in its path, this is not enough.
   Therefor we have also added a check against the string "node_modules".
*/
const isStorybook =
  process.argv[1]?.includes("storybook") &&
  process.argv[1]?.includes("node_modules");
export default defineConfig({
  plugins: [!isStorybook && remix(), tsconfigPaths()],
});
