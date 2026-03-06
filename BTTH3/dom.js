// Bước 1: Lấy các phần tử từ HTML
const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");
const btnRed = document.getElementById("btnRed");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

// Bước 2: Xử lý sự kiện Click cho nút "Chào"
btnHello.addEventListener("click", function () {
  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});

// Bước 3: Xử lý sự kiện Click cho nút đổi màu nền
btnRed.addEventListener("click", function () {
  // Đổi màu nền trang thành đỏ
  document.body.style.backgroundColor = "red";
});

// Bước 4: Xử lý sự kiện Input để hiện lời chào
nameInput.addEventListener("input", function () {
  const value = nameInput.value;
  greeting.textContent = "Xin chào, " + value + "!";
});