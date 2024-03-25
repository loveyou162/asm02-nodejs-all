const express = require("express");
const bookingController = require("../controller/booking");
const router = express.Router();

router.get("/hotel", bookingController.getHotelAndQuantityHotels);
router.post("/search-hotel", bookingController.postSearchHotel);
router.post("/detail-hotel", bookingController.postDetailHotel);
router.post("/transaction", bookingController.postTransaction);
router.get("/transaction", bookingController.getTransaction);

module.exports = router;
