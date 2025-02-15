document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-img");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const link = button.parentElement.getAttribute("href");
            window.open(link, "_blank");
        });
    });
});
