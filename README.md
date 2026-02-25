# 🌸 Happy Birthday Thảo Ly - Garden of Love

Website chúc mừng sinh nhật nghệ thuật với hiệu ứng hoa đẹp mắt.

## ✨ Tính năng

- 🌸 **Hiệu ứng cánh hoa rơi** - Hoa anh đào rơi nhẹ nhàng trên nền
- 🌹 **Bloom Animation** - Click vào màn hình để tạo bông hoa nở rộ
- 🎵 **Nhạc nền** - Tự động phát nhạc nhẹ nhàng
- 💕 **Khung hoa nghệ thuật** - Thiết kế tinh tế với họa tiết hoa dây
- ✨ **Sparkle Cursor** - Hiệu ứng lấp lánh theo chuột
- 📱 **Responsive** - Đẹp trên mọi thiết bị

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js (v14 trở lên)
- npm

### Các bước

1. **Cài đặt dependencies:**
```bash
cd birthday-thaoly
npm install
```

2. **Chạy server:**
```bash
npm start
```

3. **Mở trình duyệt:**
```
http://localhost:3000
```

### Development mode (tự động reload):
```bash
npm run dev
```

## 📁 Cấu trúc thư mục

```
birthday-thaoly/
├── app.js              # Express server
├── package.json        # Dependencies
├── public/             # Static files
│   ├── css/
│   │   └── style.css   # Styles chính
│   ├── js/
│   │   ├── main.js     # Logic điều khiển
│   │   └── petals.js   # Animation hoa
│   └── audio/
│       └── background-music.mp3  # (Thêm file nhạc)
└── views/
    └── index.html      # Trang chính
```

## 🎵 Thêm nhạc nền

Để thêm nhạc nền, đặt file nhạc vào:
```
public/audio/background-music.mp3
```

**Gợi ý:** Nhạc piano nhẹ nhàng hoặc nhạc không lời romantic.

## 🎨 Tùy chỉnh

### Đổi tên người nhận
Mở `views/index.html` và thay đổi "Thảo Ly" thành tên mong muốn.

### Đổi màu sắc
Mở `public/css/style.css` và chỉnh sửa CSS variables:
```css
:root {
    --primary-pink: #ff6b9d;
    --soft-pink: #ffc2d1;
    --deep-rose: #c94c7a;
    /* ... */
}
```

### Chỉnh lời chúc
Mở `views/index.html` và tìm phần `.message-body` để sửa nội dung.

## 🖼️ Preview

- **Landing Page:** Hiệu ứng hoa rơi + tiêu đề "Happy Birthday"
- **Message Page:** Khung hoa chứa lời chúc trang trọng
- **Interactive:** Click để tạo hoa nở

## ⌨️ Keyboard Shortcuts

- `Enter` / `Space` - Mở thiệp
- `Escape` - Quay lại trang chính
- `M` - Bật/tắt nhạc

## 💝 Made with Love

Được tạo với sự yêu thương dành cho Thảo Ly 🌸
