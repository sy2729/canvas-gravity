// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var gravity = 1;
var fraction = 0.8;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Ball(x, y, radius, dy, dx, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.update = function () {
    if(this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * fraction;
    } else {
        this.dy += gravity;
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx;

    }

    this.y += this.dy;
    this.x += this.dx;
    this.draw();
};

Ball.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

// Implementation
// var ball = new Ball(canvas.width/2, canvas.height/2, 30, 2, 'red');
var ballArray = [];


function init() {

    for(var i = 0; i < 100; i++) {
        var radius = randomIntFromRange(5, 30);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dy = randomIntFromRange(1,2);
        var dx = randomIntFromRange(-2, 2);
        var color = randomColor(colors);
        var ball = new Ball(x, y, radius, dy, dx, color)
        ballArray.push(ball)
    }

    console.log(ballArray)

    ball = new Ball(canvas.width/2, canvas.height/2, 30, 2, 'red');
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // ball.update();
    ballArray.forEach(function(e) {
        e.update();
    })

    c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
    // objects.forEach(object => {
    //  object.update();
    // });
}

init();
animate();