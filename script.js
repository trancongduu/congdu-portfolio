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
// --- Matter.js setup (giữ nguyên phần khai báo ban đầu) ---
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Body = Matter.Body;

var engine = Engine.create();
var matterBox = document.querySelector('.matter-box');
if (!matterBox) console.error('.matter-box element not found!');

var render = Render.create({
    element: matterBox,
    engine: engine,
    options: {
        width: matterBox ? matterBox.clientWidth : 800, // Default size if element not found yet
        height: matterBox ? matterBox.clientHeight : 600,
        wireframes: false, // Set true for debugging shapes
        background: 'transparent'
    }
});

var matterElems = document.querySelectorAll('.dm-matter-elem');
var matterCircle = document.querySelectorAll('.dm-matter-elem-circle');
var matterPill = document.querySelectorAll('.dm-matter-elem-pill');

// Mảng lưu trữ vật thể và trạng thái ban đầu
var elementBodies = []; // Dùng một mảng duy nhất để dễ quản lý

// --- Hàm tạo vật thể (LƯU Ý: Chỉ chạy 1 lần khi khởi tạo) ---
function createInitialBodies() {
    console.log("Creating initial bodies...");
    elementBodies = []; // Xóa các body cũ nếu hàm này được gọi lại (không nên xảy ra trong luồng này)

    // Rectangles
    matterElems.forEach(function(matterElem, index) {
        try {
            var elemWidth = matterElem.offsetWidth;
            var elemHeight = matterElem.offsetHeight;
            var elemInitialPosX = matterElem.offsetLeft + elemWidth / 2;
            var elemInitialPosY = matterElem.offsetTop + elemHeight / 2;

            var elemBody = Bodies.rectangle(elemInitialPosX, elemInitialPosY, elemWidth, elemHeight, {
                density: 0.01, friction: 0.1, restitution: 0.5, render: { opacity: 0 }
            });

            elemBody.initialPosition = { x: elemInitialPosX, y: elemInitialPosY };
            elemBody.initialAngle = 0;
            elemBody.domElement = matterElem; // Liên kết body với DOM element

            Composite.add(engine.world, elemBody);
            elementBodies.push(elemBody);
        } catch (error) {
            console.error("Error creating rectangle body for:", matterElem, error);
        }
    });

    // Circles
    matterCircle.forEach(function(matterCircleElem, index) {
       try {
            var circleElemWidth = matterCircleElem.offsetWidth;
            var circleElemHeight = matterCircleElem.offsetHeight; // Dùng cả height để tính tâm nếu không phải hình tròn hoàn hảo
            var circleElemInitialPosX = matterCircleElem.offsetLeft + circleElemWidth / 2;
            var circleElemInitialPosY = matterCircleElem.offsetTop + circleElemHeight / 2;
            var radius = Math.max(circleElemWidth, circleElemHeight) / 2; // Bán kính là nửa cạnh lớn nhất

            var circleBody = Bodies.circle(circleElemInitialPosX, circleElemInitialPosY, radius, {
                density: 0.01, friction: 0.1, restitution: 0.5, render: { opacity: 0 }
            });

            circleBody.initialPosition = { x: circleElemInitialPosX, y: circleElemInitialPosY };
            circleBody.initialAngle = 0;
            circleBody.domElement = matterCircleElem;

            Composite.add(engine.world, circleBody);
            elementBodies.push(circleBody);
        } catch (error) {
            console.error("Error creating circle body for:", matterCircleElem, error);
        }
    });

    // Pills
    matterPill.forEach(function(matterPillElem, index) {
        try {
            var pillWidth = matterPillElem.offsetWidth;
            var pillHeight = matterPillElem.offsetHeight;
            var pillInitialPosX = matterPillElem.offsetLeft + pillWidth / 2;
            var pillInitialPosY = matterPillElem.offsetTop + pillHeight / 2;
            var pillRadius = pillHeight / 2;

            if (pillWidth < pillHeight) {
                 console.warn("Pill element is taller than wide, physics might be unexpected:", matterPillElem);
                 // Có thể xử lý như hình chữ nhật hoặc hình tròn nếu muốn
            }

            var rectWidth = Math.max(0, pillWidth - pillHeight); // Đảm bảo không âm
            var circleOffsetX = rectWidth / 2;

            // Tạo các phần với vị trí tương đối (0,0) là tâm của body tổng hợp
            var parts = [];
             if (rectWidth > 0) {
                parts.push(Bodies.rectangle(0, 0, rectWidth, pillHeight, { render: { opacity: 0 } })); // Phần chữ nhật ở giữa
             }
             // Luôn thêm 2 hình tròn ở 2 đầu (kể cả khi rectWidth=0, chúng sẽ chồng lên nhau tạo thành hình tròn)
             parts.push(Bodies.circle(-circleOffsetX, 0, pillRadius, { render: { opacity: 0 } })); // Trái
             parts.push(Bodies.circle(circleOffsetX, 0, pillRadius, { render: { opacity: 0 } })); // Phải

            var pillBody = Body.create({
                parts: parts,
                friction: 0.1, restitution: 0.5, density: 0.01,
                render: { opacity: 0 } // Ẩn body tổng hợp (vì các phần đã ẩn)
            });

            // Đặt vị trí và góc ban đầu cho body tổng hợp
            Body.setPosition(pillBody, { x: pillInitialPosX, y: pillInitialPosY });
            Body.setAngle(pillBody, 0); // Góc ban đầu

            pillBody.initialPosition = { x: pillInitialPosX, y: pillInitialPosY };
            pillBody.initialAngle = 0;
            pillBody.domElement = matterPillElem;

            Composite.add(engine.world, pillBody);
            elementBodies.push(pillBody);
        } catch (error) {
            console.error("Error creating pill body for:", matterPillElem, error);
        }
    });
    console.log("Initial bodies created:", elementBodies.length);
}

// --- Hàm tạo đường biên ---
var boundaries = [];
function createBoundaries() {
    console.log("Creating boundaries...");
    // Xóa đường biên cũ
    boundaries.forEach(body => Composite.remove(engine.world, body));
    boundaries = [];

    if (!matterBox) return; // Không tạo biên nếu không có container

    var thickness = 60; // Làm đường biên dày hơn để tránh lọt
    var width = matterBox.clientWidth;
    var height = matterBox.clientHeight;

    boundaries = [
        // Ground (bottom)
        Bodies.rectangle(width / 2, height + thickness / 2, width + thickness*2, thickness, { isStatic: true, render: { visible: false } }),
        // Top wall
        Bodies.rectangle(width / 2, -thickness / 2, width + thickness*2, thickness, { isStatic: true, render: { visible: false } }),
        // Left wall
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness*2, { isStatic: true, render: { visible: false } }),
        // Right wall
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness*2, { isStatic: true, render: { visible: false } })
    ];

    Composite.add(engine.world, boundaries);
    console.log("Boundaries created.");
}

// --- Khởi tạo ban đầu ---
createInitialBodies();
createBoundaries();

// --- Runner & Mouse (giữ nguyên) ---
var runner = Runner.create();
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
});
Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

// --- Vòng lặp cập nhật (Update Loop) ---
Events.on(engine, 'afterUpdate', function() {
    elementBodies.forEach(function(body) {
        var domElem = body.domElement;
        if (!domElem) return; // Bỏ qua nếu không có DOM element tương ứng

        var position = body.position;
        var angle = body.angle;

        // Dùng transform để hiệu năng tốt hơn
        domElem.style.transform = `translate(${position.x - domElem.offsetWidth / 2}px, ${position.y - domElem.offsetHeight / 2}px) rotate(${angle}rad)`;
    });
});

// --- Xử lý Resize (ĐƠN GIẢN HÓA) ---
function handleResize() {
    console.log("Handling resize...");
    if (!matterBox) return;

    // 1. Cập nhật kích thước renderer
    render.options.width = matterBox.clientWidth;
    render.options.height = matterBox.clientHeight;
    render.bounds.max.x = matterBox.clientWidth;
    render.bounds.max.y = matterBox.clientHeight;
    render.canvas.width = matterBox.clientWidth;
    render.canvas.height = matterBox.clientHeight;

    // 2. Chỉ tạo lại đường biên
    createBoundaries();

    // KHÔNG tạo lại element bodies ở đây nữa
    console.log("Resize handled.");
}

var resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150); // Tăng debounce time một chút
});

// --- Xử lý cuộn/touch (giữ nguyên như code trước) ---
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);
mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
  if (mouseConstraint.body) {
    // Chỉ ngăn chặn default nếu đang kéo một vật thể
    try { e.preventDefault(); } catch (err) {} // Thêm try-catch phòng lỗi
    mouseConstraint.mouse.mousemove(e);
  }
}, { passive: false });
mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
  if (mouseConstraint.body) {
    mouseConstraint.mouse.mouseup(e);
  }
});


// --- Nút Reset ---
var resetButton = document.getElementById('resetMatterBox');
if (resetButton) {
    resetButton.addEventListener('click', function() {
        console.log('--- Resetting simulation ---');
        if (elementBodies.length === 0) {
             console.warn("No bodies found to reset. Was initialization successful?");
             return;
        }
        elementBodies.forEach(function(body) {
            // Kiểm tra xem body có hợp lệ và có trạng thái ban đầu không
            if (body && body.initialPosition && typeof body.initialAngle !== 'undefined') {
                try {
                    // Đặt lại trạng thái ngủ
                    Body.setSleeping(body, false);
                    // Đặt lại vị trí và góc
                    Body.setPosition(body, body.initialPosition);
                    Body.setAngle(body, body.initialAngle);
                    // Đặt lại vận tốc
                    Body.setVelocity(body, { x: 0, y: 0 });
                    Body.setAngularVelocity(body, 0);
                } catch (error) {
                    console.error("Error resetting body:", body, error);
                }
            } else {
                console.warn('Body missing initial state or invalid:', body);
            }
        });
        console.log('--- Simulation reset complete ---');
         // Có thể cần trigger update 1 lần để DOM đồng bộ ngay lập tức
        // Events.trigger(engine, 'afterUpdate');
    });
} else {
    console.warn('Reset button #resetMatterBox not found.');
}

// --- Intersection Observer (giữ nguyên) ---
var engineStarted = false;
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !engineStarted) {
            console.log('Matter engine starting...');
            engineStarted = true;
            Runner.run(runner, engine);
            Render.run(render);
            console.log('Matter engine running.');
        }
        // Tạm thời bỏ qua việc dừng engine khi ra khỏi viewport
    });
}, { threshold: 0.1 });

if (matterBox) {
    observer.observe(matterBox);
}








