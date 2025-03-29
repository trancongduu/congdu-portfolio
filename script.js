console.log("File JavaScript đã được tải thành công!");
alert("File JavaScript đã hoạt động!");

let audio = document.getElementById("myAudio");
  audio.setAttribute("autoplay", "");
  audio.muted = true; // Tắt tiếng để autoplay hoạt động
document.addEventListener("click", () => {
    let audio = document.getElementById("myAudio");
    audio.play();
  }, { once: true }); // Chạy một lần khi người dùng nhấp
