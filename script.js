var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var score = document.querySelector('#score');
var timer = document.querySelector('#timer')
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var count = 0;
var seconds = 0;
var h = 0;
var controlsA;
var controlsS;
var controlsW
var controlsD;

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return (num === 0) ? random(min, max) : num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

Ball.prototype = Shape.prototype;

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}


Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
}
var balls = [];

function EvilCircle(x, y, exists, color, size, velX, velY) {
    Shape.call(this, x, y, exists);
    this.color = color;
    this.size = size;
    this.velX = velX;
    this.velY = velY;
}

EvilCircle.prototype.drawCircle = function () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    lineWidth = 5;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
};

EvilCircle.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                if (balls[j].exists === true) {
                    count = count - 1;
                    balls[j].exists = false;
                }
            }
        }
    }
}

var circle = new EvilCircle(
    random(60, width),
    random(60, height),
    true,
    "white",
    15,
    15,
    15
);

function setControlsD() {
    window.onkeydown = function (e) {
        if (e.keyCode === 65) { // a
            controlsA = "a";
            console.log("A");
        }
        if (e.keyCode === 68) { // d
            controlsD = "d";
        }
        if (e.keyCode === 87) { // w
            controlsW = "w";
        }
        if (e.keyCode === 83) { // s
            controlsS = "s";
        }
    };
};

function setControlsU() {
    window.onkeyup = function (e) {
        if (e.keyCode === 65) { // a
            controlsA = "f";
        }
        if (e.keyCode === 68) { // d
            controlsD = "f";
        }
        if (e.keyCode === 87) { // w
            controlsW = "f";
        }
        if (e.keyCode === 83) { // s
            controlsS = "f";
        }
    };
};

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    score.textContent = 'Ball count: ' + count;
    while (balls.length < 20) {
        var ball = new Ball(
            random(21, width - 60),
            random(21, height - 60),
            random(-10, 10),
            random(-9, 10),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 20),
            true
        );

        Ball.prototype.collisionDetect = function () {
            for (var j = 0; j < balls.length; j++) {
                if (!(this === balls[j])) {
                    var dx = this.x - balls[j].x;
                    var dy = this.y - balls[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.size + balls[j].size) {
                        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                    }
                }
            }
        }
        balls.push(ball);
        count++;
    }
    if (count != 0) {
        h++;
        if (h % 60 == 0) {
            seconds++;
        }
    }
    timer.textContent = "Timer:" + seconds;
    EvilCircle.prototype.move = function () {
        var _this = this;
        if (controlsA === "a") { // a
            _this.x -= _this.velX;
        }
        if (controlsD === "d") { // d
            _this.x += _this.velX;
        }
        if (controlsW === "w") { // w
            _this.y -= _this.velY;
        }
        if (controlsS === "s") { // s
            _this.y += _this.velY;
        }
    };

    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists == true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }
    circle.drawCircle();
    circle.checkBounds();
    circle.collisionDetect();
    setControlsD();
    setControlsU();
    circle.move();
    requestAnimationFrame(loop);
}
loop();
