import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import classes from "./root.module.css";
const RootLayout = () => {
  return (
    <div className={classes.root}>
      <table>
        <thead>
          <tr className={classes.tr1}>
            <td>
              <h3>Admin Page</h3>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tr2}>
            <td className={classes.navbarCell}>
              <Navbar />
            </td>
            <td className={classes.mainCell}>
              <main>
                <Outlet />
              </main>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default RootLayout;
