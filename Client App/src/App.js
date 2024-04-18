import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as HomeLoader } from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import RootLayout from "./pages/root";
import LoginPage from "./pages/Login/login";
import Transaction, {
  loader as TransactionLoader,
} from "./pages/transaction/transaction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader,
        id: "home",
      },
      {
        path: "search",
        children: [
          { index: true, element: <Search /> },
          { path: ":hotelId", element: <Detail /> },
        ],
      },
      { path: "detail/:hotelId", element: <Detail /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "transaction",
        element: <Transaction />,
        loader: TransactionLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
