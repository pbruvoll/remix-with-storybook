import type { Meta, StoryObj } from "@storybook/react";

import IndexRoute from "./route";
import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";

const meta = {
  title: "Routes/Index",
  component: IndexRoute,
} satisfies Meta<typeof IndexRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  /** we use a custom render function to wrap our component/story in a RemixStub.
  If you want the same RemixStub for all stories, you could also use the decorators properyt
  of hte meta-object to do this */
  render: () => {
    const RemixStub = createRemixStub([
      {
        Component: IndexRoute,
        path: "/",
        loader: () => json({ appName: "Remix in Storybook" }),
      },
      {
        Component: () => <div>This is the child in storybook</div>,
        path: "/child",
      },
    ]);
    return <RemixStub />;
  },
};
