window.onload = function() {
	function $(id){
		return document.getElementById(id);
	}

	var imgWidth = $("container").offsetWidth;
	var pic = 0;
	var square = 0;
	var timer = null;
	// 1.0 动态添加最后一张图片
	var ul = $("container").children[0]
	var firstImg = ul.children[0].cloneNode(true);
	ul.appendChild(firstImg)

	var olLis = $("noselect").children;
	// 1.2 批量注册事件 按钮排他 实现轮播
	for (var i = 0; i < olLis.length; i++) {
		olLis[i].index = i;
		olLis[i].onmouseover = function() {
			for (var i = 0; i < olLis.length; i++) {
				olLis[i].className = ""
			}
			this.className = "current";
			var target = -this.index * imgWidth;
			animate(ul, target)

			// 在按钮排他结束轮播之后 进行统一索引
			pic = this.index;
			square = this.index;
		}
	}

	$("container").onmouseover = function() {
		clearInterval(timer)
	}	
	$("container").onmouseout = function() {
		timer = setInterval($("forRight").onclick, 2000)
	}

	// 2.0 添加左右箭头的功能
	$("forRight").onclick = function() {
		// 2.2 判断
		if(pic === ul.children.length - 1) {
			ul.style.left = 0;
			pic = 0;
		}
		// 2.1 加加
		pic++;
		// 2.3 执行
		var target = -pic * imgWidth;
		animate(ul, target)

		square++;

		if(square === olLis.length) {
			square = 0;
		}

		for (var i = 0; i < olLis.length; i++) {
			olLis[i].className = ""
		}
		olLis[square].className = "current"

	}
	$("forLeft").onclick = function() {
		// 2.2 判断
		if(pic === 0) {
			ul.style.left = -(ul.children.length - 1) * imgWidth + "px";
			pic = ul.children.length - 1;
		}
		// 2.1 减减
		pic--;
		// 2.3 执行
		var target = -pic * imgWidth;
		animate(ul, target)


		if(square === 0) {
			square = olLis.length;
		}

		square--;

		for (var i = 0; i < olLis.length; i++) {
			olLis[i].className = ""
		}
		olLis[square].className = "current"
	}


	// 3.0 添加定时器
	timer = setInterval($("forRight").onclick, 2000)
}


function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;//step有了正负
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";//手动放到终点
            clearInterval(obj.timer);
        }
    }, 15);
}