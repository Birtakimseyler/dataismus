//Magnific-popup

$('.without-caption').magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	closeBtnInside: false,
	mainClass: 'mfp-no-margins mfp-with-zoom',
	image: {
		verticalFit: true
	},
	zoom: {
		enabled: true,
		duration: 300
	}
});

//Draggable

$(function () {
	$(".contentarea").draggable();
	$(".image").draggable();
});

//Heatmap

window.onload = function () {
	var canvas = document.getElementsByTagName('canvas')[0];
	var heatmap = createWebGLHeatmap({
		canvas: canvas,
		intensityToAlpha: true
	});
	var heatmap = createWebGLHeatmap({
		canvas: canvas,
		intensityToAlpha: true,
		alphaRange: [0, 0.08]
	});
	document.body.appendChild(heatmap.canvas);
	var paintAtCoord = function (x, y) {
		var count = 0;
		while (count < 200) {
			var xoff = Math.random() * 2 - 1;
			var yoff = Math.random() * 2 - 1;
			var l = xoff * xoff + yoff * yoff;
			if (l > 1) {
				continue;
			}
			var ls = Math.sqrt(l);
			xoff /= ls;
			yoff /= ls;
			xoff *= 1 - l;
			yoff *= 1 - l;
			count += 1;
			heatmap.addPoint(x + xoff * 80, y + yoff * 80, 30, 2 / 600);
		}
	}
	var onTouchMove = function (evt) {
		evt.preventDefault();
		var touches = evt.changedTouches;
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			paintAtCoord(touch.pageX, touch.pageY);
		}
	};
	canvas.addEventListener("touchmove", onTouchMove, false);
	canvas.onmousemove = function (event) {
		var x = event.offsetX || event.clientX;
		var y = event.offsetY || event.clientY;
		paintAtCoord(x, y);
	}
	canvas.onclick = function () {
		heatmap.clear();
	}
	var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	var update = function () {
		heatmap.adjustSize();
		heatmap.update();
		heatmap.display();
		heatmap.blur();
		raf(update);
	}
	raf(update);
}
  