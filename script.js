console.log("File JavaScript đã được tải thành công!");

  // let audio = document.getElementById("myAudio");
  // audio.setAttribute("autoplay", "");
  // audio.muted = true; // Tắt tiếng để autoplay hoạt động

  // document.getElementById("buttonStart").addEventListener("click", () => {
  //   audio.play();
  //   audio.muted = false; 
  //   audio.volume = 0.1; 
  // }, { once: true }); // Chạy một lần khi người dùng nhấp vào nút


// Howler Audio
$(document).ready(function() {
  let sound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/trancongduu/congdu-portfolio@main/Cyberpunk%20Edgerunners%20Let%20You%20Down.m4a"],
    volume: 0.2,
    loop: true,
    onload: function() {
      // Khi audio đã tải xong, kiểm tra xem có lưu tiến trình phát từ trước không
      let savedPosition = localStorage.getItem("playProgress");
      if (savedPosition) {
        // Đặt vị trí phát tiếp theo và tự động chạy nhạc
        sound.seek(parseFloat(savedPosition));
        sound.play();
      }
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

  // Nếu nhạc đã bật từ trang trước, tự động play và ẩn nút #start
  if (localStorage.getItem("isPlaying") === "true") {
    Howler.mute(false);
    sound.volume(0.2);
    if (!sound.playing()) {
      sound.play();
    }
    $("#start").hide();
  }

  // Khi user bấm #start, phát nhạc và ẩn nút để tránh phát lại
  $("#start").one("click", function () {
    Howler.mute(false);
    sound.volume(0.2);
    sound.play();
    localStorage.setItem("isPlaying", "true");
  });

  // Lưu tiến trình phát trước khi rời trang (nếu nhạc đang phát)
  $(window).on("beforeunload", function () {
    if (sound.playing()) {
      localStorage.setItem("playProgress", sound.seek());
    }
  });

  // Toggle mute/unmute với localStorage
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

  // Phát âm thanh khi click
  $("[data-click]").on("click", function () {
    clickSound.play();
  });

  // Phát âm thanh khi hover
  $("[data-hover]").on("mouseenter", function () {
    hoverSound.play();
  });


});



// Lenis scroll smooth
if (!document.querySelector("html").classList.contains('w-editor')){
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  // Get scroll value. This is just for testing purposes. Delete this if you're not using the scroll value for anything.
  // lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  //   console.log({ scroll, limit, velocity, direction, progress })
  // })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  // Grab all elements that have a "data-target" attribute
  const scrollButtons = document.querySelectorAll('[data-target]');

  // For each element, listen to a "click" event
  scrollButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      // get the DOM element by the ID (data-target value)
      var target = button.dataset.target,
          $el = document.getElementById(target.replace('#', ''));

      // Use lenis.scrollTo() to scroll the page to the right element
      lenis.scrollTo($el, {
        offset: 0, 
        immediate: false,
        duration: 1.5,
        easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), // https://easings.net
      });
    });
  });

  requestAnimationFrame(raf)
}





