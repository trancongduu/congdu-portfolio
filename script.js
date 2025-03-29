console.log("File JavaScript đã được tải thành công!");
alert("File JavaScript đã hoạt động!");

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".tab-projects").addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        
        const projectSection = document.querySelector("section#project");
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});
