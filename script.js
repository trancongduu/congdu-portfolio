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
    src: ["https://cdn.jsdelivr.net/gh/trancongduu/congdu-portfolio@main/Cyberpunk%20Edgerunners%20Let%20You%20Down.m4a"],
    volume: 0.2,
    autoplay: true,
    loop: true,
    onend: function() {
      console.log('Finished!');
    }
  });

  let clickSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/bedantpixeto/audio/ES_MM%20Beep%2043%20-%20SFX%20Producer.mp3"],
    volume: 0.3,
  });

  let hoverSound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/bedantpixeto/audio/hover-1.mp3"],
    volume: 0.2,
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

  // Toggle mute/unmute functionality on click
  $(document).ready(function() {
  if (localStorage.getItem("muteState") === "true") {
    Howler.mute(true);
    $("#sound").addClass("muted");
  } else {
    Howler.mute(false);
    $("#sound").removeClass("muted");
  }
  $("#sound").on("click", function () {
    let isMuted = !Howler._muted;
    Howler.mute(isMuted);
    $(this).toggleClass("muted", isMuted);
    localStorage.setItem("muteState", isMuted.toString());
  	});
    });

});


