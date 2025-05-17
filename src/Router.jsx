import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout";

import Login from "./pages/login"
import TasksList from "./pages/tasks";
import SignUp from "./pages/signup";


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
                path: "/signup",
                element: <SignUp />,
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