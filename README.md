# Welcome to Remix + Vite + Storybook!

This repo shows how to use storybook in Remix. It uses the vite-express template, but the same setup works with other Remix templates.

Below are the steps needed to get storybook working

## Initialize remix
```shellscript
npx create-remix@latest --template remix-run/remix/templates/unstable-vite-express
```
Now you should be able to run the remix project with the command 'npm run dev'

## Install and run storybook
We can install Storybook in the standard way. Note that after installing storybook, it will run with an error. We'll fix that in the next step
```shellscript
npx storybook@latest init
```

The reason storybook fails is that the Vite config which is used by Storybook now also includes the remix plugin which is currently not supported. See the [vite/storybook section](https://remix.run/docs/en/main/future/vite#plugin-usage-with-other-vite-based-tools-eg-vitest-storybook) in the remix docs for more info.

We need to remove the remix plugin when we are running storybook. The vite.config should now look like this :
```typescript
// vite.config.ts
const isStorybook =
  process.argv[1]?.includes("storybook") &&
  process.argv[1]?.includes("node_modules");
export default defineConfig({
  plugins: [!isStorybook && remix(), tsconfigPaths()],
});
```

Note that we've added one more check to determine that storybook is running. The remix docs suggest only checking against the string "storybook", but if you have checked out your repo in a folder that also includes storybook in its path, this is not enough. Therefore we have also added a check against the string "node_modules".

Now you should be able to run storybook successfully
```shellscript
npm run storybook
```

## Create a story for your route
By default, you need to place all your stories in the stories folder. Personally, I like to place the story together with the respective components. So let's configure storybook to check for stories in our app folder:
```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: [
    // ...
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
```

If we want to co-locate our story with our route, we need to use a folder for the route, otherwise Remix will treat the story as a route. To do this we move _index.ts into a folder and rename it to route.tsx (_index/route.tsx).
Now we can create our story at \_index/\_index\_.stories.tsx

We can write this story in a standard way, and it should work as expected since this component does not really use much Remix specific code.

## Making remix specific features work in a story
Let's add some remix specific features to our component. We'll add a loader and a Link. See the example at [_index/route.tsx](/app/routes/_index/route.tsx)
This will break our story. Let's fix it!

First, we need to install the remix testing library
```shellscript
npm install remix-run/remix --save-dev
```

Now we can wrap our story in a remix stub. It is often useful to mock the loader data in a story. So we mock the loader function. In addition, we have added a child route so it's possible to click the remix Link in the story. See example at [_index/_index.stories.tsx](/app/routes/_index/_index.stories.tsx)

There is one last catch. When running the story, you will get an error about process not being defined. We can solve this by defining an empty proccess object when running storybook. One way to do this is to modify the vite config for storybook in main.ts
```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: [
     //....
  ],
  // ...
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        ...config.define,
        'process.env': {}
      }
    })
  }
```

Now you should have a working story with mocked loader data and a working Link component :)

📖 See more info about Remix at [Remix docs](https://remix.run/docs) 

