import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/Landing";
import ProtectedRoute from "./pages/Protected";
import RootLayout from "./pages/dashboard/Root";
import Home from "./pages/dashboard/Home";
import AddSetPage from "./pages/dashboard/AddSet";
import SingleCollection from "./pages/dashboard/SingleCollection";
import AllCollections from "./pages/dashboard/AllCollections";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/add-set", element: <AddSetPage /> },
      { path: "/collection/:collectionId", element: <SingleCollection /> },
      { path: "/collections", element: <AllCollections /> },
    ],
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
