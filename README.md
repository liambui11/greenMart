# 📘 Frontend Client - Website Siêu thị trực tuyến GreenMart

## 📌 Mô Tả
Nhu yếu phẩm và thực phẩm là những sản phẩm thiết yếu trong đời sống hàng ngày. Việc quản lý và bán hàng các sản phẩm này một cách hiệu quả đóng vai trò quan trọng đối với cửa hàng và người tiêu dùng. 
Một website chuyên biệt cho việc bán nhu yếu phẩm/thực phẩm sẽ giúp khách hàng dễ dàng tìm kiếm, mua sắm trực tuyến và giúp cửa hàng quản lý kho hàng, đơn hàng, khách hàng hiệu quả hơn.

## 🛠️ Công Nghệ Sử Dụng
- Visual Studio Code: Môi trường phát triển tích hợp (IDE) được sử dụng để lập trình.
- Postman: Công cụ kiểm thử API RESTful.
- Git/GitHub: Quản lý mã nguồn và theo dõi phiên bản.
- Nodejs: Lập trình phía server.
- MongoDB: Quản lý cơ sở dữ liệu.

## 📂 Cấu Trúc Dự Án
```
GreenMartFrontEndClient/
├── public/                         # Tài nguyên tĩnh (ảnh, favicon, manifest, ...)
│   └── image/                      # Thư mục chứa hình ảnh dùng trong giao diện
├── src/                            # Mã nguồn chính
│   ├── actions/                    # Các action cho Redux
│   ├── components/                 # Các component dùng chung
│   ├── config/                     # Cấu hình chung (ví dụ: API base URL)
│   ├── context/                    # Context API (nếu dùng React Context)
│   ├── layout/                     # Các layout (header, footer, sidebar,...)
│   ├── pages/                      # Các trang (Home, ProductDetail, Cart, ...)
│   ├── reducers/                   # Các reducer cho Redux
│   ├── redux/                      # Cấu trúc store Redux tổng thể
│   ├── routes/                     # Định tuyến React Router
│   ├── services/                   # Gọi API, service logic
│   ├── untils/                     # Hàm tiện ích (helpers, formatters,...)
│   ├── App.css                     # CSS chính của toàn ứng dụng
│   ├── App.js                      # File gốc App component
│   ├── index.css                   # CSS chung
│   ├── index.js                    # Entry point của ứng dụng React
│   └── reportWebVitals.js         # Đo hiệu suất web (tuỳ chọn)
├── .env                            # Biến môi trường (API endpoint,...)
├── README.md                       # Tệp giới thiệu dự án
├── .gitignore                      # Bỏ qua các tệp/thư mục không cần đẩy lên Git
├── package.json                    # Quản lý thư viện và scripts
└── package-lock.json               # Khoá phiên bản các dependency

```

## 🚀 Cài Đặt và Chạy Dự Án FrontEnd
### 1. Clone repository
```bash
https://github.com/liambui11/greenMart.git
cd GreenMartFrontEndClient
```

### 2. Cài đặt phụ thuộc
```bash
npm install
```

### 3. Cấu hình các biến môi trường
Tạo file .env tại thư mục gốc và thêm nội dung:
```bash
REACT_APP_GOOGLE_CLIENT_ID=1234567890-abcxyz123.apps.googleusercontent.com
```

### 4. Khởi chạy dự án
```bash
npm start
```

## 👥 Nhóm Thực Hiện
- Nguyễn Ngọc Long - N22DCCN149
- Bùi Kinh Luân - N22DCCN151
- Bùi Minh Quân - N22DCCN163

## 📄 License
Dự án được thực hiện với mục đích học tập
