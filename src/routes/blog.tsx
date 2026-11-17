import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  staticData: { sitemap: false },
  component: () => <Outlet />,
});
