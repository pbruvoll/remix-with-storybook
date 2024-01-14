import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  return json({ appName: "remix" });
}

export default function Index() {
  const { appName } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to {appName}</h1>
      <div>
        Here is a link to the <Link to="/child">child</Link>
      </div>
    </div>
  );
}
