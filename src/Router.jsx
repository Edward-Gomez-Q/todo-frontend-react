import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout";

import Login from "./pages/login"
import TasksList from "./pages/tasks";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "/tasks",
                element: <TasksList />,
            }

        ]
    }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;