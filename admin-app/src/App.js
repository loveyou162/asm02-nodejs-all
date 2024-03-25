import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./page/root";
import Dashboard, { loader as DashboardLoader } from "./page/dashboard";
import HotelPage, {
  loader as HotelLoader,
  action as hotelAction,
} from "./page/hotel/hoteltable";
import NewHotelPage, {
  // action as NewHotelAction,
  loader as NewHotelLoader,
} from "./page/newHotel/newHotel";
import RoomPage, {
  loader as RoomLoader,
  action as RoomAction,
} from "./page/rooms/rooms";
import NewRoomPage, { loader as NewRoomLoader } from "./page/newRoom/newRoom";
import TransactionPage, {
  loader as TransactionLoader,
} from "./page/transaction/transaction";
import LoginPage from "./page/login/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: DashboardLoader,
        id: "dashboard",
      },
      {
        path: "hotels",
        element: <HotelPage />,
        loader: HotelLoader,
        action: hotelAction,
        id: "hotel",
      },
      {
        path: "new-hotel",
        element: <NewHotelPage />,
        // action: NewHotelAction,
        loader: NewHotelLoader,
      },
      {
        path: "edit-hotel",
        element: <NewHotelPage />,
        loader: NewHotelLoader,
      },
      {
        path: "rooms",
        element: <RoomPage />,
        loader: RoomLoader,
        action: RoomAction,
      },
      {
        path: "new-room",
        element: <NewRoomPage />,
        loader: NewRoomLoader,
      },
      {
        path: "transaction",
        element: <TransactionPage />,
        loader: TransactionLoader,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
