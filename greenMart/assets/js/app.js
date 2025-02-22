const button = document.querySelector(".dropdown .button");
const content = document.querySelector(".content");

button.addEventListener("click", function () {
    if (content.classList.contains("show")) {
        content.classList.remove("show");
    } else {
        content.classList.add("show");
    }
});