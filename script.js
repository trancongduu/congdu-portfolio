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
        wireframes: false,
        background: 'transparent'
    }
});

var matterElems = document.querySelectorAll('.dm-matter-elem');
var matterCircle = document.querySelectorAll('.dm-matter-elem-circle');
var matterPill = document.querySelectorAll('.dm-matter-elem-pill');

// Function to create rectangles for dm-matter-elem elements
function createRectangles() {
    return Array.from(matterElems).map(function(matterElem) {
        var elemWidth = matterElem.offsetWidth;
        var elemHeight = matterElem.offsetHeight;
        var elemPosX = matterElem.offsetLeft + elemWidth / 2;
        var elemPosY = matterElem.offsetTop + elemHeight / 2;

        var elemBody = Bodies.rectangle(elemPosX, elemPosY, elemWidth, elemHeight, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        Composite.add(engine.world, elemBody);
        return elemBody;
    });
}

// Function to create circles for dm-matter-elem-circle elements
function createCircles() {
    return Array.from(matterCircle).map(function(matterCircleElem) {
        var circleElemWidth = matterCircleElem.offsetWidth;
        var circleElemHeight = matterCircleElem.offsetHeight;
        var circleElemPosX = matterCircleElem.offsetLeft + circleElemWidth / 2;
        var circleElemPosY = matterCircleElem.offsetTop + circleElemHeight / 2;

        var circleBody = Bodies.circle(circleElemPosX, circleElemPosY, Math.max(circleElemWidth, circleElemHeight) / 2, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        Composite.add(engine.world, circleBody);
        return circleBody;
    });
}

// Function to create pill shapes for dm-matter-elem-pill elements
function createPills() {
    return Array.from(matterPill).map(function(matterPillElem) {
        var pillWidth = matterPillElem.offsetWidth;
        var pillHeight = matterPillElem.offsetHeight;
        var pillPosX = matterPillElem.offsetLeft + pillWidth / 2;
        var pillPosY = matterPillElem.offsetTop + pillHeight / 2;
        var pillRadius = pillHeight / 2;

        var leftCircle = Bodies.circle(pillPosX - pillWidth / 2 + pillRadius, pillPosY, pillRadius, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        var rightCircle = Bodies.circle(pillPosX + pillWidth / 2 - pillRadius, pillPosY, pillRadius, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        var rect = Bodies.rectangle(pillPosX, pillPosY, pillWidth - pillHeight, pillHeight, {
            density: 0.01,
            friction: 0.1,
            restitution: 0.5,
            render: {
                opacity: 0
            }
        });

        var pillBody = Body.create({
            parts: [leftCircle, rightCircle, rect],
            friction: 0.1,
            restitution: 0.5
        });

        Composite.add(engine.world, pillBody);
        return pillBody;
    });
}

// create bodies for elements
var elemBodies = createRectangles();
var elemCircles = createCircles();
var elemPills = createPills();

// Function to create static bodies for boundaries
function createBoundaries() {
    var ground = Bodies.rectangle(matterBox.clientWidth / 2, matterBox.clientHeight, matterBox.clientWidth, 1, {
        isStatic: true,
        render: {
            opacity: 0
        }
    });

    var leftWall = Bodies.rectangle(0, matterBox.clientHeight / 2, 1, matterBox.clientHeight, {
        isStatic: true,
        render: {
            opacity: 0
        }
    });

    var rightWall = Bodies.rectangle(matterBox.clientWidth, matterBox.clientHeight / 2, 1, matterBox.clientHeight, {
        isStatic: true,
        render: {
            opacity: 0
        }
    });

    var topWall = Bodies.rectangle(matterBox.clientWidth / 2, 0, matterBox.clientWidth, 1, {
        isStatic: true,
        render: {
            opacity: 0
        }
    });

    // add all of the bodies to the world
    Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);
}

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
                visible: false
            }
        }
    });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// update positions and rotations after every engine update
Events.on(engine, 'afterUpdate', function() {
    elemBodies.forEach(function(elemBody, index) {
        var angle = elemBody.angle;
        var position = elemBody.position;
        var matterElem = matterElems[index];

        matterElem.style.left = (position.x - matterElem.offsetWidth / 2) + 'px';
        matterElem.style.top = (position.y - matterElem.offsetHeight / 2) + 'px';
        matterElem.style.transform = 'rotate(' + angle + 'rad)';
    });

    elemCircles.forEach(function(circleBody, index) {
        var angle = circleBody.angle;
        var position = circleBody.position;
        var matterCircleElem = matterCircle[index];

        matterCircleElem.style.left = (position.x - matterCircleElem.offsetWidth / 2) + 'px';
        matterCircleElem.style.top = (position.y - matterCircleElem.offsetHeight / 2) + 'px';
        matterCircleElem.style.transform = 'rotate(' + angle + 'rad)';
    });

    elemPills.forEach(function(pillBody, index) {
        var angle = pillBody.angle;
        var position = pillBody.position;
        var matterPillElem = matterPill[index];

        matterPillElem.style.left = (position.x - matterPillElem.offsetWidth / 2) + 'px';
        matterPillElem.style.top = (position.y - matterPillElem.offsetHeight / 2) + 'px';
        matterPillElem.style.transform = 'rotate(' + angle + 'rad)';
    });


    var boxBounds = {
        minX: 0,
        maxX: matterBox.clientWidth,
        minY: 0,
        maxY: matterBox.clientHeight
    };

    function constrainBody(body, element) {
        if (body.position.x < boxBounds.minX) {
            Body.setPosition(body, { x: boxBounds.minX + 10, y: body.position.y });
        }
        if (body.position.x > boxBounds.maxX) {
            Body.setPosition(body, { x: boxBounds.maxX - 10, y: body.position.y });
        }
        if (body.position.y < boxBounds.minY) {
            Body.setPosition(body, { x: body.position.x, y: boxBounds.minY + 10 });
        }
        if (body.position.y > boxBounds.maxY) {
            Body.setPosition(body, { x: body.position.x, y: boxBounds.maxY - 10 });
        }

        element.style.left = (body.position.x - element.offsetWidth / 2) + 'px';
        element.style.top = (body.position.y - element.offsetHeight / 2) + 'px';
    }

    elemBodies.forEach((body, index) => constrainBody(body, matterElems[index]));
    elemCircles.forEach((body, index) => constrainBody(body, matterCircle[index]));
    elemPills.forEach((body, index) => constrainBody(body, matterPill[index]));
});

// Function to handle resize event
function handleResize() {
    // Clear the existing bodies
    Composite.clear(engine.world, false);

    // Recreate boundaries and bodies
    createBoundaries();
    elemBodies = createRectangles();
    elemCircles = createCircles();
    elemPills = createPills();

    // Update the renderer size
    render.options.width = matterBox.clientWidth;
    render.options.height = matterBox.clientHeight;

    // Update mouse constraint
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

    mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
    mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
        if (mouseConstraint.body) {
            mouseConstraint.mouse.mousemove(e);
        }
    });
    mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
        if (mouseConstraint.body) {
            mouseConstraint.mouse.mouseup(e);
        }
    });
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Allow scrolling when mouse is on matter container
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

// Allow swiping on touch-screen when in touch with the matter container
mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
  if (mouseConstraint.body) {
    mouseConstraint.mouse.mousemove(e);
  }
});
mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
  if (mouseConstraint.body) {
    mouseConstraint.mouse.mouseup(e);
  }
});

// Flag to check if the engine has started
var engineStarted = false;

// Intersection Observer to start the engine only once
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !engineStarted) {
            // Element is in viewport and engine has not started yet
            engineStarted = true;
            Runner.run(runner, engine);
            Render.run(render);
        }
    });
}, {
    threshold: 0.1 // Adjust the threshold as needed
});

// Start observing the matterBox
observer.observe(matterBox);
Xóa hết đoạn code này đi để thay bằng đoạn code mới ?











