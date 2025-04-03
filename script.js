console.log("File JavaScript đã được tải thành công!");

// Howler Audio
$(document).ready(function() {
  let sound = new Howl({
    src: ["https://cdn.jsdelivr.net/gh/trancongduu/congdu-portfolio@main/Cyberpunk%20Edgerunners%20Let%20You%20Down.m4a"],
    volume: 0.2,
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
  // Chỉ chạy nhạc khi user click vào nút #start
  $("#start").one("click", function (event) {
    Howler.mute(false);
  sound.volume(0.2);
  sound.play();
  });
  // Không cho phép phát nhạc nếu bấm ra ngoài nút #start
  $(document).on("click", function (event) {
    if (!$(event.target).is("#start")) {
      // console.log("Nhấn ngoài nút start, không phát nhạc.");
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



// Matter.js
document.querySelectorAll('.matter-box').forEach(matterBox => {
    var engine = Matter.Engine.create();
    var render = Matter.Render.create({
        element: matterBox,
        engine: engine,
        options: {
            width: matterBox.clientWidth,
            height: matterBox.clientHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    var runner = Matter.Runner.create();
    var world = engine.world;

    // Tạo các phần tử Matter.js trong hộp này
    var elements = matterBox.querySelectorAll('.dm-matter-elem');
    var bodies = Array.from(elements).map(el => {
        var body = Matter.Bodies.rectangle(
            el.offsetLeft + el.offsetWidth / 2,
            el.offsetTop + el.offsetHeight / 2,
            el.offsetWidth,
            el.offsetHeight,
            { restitution: 0.5, friction: 0.1, density: 0.01, render: { opacity: 0 } }
        );
        Matter.Composite.add(world, body);
        return { element: el, body: body };
    });

    // Thêm mouse control riêng cho từng box
    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });

    Matter.Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Cập nhật vị trí của các element trong DOM theo Matter.js
    Matter.Events.on(engine, 'afterUpdate', function() {
        bodies.forEach(({ element, body }) => {
            element.style.left = (body.position.x - element.offsetWidth / 2) + 'px';
            element.style.top = (body.position.y - element.offsetHeight / 2) + 'px';
            element.style.transform = `rotate(${body.angle}rad)`;
        });
    });

    // Chạy engine và render riêng cho từng box
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
});











