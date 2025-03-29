console.log("File JavaScript đã được tải thành công!");
let audio = document.getElementById("myAudio");
  audio.setAttribute("autoplay", "");
  audio.muted = true; // Tắt tiếng để autoplay hoạt động
document.addEventListener("click", () => {
    let audio = document.getElementById("myAudio");
    audio.play();
    audio.muted = false; 
    audio.volume = 0.1; 
  }, { once: true }); // Chạy một lần khi người dùng nhấp
