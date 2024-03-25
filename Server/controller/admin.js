const User = require("../model/user");
const Transaction = require("../model/transaction");
const Hotel = require("../model/hotel");
const Room = require("../model/room");
const unorm = require("unorm");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
//xóa dấu tiếng Việt
function removeDiacritics(input) {
  return unorm.nfkd(input).replace(/[\u0300-\u036f]/g, "");
}

//hàm chuyển qua định dạng cappitalize
function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

exports.getAllData = async (req, res, next) => {
  try {
    const user = await User.find({ isAdmin: false });
    const userNumber = user.length;
    //lấy dữ liệu từ transaction và lấy thêm đầy đủ dữ liệu từ tham chiếu userId và hotel
    const transaction = await Transaction.find().populate(["userId", "hotel"]);
    const transactionNumber = transaction.length;
    const transactionPrice = await Transaction.find().select("price");
    //tính tổng tiền
    const allPrice = transactionPrice
      .map((item) => item.price)
      .reduce((acc, item) => acc + item, 0);
    //tính giá trung bình theo số giao dịch
    const balancePrice = allPrice / transactionNumber;
    res.json([
      {
        userNumber: userNumber,
        transNumber: transactionNumber,
        allPrice: allPrice,
        balance: balancePrice.toFixed(2),
      },
      { transaction },
    ]);
  } catch (err) {
    console.log(err);
  }
};
exports.getAllHotels = (req, res) => {
  Hotel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteHotel = async (req, res) => {
  const hotelId = req.body.id;
  console.log(hotelId);
  try {
    //dùng findOne để tìm transaction dựa trên hotelId
    const transaction = await Transaction.findOne({ hotel: hotelId });
    console.log(44, transaction);
    //kiểm tra nếu hotel đang nằm trong giao dịch thì không thể xóa và ngược lại xóa hotel
    if (transaction) {
      res.json({
        message: "Hotel này đang nằm trong Transaction, không thể xóa!",
      });
    } else {
      const hotelDelete = await Hotel.findByIdAndDelete(hotelId);
      if (hotelDelete) {
        res.status(200).json({ message: "Xóa thành công", hotelDelete });
      } else {
        res.status(404).json({ message: "Không tìm thấy khách sạn để xóa" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
//List Rooms
exports.getAllRoom = (req, res) => {
  Room.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//add hotel vào db (newHotel)
exports.portAddHotel = async (req, res, next) => {
  const {
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    title,
    price,
    featured,
    rooms,
  } = req.body;
  //xóa dấu tiếng việt
  const citysvn = removeDiacritics(city);
  //chuyển thành viết chữ hoa đầu câu
  const cityWithCapitalize = capitalizeFirstLetter(citysvn);
  try {
    //lấy roomId và lưu vào field rooms của hotel
    const roomId = await Room.find({ title: { $in: rooms } }).distinct("_id");
    const hotel = new Hotel({
      address,
      cheapestPrice: price,
      city: cityWithCapitalize,
      desc,
      distance,
      featured,
      name,
      photos,
      rooms: roomId,
      title,
      type,
    });
    hotel.save();
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
exports.deleteRoom = async (req, res) => {
  const roomId = req.body.id;
  console.log(roomId);
  try {
    // đây là mảng các roomNumbers
    const roomNumber = await Room.findOne({ _id: roomId }).distinct(
      "roomNumbers"
    );
    const transaction = await Transaction.find().distinct("room");
    //so sánh nếu roomNumber có chứa các id trong transaction thì trả về mảng mới
    const compareIdRoom = transaction
      .map(Number) //chuyển đổi các giá trị sang dạng số
      .find((id) => roomNumber.includes(id));

    console.log(120, roomNumber);
    // console.log(121, transaction);
    console.log(121, transaction.map(Number));
    console.log(122, compareIdRoom);
    //nếu compareIdRoom có giá trị tức là room đã được booked và ngược lại xóa room
    if (compareIdRoom) {
      res.json({
        message: "Room này đã được booked, không thể xóa!",
      });
    } else {
      const roomDelete = await Room.findByIdAndDelete(roomId);
      if (roomDelete) {
        res.status(200).json({ message: "Xóa thành công", roomDelete });
      } else {
        res.status(404).json({ message: "Không tìm thấy khách sạn để xóa" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
exports.postAddRoom = async (req, res, next) => {
  const { title, price, desc, maxPeople, roomNumbers } = req.body;
  try {
    const room = new Room({
      title,
      price,
      desc,
      maxPeople,
      roomNumbers,
    });
    room.save();
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
exports.getAllTrans = (req, res) => {
  Transaction.find()
    .populate(["userId", "hotel"])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//hàm trả về dữ liệu mặc định trc đó để edit
exports.getEditHotel = (req, res) => {
  const hotelId = req.params.id;
  console.log(hotelId);
  Hotel.findById(hotelId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditHotel = (req, res) => {
  const {
    hotelId,
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    title,
    price,
    featured,
    rooms,
  } = req.body;
  console.log(220, rooms);
  Room.find({ title: { $in: rooms } })
    .distinct("_id")
    .then((roomId) => {
      //roomId là mảng room mới được chọn
      console.log(224, roomId);
      Hotel.findById(hotelId)
        .then((hotel) => {
          //hotel.rooms là room gốc của hotel
          console.log(226, hotel.rooms);
          hotel.name = name ? name : hotel.name;
          hotel.type = type ? type : hotel.type;
          hotel.city = city ? city : hotel.city;
          hotel.address = address ? address : hotel.address;
          hotel.cheapestPrice = price ? price : hotel.cheapestPrice;
          hotel.distance = distance ? distance : hotel.distance;
          hotel.photos = photos ? photos : hotel.photos;
          hotel.desc = desc ? desc : hotel.desc;
          hotel.featured = featured ? featured : hotel.featured;
          hotel.title = title ? title : hotel.title;
          hotel.rooms = roomId ? roomId : hotel.rooms;
          return hotel.save();
        })
        .then(() => {
          console.log("Updated Hotel");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.getEditRooms = (req, res) => {
  const roomId = req.params.id;
  console.log(roomId);
  Room.findById(roomId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditRoom = (req, res) => {
  const { roomId, title, price, desc, maxPeople, roomNumbers } = req.body;
  console.log({ roomId, title, price, desc, maxPeople, roomNumbers });
  Room.findById(roomId)
    .then((room) => {
      room.title = title ? title : room.title;
      room.price = price ? price : room.price;
      room.desc = desc ? desc : room.desc;
      room.maxPeople = maxPeople ? maxPeople : room.maxPeople;
      room.roomNumbers = roomNumbers ? roomNumbers : room.roomNumbers;
      return room.save();
    })
    .then(() => {
      console.log("Updated Room");
    })
    .catch((err) => console.log(err));
};
