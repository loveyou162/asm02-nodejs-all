import styles from "./DetailAll.module.css";
import DetailItem from "./DetailItem";
import DetailBottom from "./DetailBottom";
import FormBookHotel from "./FormBookHotel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const DetailAll = () => {
  useEffect(() => {
    console.log("scroll");
    window.scrollTo(0, 0);
  }, []);
  const DataDetail = useSelector((state) => state.search.detailHotel);
  console.log(DataDetail);
  const isReserve = useSelector((state) => state.ui.showReserve);
  return (
    <div className={styles.detailAll}>
      <DetailItem
        name={DataDetail.name}
        address={DataDetail.address}
        distance={DataDetail.distance}
        price={DataDetail.cheapestPrice}
      />

      <div className={styles.detailPhotoList}>
        {DataDetail.photos.map((photo, index) => (
          <img key={index} src={photo} alt={DataDetail.name} />
        ))}
      </div>
      <DetailBottom
        title={DataDetail.title}
        desc={DataDetail.desc}
        nine_price={DataDetail.cheapestPrice}
      />
      {isReserve && <FormBookHotel />}
    </div>
  );
};
export default DetailAll;
