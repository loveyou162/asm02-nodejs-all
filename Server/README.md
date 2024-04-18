# Server JSON API Node.js with Assignment 2

Dự án này là một máy chủ Node.js cung cấp dữ liệu dạng JSON thông qua API. Nó sử dụng framework Express.js và các thư viện hỗ trợ khác để xử lý routing, middleware và xử lý dữ liệu.

---

## ✨ Công nghệ sử dụng

- Express.js: Một framework web nhanh, không quan điểm, tối giản cho Node.js.
- bcrypt: Thư viện để mã hóa mật khẩu.
- bcryptjs: Một phiên bản JavaScript của bcrypt để mã hóa mật khẩu.
- cors: Middleware để kích hoạt Chia sẻ nguồn tài nguyên gốc (CORS).
- dotenv: Module để tải biến môi trường từ tệp .env.
- express-session: Middleware để quản lý các phiên trong Express.js.
- mongodb: Bộ điều khiển MongoDB chính thức cho Node.js.
- mongoose: Mô hình đối tượng MongoDB tinh tế cho Node.js.

#### Chi tiết các version

    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "lodash": "^4.17.21",
    "mongodb": "^6.3.0",
    "mongoose": "^8.1.0",
    "unorm": "^1.6.0"

## End point

- ### Admin:

  - /get-all-hotel(get): trả về tất cả sản phẩm
  - /get-all-data(get): trả về các dữ liệu thống kê cho trang dashboard
  - /delete(delete): xóa khách sạn
  - /add-hotel(post): thêm hotel mới
  - /edit-hotel: cập nhật chi tiết khách sạn
  - .....

- ### Client:
  - /hotel(get): trả về hotel vào số lượng hotel
  - /detail-hotel(get): gửi id của hotel cần xem chi tiết và trả về tri tiết hotel đó
  - /search-hotel(post): tìm kiếm khách sạn phù hợp với yêu cầu
  - /transaction(post): thêm giao dịch
  - /transaction(get): trả về chi tiết giao dịch
- ### Auth:
  - /signupAdmin: đăng kí người dùng với vai trò là admin
  - /signup: thêm người dùng mới
  - /login: đăng nhập

## Start

- Sao chép kho lưu trữ

  ```c
  git clone git@github.com:loveyou162/asm02-nodejs-all.git
  ```

- Cài đặt các phụ thuộc
  ```c
  npm install
  ```

## Contributor

    Phạm Đình Thắng

## Contact

Sdt 0348413520
Email: phamdinhthangpdt02@gmail.com

## Lời kết

Dự án này mang lại sự thuận tiện và linh hoạt cho việc quản lý và tương tác với dữ liệu khách sạn thông qua giao diện API JSON. Chúng tôi hy vọng rằng dự án sẽ mang lại giá trị và trải nghiệm tốt cho người sử dụng. Cảm ơn bạn đã quan tâm và sử dụng dự án của chúng tôi!
