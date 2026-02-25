# 🌸 Hướng dẫn chạy trên WSL Ubuntu 22.04

## Cách 1: Sử dụng Script Setup (Khuyến nghị)

### Lần đầu chạy:

```bash
# Từ PowerShell
wsl bash /mnt/c/Users/duynh/Documents/Code/birthday-thaoly/setup-wsl.sh
```

Script này sẽ tự động:
- Cài đặt Node.js 20.x
- Cài đặt npm  
- Install dependencies
- Chạy server

### Các lần sau:

```bash
# Từ PowerShell
wsl bash /mnt/c/Users/duynh/Documents/Code/birthday-thaoly/run-wsl.sh
```

## Cách 2: Chạy thủ công trong WSL

### 1. Mở WSL Ubuntu terminal:

```bash
wsl
```

### 2. Kiểm tra Node.js (nếu chưa có thì cài):

```bash
# Kiểm tra
node --version
npm --version

# Nếu chưa có, cài đặt:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Chuyển đến thư mục project:

```bash
cd /mnt/c/Users/duynh/Documents/Code/birthday-thaoly
```

### 4. Cài đặt dependencies:

```bash
npm install
```

### 5. Chạy server:

```bash
npm start
```

## Mở website:

Sau khi server chạy, mở trình duyệt và truy cập:

```
http://localhost:3000
```

## Tắt server:

Nhấn `Ctrl+C` trong terminal

## Lưu ý:

- **Port mặc định:** 3000
- **Nếu port 3000 đã được sử dụng:** Server sẽ tự động tìm port khác
- **Xem log:** Terminal sẽ hiển thị thông báo khi server đã sẵn sàng

## Troubleshooting:

### Lỗi: "npm: command not found"
```bash
# Cài đặt Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Lỗi: "EADDRINUSE" (Port đã được sử dụng)
```bash
# Tìm process đang dùng port 3000
lsof -i :3000
# Hoặc kill port
kill -9 $(lsof -t -i:3000)
```

### Lỗi permission denied khi chạy script
```bash
# Thêm quyền execute
chmod +x /mnt/c/Users/duynh/Documents/Code/birthday-thaoly/setup-wsl.sh
chmod +x /mnt/c/Users/duynh/Documents/Code/birthday-thaoly/run-wsl.sh
```

## 🎨 Sau khi chạy thành công:

1. Mở trình duyệt tại `http://localhost:3000`
2. Nhấn "Mở Thiệp" để xem lời chúc
3. Click vào màn hình để tạo hoa nở 🌸
4. Bật nhạc nền bằng nút ở góc phải trên

🌹 Chúc bạn có trải nghiệm tuyệt vời!
