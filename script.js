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
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// select the element where you want to render the simulation
var matterBox = document.querySelector('.matter-box');

// create a renderer
var render = Render.create({
    element: matterBox,
    engine: engine,
    options: {
        width: matterBox.clientWidth,
        height: matterBox.clientHeight,
        wireframes: false, // Đặt thành true để thấy các hình dạng vật lý
        background: 'transparent'
    }
});

var matterElems = document.querySelectorAll('.dm-matter-elem');
var matterCircle = document.querySelectorAll('.dm-matter-elem-circle');
var matterPill = document.querySelectorAll('.dm-matter-elem-pill');

// Lưu trữ tham chiếu đến các body và vị trí ban đầu
var elemBodies = [];
var elemCircles = [];
var elemPills = [];

// Function to create rectangles for dm-matter-elem elements
function createRectangles() {
    // Xóa các body cũ nếu có (quan trọng khi resize)
    elemBodies.forEach(body => Composite.remove(engine.world, body));
    elemBodies = []; // Reset mảng

    return Array.from(matterElems).map(function(matterElem) {
        var elemWidth = matterElem.offsetWidth;
        var elemHeight = matterElem.offsetHeight;
        // Tính vị trí ban đầu dựa trên CSS
        var elemInitialPosX = matterElem.offsetLeft + elemWidth / 2;
        var elemInitialPosY = matterElem.offsetTop + elemHeight / 2;

        var elemBody = Bodies.rectangle(elemInitialPosX, elemInitialPosY, elemWidth, elemHeight, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0 // Ẩn hình dạng vật lý
            }
        });

        // Lưu trữ vị trí và góc ban đầu vào chính body
        elemBody.initialPosition = { x: elemInitialPosX, y: elemInitialPosY };
        elemBody.initialAngle = 0; // Giả sử góc ban đầu là 0

        Composite.add(engine.world, elemBody);
        elemBodies.push(elemBody); // Thêm vào mảng quản lý
        return elemBody;
    });
}

// Function to create circles for dm-matter-elem-circle elements
function createCircles() {
    // Xóa các body cũ nếu có
    elemCircles.forEach(body => Composite.remove(engine.world, body));
    elemCircles = []; // Reset mảng

    return Array.from(matterCircle).map(function(matterCircleElem) {
        var circleElemWidth = matterCircleElem.offsetWidth;
        var circleElemHeight = matterCircleElem.offsetHeight;
        var circleElemInitialPosX = matterCircleElem.offsetLeft + circleElemWidth / 2;
        var circleElemInitialPosY = matterCircleElem.offsetTop + circleElemHeight / 2;
        var radius = Math.max(circleElemWidth, circleElemHeight) / 2;

        var circleBody = Bodies.circle(circleElemInitialPosX, circleElemInitialPosY, radius, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        circleBody.initialPosition = { x: circleElemInitialPosX, y: circleElemInitialPosY };
        circleBody.initialAngle = 0;

        Composite.add(engine.world, circleBody);
        elemCircles.push(circleBody);
        return circleBody;
    });
}

// Function to create pill shapes for dm-matter-elem-pill elements
function createPills() {
    // Xóa các body cũ nếu có
    elemPills.forEach(body => Composite.remove(engine.world, body));
    elemPills = []; // Reset mảng

    return Array.from(matterPill).map(function(matterPillElem) {
        var pillWidth = matterPillElem.offsetWidth;
        var pillHeight = matterPillElem.offsetHeight;
        var pillInitialPosX = matterPillElem.offsetLeft + pillWidth / 2;
        var pillInitialPosY = matterPillElem.offsetTop + pillHeight / 2;
        var pillRadius = pillHeight / 2;

        // Tính toán vị trí tương đối của các phần tử con
        var rectWidth = pillWidth - pillHeight; // Chiều rộng phần chữ nhật ở giữa
        var circleOffsetX = rectWidth / 2; // Khoảng cách từ tâm đến tâm hình tròn

        var leftCircle = Bodies.circle(-circleOffsetX, 0, pillRadius); // Vị trí tương đối so với tâm body tổng hợp
        var rightCircle = Bodies.circle(circleOffsetX, 0, pillRadius);
        var rect = Bodies.rectangle(0, 0, rectWidth, pillHeight);

        var pillBody = Body.create({
            parts: [leftCircle, rightCircle, rect],
            friction: 0.1,
            restitution: 0.5,
            density: 0.01, // Đặt density ở đây
            render: {
                // Ẩn từng phần nếu cần (hoặc đặt opacity=0 ở đây thay vì từng phần)
                opacity: 0
            }
        });

        // Đặt vị trí ban đầu cho body tổng hợp
        Body.setPosition(pillBody, { x: pillInitialPosX, y: pillInitialPosY });

        pillBody.initialPosition = { x: pillInitialPosX, y: pillInitialPosY };
        pillBody.initialAngle = 0;

        Composite.add(engine.world, pillBody);
        elemPills.push(pillBody);
        return pillBody;
    });
}

// --- Tạo vật thể ban đầu ---
function createAllBodies() {
    elemBodies = createRectangles();
    elemCircles = createCircles();
    elemPills = createPills();
}

// --- Biến lưu trữ các đường biên ---
var boundaries = [];

// Function to create static bodies for boundaries
function createBoundaries() {
    // Xóa các đường biên cũ trước khi tạo mới
    boundaries.forEach(body => Composite.remove(engine.world, body));
    boundaries = []; // Reset mảng

    var ground = Bodies.rectangle(matterBox.clientWidth / 2, matterBox.clientHeight + 30, matterBox.clientWidth + 60, 60, { // Dịch xuống và làm dày hơn để đảm bảo không bị lọt
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', opacity: 0 } // Hoàn toàn ẩn
    });

    var leftWall = Bodies.rectangle(-30, matterBox.clientHeight / 2, 60, matterBox.clientHeight + 60, {
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', opacity: 0 }
    });

    var rightWall = Bodies.rectangle(matterBox.clientWidth + 30, matterBox.clientHeight / 2, 60, matterBox.clientHeight + 60, {
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', opacity: 0 }
    });

    var topWall = Bodies.rectangle(matterBox.clientWidth / 2, -30, matterBox.clientWidth + 60, 60, {
        isStatic: true,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', opacity: 0 }
    });

    boundaries = [ground, leftWall, rightWall, topWall];
    Composite.add(engine.world, boundaries);
}

// --- Khởi tạo ban đầu ---
createAllBodies();
createBoundaries();

// create runner
var runner = Runner.create();

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false // Ẩn đường nối khi kéo
            }
        }
    });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// update positions and rotations after every engine update
Events.on(engine, 'afterUpdate', function() {
    // Cập nhật vị trí và góc quay cho các DOM elements tương ứng
    elemBodies.forEach(function(elemBody, index) {
        var matterElem = matterElems[index];
        if (!matterElem) return; // Kiểm tra nếu element không tồn tại
        var angle = elemBody.angle;
        var position = elemBody.position;
        matterElem.style.transform = `translate(${position.x - matterElem.offsetWidth / 2}px, ${position.y - matterElem.offsetHeight / 2}px) rotate(${angle}rad)`;
        // Sử dụng transform thay vì left/top để hiệu năng tốt hơn
        // matterElem.style.left = (position.x - matterElem.offsetWidth / 2) + 'px';
        // matterElem.style.top = (position.y - matterElem.offsetHeight / 2) + 'px';
        // matterElem.style.transform = 'rotate(' + angle + 'rad)';
    });

    elemCircles.forEach(function(circleBody, index) {
        var matterCircleElem = matterCircle[index];
        if (!matterCircleElem) return;
        var angle = circleBody.angle;
        var position = circleBody.position;
        matterCircleElem.style.transform = `translate(${position.x - matterCircleElem.offsetWidth / 2}px, ${position.y - matterCircleElem.offsetHeight / 2}px) rotate(${angle}rad)`;
    });

    elemPills.forEach(function(pillBody, index) {
        var matterPillElem = matterPill[index];
        if (!matterPillElem) return;
        var angle = pillBody.angle;
        var position = pillBody.position;
        matterPillElem.style.transform = `translate(${position.x - matterPillElem.offsetWidth / 2}px, ${position.y - matterPillElem.offsetHeight / 2}px) rotate(${angle}rad)`;
    });
});

// Function to handle resize event
function handleResize() {
    // Không cần xóa hết world nữa, chỉ cần cập nhật kích thước renderer và tạo lại biên
    // Composite.clear(engine.world, false); // Không dùng clear nữa

    // Cập nhật kích thước renderer
    render.bounds.max.x = matterBox.clientWidth;
    render.bounds.max.y = matterBox.clientHeight;
    render.options.width = matterBox.clientWidth;
    render.options.height = matterBox.clientHeight;
    render.canvas.width = matterBox.clientWidth;
    render.canvas.height = matterBox.clientHeight;

    // Tạo lại đường biên với kích thước mới
    createBoundaries();

    // Tạo lại các vật thể (chúng sẽ đọc lại vị trí từ DOM elements đã thay đổi do CSS/resize)
    // Quan trọng: Điều này giả định các element DOM tự điều chỉnh vị trí khi resize
    // Nếu không, bạn cần tính toán lại vị trí ban đầu ở đây.
    createAllBodies();

    // Cập nhật mouse constraint (phần này có vẻ không cần thiết nếu canvas thay đổi đúng cách)
    // Mouse.setOffset(mouse, { x: 0, y: 0 }); // Reset offset nếu cần
}

// Add resize event listener (có thể cần debounce để tránh gọi quá nhiều)
var resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100); // Chờ 100ms sau lần resize cuối cùng
});

// --- Xử lý cuộn/touch --- (Giữ nguyên như code gốc của bạn)
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
  if (mouseConstraint.body) {
    // Chỉ ngăn chặn default nếu đang kéo một vật thể
    e.preventDefault();
    mouseConstraint.mouse.mousemove(e);
  }
}, { passive: false }); // passive: false để có thể gọi preventDefault
mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
  if (mouseConstraint.body) {
    mouseConstraint.mouse.mouseup(e);
  }
});


// --- Nút Reset ---
var resetButton = document.getElementById('resetMatterBox');
if (resetButton) {
    resetButton.addEventListener('click', function() {
        console.log('Resetting simulation...');
        // Đặt lại vị trí, góc quay và vận tốc cho tất cả các bodies
        [...elemBodies, ...elemCircles, ...elemPills].forEach(function(body) {
            if (body.initialPosition && typeof body.initialAngle !== 'undefined') {
                // Đặt lại trạng thái ngủ (sleeping state) để đảm bảo vật thể hoạt động trở lại
                Body.setSleeping(body, false);

                // Đặt lại vị trí và góc quay
                Body.setPosition(body, body.initialPosition);
                Body.setAngle(body, body.initialAngle);

                // Đặt lại vận tốc và vận tốc góc
                Body.setVelocity(body, { x: 0, y: 0 });
                Body.setAngularVelocity(body, 0);
            } else {
                console.warn('Body missing initial state:', body);
            }
        });
        console.log('Simulation reset.');
    });
} else {
    console.warn('Reset button #resetMatterBox not found.');
}


// Flag to check if the engine has started
var engineStarted = false;

// Intersection Observer to start the engine only once
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !engineStarted) {
            console.log('Matter engine starting...');
            engineStarted = true;
            Runner.run(runner, engine);
            Render.run(render);
            // Khởi tạo lại vị trí DOM element lần cuối trước khi chạy
            // (Phòng trường hợp CSS load chậm hoặc font thay đổi kích thước)
            // Có thể bỏ qua nếu không gặp vấn đề về vị trí ban đầu
             Events.trigger(engine, 'afterUpdate'); // Chạy vòng lặp cập nhật 1 lần để đồng bộ DOM
             console.log('Matter engine running.');
        }
        // Bạn có thể thêm logic để dừng Runner/Render khi ra khỏi viewport nếu muốn tiết kiệm tài nguyên
        // else if (!entry.isIntersecting && engineStarted) {
        //     console.log('Matter engine pausing...');
        //     Runner.stop(runner); // Tạm dừng engine
        //     Render.stop(render); // Tạm dừng render
        //     engineStarted = false; // Cho phép khởi động lại khi quay lại viewport
        // }
    });
}, {
    threshold: 0.1 // Chạy khi 10% element hiển thị
});

// Start observing the matterBox
if (matterBox) {
    observer.observe(matterBox);
} else {
    console.error('.matter-box element not found.');
}








