var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoGetSize(canvas)
listenToUser(canvas)

//eraserEnabled
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

//drawLine
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1, y1)
    ctx.lineWidth = 5
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

//autoGetSize
function autoGetSize(canvas) {
    getSize()

    window.onresize = function () {
        getSize()
    }

    function getSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//listenMouse
function listenToUser(canvas) {
    var using = false
    var lastPoint = {x: undefined, y: undefined}

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {"x": x, "y": y}
                // drawCircle(x, y, 1)
            }
        }

        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {"x": x, "y": y}
                    // drawCircle(x, y, 1)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }

        canvas.ontouchend = function (a) {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {"x": x, "y": y}
                // drawCircle(x, y, 1)
            }
        }

        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {"x": x, "y": y}
                    // drawCircle(x, y, 1)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }

        canvas.onmouseup = function (a) {
            using = false
        }
    }
}

// test
// ctx.fillStyle = 'red';
// ctx.fillRect(10,10,100,100); //rectangle

// ctx.strokeStyle = 'red';
// ctx.strokeRect(10,10,100,100);

// ctx.clearRect(50,50,10,10);

// 三角形
// ctx.beginPath();
// ctx.moveTo(240,240);
// ctx.lineTo(300,240);
// ctx.lineTo(300,300);
// ctx.fill();

// 圆形
// function drawCircle(x, y, radius) {
//     ctx.beginPath();
//     ctx.fillStyle = 'black'
//     ctx.arc(x, y, radius, 0, 2 * Math.PI);
//     ctx.fill();
// }