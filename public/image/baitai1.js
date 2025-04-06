// Tự động chuyển ảnhảnh
const listImage = document.querySelector('.list-images');
const imgs = document.querySelectorAll('.img1');
const length = imgs.length; // Đặt đúng tên biến
let current = 0;
// -----
// chuyển = Dot
const dots = document.querySelectorAll('.dot')
//Chuyển slides
const contents = document.querySelectorAll(".slideshow-content");

// Ví dụ thử về Cart
const productList = document.querySelector('.product-list');
const products = document.querySelectorAll('.product');
const totalProducts = products.length;
const visibleProducts = 4; // Số sản phẩm hiển thị cùng lúc
let currentIndex = 0;


// Hàm cập nhật nội dung hiển thị
function updateContent() {
    // Ẩn tất cả nội dung
    contents.forEach(content => content.style.display = "none");

    // Hiển thị nội dung ảnh hiện tại
    contents[current].style.display = "block";
}

contents.forEach((content, index) => {
    content.style.display = index === 0 ? "block" : "none";
});

// Tự động chuyển ảnhảnh
setInterval(() => {
    let width = imgs[0].offsetWidth;

    if (current >= length - 1) {
        current = 0;
        listImage.style.transition = "none";
        listImage.style.transform = `translateX(0px)`;
    } else {
        current++;
        listImage.style.transition = "transform 0.5s ease-in-out";
        listImage.style.transform = `translateX(${width * -1 * current}px)`;
    }

    updateDots();
    updateContent();
    // VD thử về cart----------------------------
    currentIndex++;

    if (currentIndex > totalProducts - visibleProducts) {
        currentIndex = 0; // Khi đến sản phẩm cuối, quay lại đầu
    }

    let offset = currentIndex * -25; // Mỗi sản phẩm chiếm 25% chiều rộng
    productList.style.transform = `translateX(${offset}%)`;
}, 2000);



//Chuyển ảnh = Dot
function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"))
    dots[current].classList.add("active")
}

// Hàm chuyển ảnh khi click vào dot
function currentSlide(index) {
    let width = imgs[0].offsetWidth;
    current = index;
    listImage.style.transition = "transform 0.5s ease-in-out";
    listImage.style.transform = `translateX(${-width * current}px)`;
    updateDots();
    resetInterval();
}

// Gán sự kiện click cho từng dot
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => currentSlide(index));
});

