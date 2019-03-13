var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 5

autoGetSize(canvas)

//设置画布背景
ctx.fillStyle = 'white';
ctx.fillRect(0,0, canvas.width, canvas.height)

listenToUser(canvas)

//eraserEnabled
var eraserEnabled = false
// eraser.onclick = function () {
//     eraserEnabled = true
//     actions.className = 'actions x'
// }
// brush.onclick = function () {
//     eraserEnabled = false
//     actions.className = 'actions'
// }
eraser.onclick = function () {
    // console.log('eraser')
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    // console.log('pen')
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

//改变画笔颜色
black.onclick = function () {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}
thin.onclick = function () {
    thin.classList.add('active')
    thick.classList.remove('active')
    lineWidth = 5
}
thick.onclick = function () {
    thin.classList.remove('active')
    thick.classList.add('active')
    lineWidth = 10
}
clean.onclick = function () {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}
save.onclick = function () {
    var url = canvas.toDataURL("image/png")
    // var url = canvas.toDataURL("image/jpeg")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'myPicture'
    a.target = '_blank'
    a.click()
}

//drawLine
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = lineWidth
    // ctx.lineJoin = "round"; //圆角
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
            if (!using) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {"x": x, "y": y}
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function (a) {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (a) {
            // console.log('down')
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
            // console.log('move')
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {"x": x, "y": y}
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function (a) {
            // console.log('up')
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