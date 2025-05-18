import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout";

import Login from "./pages/login";
import TasksList from "./pages/tasks";
import SignUp from "./pages/signup";
import User from "./pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      {
        path: "tasks",
        element: <TasksList />,
      },
      {
        index: true,
        element: <User />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;