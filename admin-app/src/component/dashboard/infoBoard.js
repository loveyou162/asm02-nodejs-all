import { useRouteLoaderData } from "react-router-dom";
import classes from "./infoBoard.module.css";

const InfoBoard = () => {
  const dataInfoBoard = useRouteLoaderData("dashboard");
  return (
    <div className={classes.infoBoard}>
      <div className={`${classes["infoBoard-item"]} ${classes.boxUserinfo}`}>
        <p>User</p>
        <p className={classes["infoBoard__number"]}>
          {dataInfoBoard[0].userNumber}
        </p>
        <ion-icon name="person-outline"></ion-icon>
      </div>
      <div className={`${classes["infoBoard-item"]} ${classes.boxOrder}`}>
        <p>Orders</p>
        <p className={classes["infoBoard__number"]}>
          {dataInfoBoard[0].transNumber}
        </p>
        <ion-icon name="cart-outline"></ion-icon>
      </div>
      <div className={`${classes["infoBoard-item"]} ${classes.boxEarning}`}>
        <p>Earnings</p>
        <p className={classes["infoBoard__number"]}>
          ${dataInfoBoard[0].allPrice}
        </p>
        <ion-icon name="cash-outline"></ion-icon>
      </div>
      <div className={`${classes["infoBoard-item"]} ${classes.boxBalance}`}>
        <p>Balance</p>
        <p className={classes["infoBoard__number"]}>
          ${dataInfoBoard[0].balance}
        </p>
        <ion-icon name="wallet-outline"></ion-icon>
      </div>
    </div>
  );
};
export default InfoBoard;
