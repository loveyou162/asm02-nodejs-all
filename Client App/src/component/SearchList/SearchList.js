import SearchListItem from "./SearchListItem";
import styles from "./SearchList.module.css";
import SearchPopUp from "./SearchPopup/SearchPopUp";
import { useSelector } from "react-redux";

const SearchList = () => {
  const SearchData = useSelector((state) => state.search.searchHotel);

  // State để kiểm tra có dữ liệu để hiển thị hay không
  let hasData;
  if (SearchData.length > 0) {
    hasData = true;
  } else {
    hasData = false;
  }

  return (
    <div className={styles.searchContainer}>
      <SearchPopUp className={styles.searchPop_Up} />
      <div className={styles["search-list-box"]}>
        <div className={styles["search-list"]}>
          {hasData ? (
            SearchData.map((data, index) => (
              <SearchListItem
                name={data.name}
                distance={data.distance}
                tag={data.tag}
                detail={data.type}
                description={data.desc}
                free_cancel={data.featured}
                price={data.cheapestPrice}
                rate={data.rating}
                rate_text={data.rate_text}
                image={data.photos[0]}
                descRoom={data ? data.rooms.map((room) => room.desc) : null}
                titleRoom={data ? data.rooms.map((room) => room.title) : null}
                hotelId={data._id}
                key={index}
              />
            ))
          ) : (
            <p>{SearchData.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
