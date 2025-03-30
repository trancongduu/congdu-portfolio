console.log("File JavaScript đã được tải thành công!");

  let audio = document.getElementById("myAudio");
  audio.setAttribute("autoplay", "");
  audio.muted = true; // Tắt tiếng để autoplay hoạt động

  document.getElementById("buttonStart").addEventListener("click", () => {
    audio.play();
    audio.muted = false; 
    audio.volume = 0.1; 
  }, { once: true }); // Chạy một lần khi người dùng nhấp vào nút


// Howler 
$(document).ready(function() {
  let sound = new Howl({
    src: ["https://www.dropbox.com/scl/fi/s1g6pbtuhvr719hww2n5m/Cyberpunk-Edgerunners-Let-You-Down.m4a?rlkey=ilfzy8d5xlogp0oej671fta00&st=d1gjfxh9&raw=1"],
    volume: 0.5,
    autoplay: true,
    loop: true,
    onend: function() {
      console.log('Finished!');
    }
  });

  let clickSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/bedantpixeto/audio/ES_MM%20Beep%2043%20-%20SFX%20Producer.mp3"]
  });

  let hoverSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/bedantpixeto/audio/hover-1.mp3"]
  });

  // Start playing bg sound on click
  $("#start").on("click", function () {
    sound.play();
  });

  // Toggle mute/unmute functionality on click
  $("#sound").on("click", function () {
    $(this).toggleClass("muted");
    if ($(this).hasClass("muted")) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  });

  // Play click sound 
  $("[data-click]").on("click", function () {
    clickSound.play();
  });

  // Play hover sound 
  $("[data-hover]").on("mouseenter", function () {
    hoverSound.play();
  });

 // Pause hover sound when mouse leaves elements with the data-hover attribute
 // $("[data-hover]").on("mouseleave", function () {
 //  hoverSound.pause();
 // });

});


