const Hotel = require("../model/hotel");
const Transaction = require("../model/transaction");
const fs = require("fs");
const path = require("path");
const unorm = require("unorm");
const hotel = require("../model/hotel");
//xóa dấu tiếng Việt
function removeDiacritics(input) {
  return unorm.nfkd(input).replace(/[\u0300-\u036f]/g, "");
}

//hàm chuyển qua định dạng cappitalize
function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "typeList.json"
);
const Type = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
};
//lấy hotel vào số lượng hotel
exports.getHotelAndQuantityHotels = async (req, res) => {
  try {
    const city = ["Ha Noi", "Ho Chi Minh", "Da Nang"];
    const cityName = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];
    const quantity = await Hotel.find().then((hotels) =>
      city.map((city) => hotels.filter((hotel) => hotel.city === city).length)
    );
    const types = ["Hotel", "Apartments", "Resorts", "Villas", "Cabins"];
    const t = ["hotel", "apartments", "resorts", "villas", "cabins"];
    //tìm tất cả khách sạn có chứa type = t
    const hotels = await Hotel.find({ type: { $in: t } });
    //lấy dữ liệu từ file json
    const Dummy_Type = Type.all();
    const quantityHotels = types.map((type) => ({
      name: type,
      quantity: hotels.filter((hotel) => hotel.type === type.toLowerCase())
        .length,
      image:
        Dummy_Type.find((dummyType) => dummyType.name === type)?.image || "",
    }));
    //ratingTallestHotel
    const ratingHotel = await Hotel.distinct("rating");
    //Sắp xếp để lấy rating từ cao xuống thấp
    const ratingTallesHotel = ratingHotel.sort((a, b) => b - a).slice(0, 3);
    //tìm kiếm trong bảng hotel lấy mảng hotel có giá trị từ cao xuống thấp và lấy giới hạn là 3 phần tử
    const arrRatingTallesHotel = await Hotel.find({
      rating: { $in: ratingTallesHotel },
    })
      .sort({ rating: -1 })
      .limit(3);
    res.json([
      { quantityHotels: quantityHotels },
      {
        quantityCity: cityName.map((name, i) => ({
          name,
          quantity: quantity[i],
          image: `./images/CityImage/${name}.jpg`,
        })),
      },
      {
        ratingTallesHotel: arrRatingTallesHotel,
      },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};
//gửi id của hotel cần xem chi tiết và trả về tri tiết hotel đó
exports.postDetailHotel = async (req, res) => {
  try {
    const HotelId = req.body.hotelId;
    console.log(HotelId);
    const hotel = await Hotel.findById(HotelId).populate("rooms");
    res.json(hotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};

exports.postSearchHotel = (req, res) => {
  const { citys, adult, childrent } = req.body;
  let roomCount = req.body.rooms;
  //childrent nếu không nhập gì thì mặc định lấy giá trị là 0
  const childrentValue = childrent.trim() !== "" ? childrent : 0;
  //xóa dấu tiếng việt
  const citysvn = removeDiacritics(citys);
  //chuyển thành viết chữ hoa đầu câu
  const cityWithCapitalize = capitalizeFirstLetter(citysvn);
  Hotel.find({
    city: cityWithCapitalize,
  })
    //lấy các phòng có maxPeople >= adult + child và roomNumber = roomCount
    .populate({
      path: "rooms",
      match: {
        maxPeople: {
          $gte: parseInt(adult) + parseInt(childrentValue),
        },
        roomNumbers: { $size: parseInt(roomCount) },
      },
    })
    .then((result) => {
      //kiểm tra xem có kết quả nào thỏa mãn điều kiện không
      // console.log(114, result);
      const filteredResults = result.filter((hotel) => hotel.rooms.length > 0);
      // console.log(115, filteredResults);
      if (filteredResults.length > 0) {
        res.json(filteredResults);
        console.log("ok");
      } else {
        console.log("err");
        res.json({ message: "Không có khách sạn phù hợp" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//middleware tạo giao dịch mới và lưu vào colection transaction
exports.postTransaction = (req, res) => {
  const {
    userId,
    dateStart,
    dateEnd,
    inputValue,
    payment,
    price,
    hotel,
    selectedRooms,
  } = req.body;

  const transaction = new Transaction({
    userId: userId,
    dateStart: dateStart,
    dateEnd: dateEnd,
    payment: payment,
    price: price,
    hotel: hotel,
    room: selectedRooms,
    inputValue: inputValue,
  });
  transaction
    .save()
    .then(() => {})
    .catch((err) => {
      throw new Error(err.message);
    });
};
exports.getTransaction = (req, res) => {
  Transaction.find()
    .populate("hotel")
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      // Xử lý lỗi khi lưu giao dịch
      console.error(error);
    });
};
