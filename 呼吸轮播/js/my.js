

window.onload = function() {
	var num = 0;
	var timer = null;
	// 找人，通过图片的length 对应的生成ol的li的个数，并且给第一个li一个类名
	var ul = $("container").children[0];
	var imgs = ul.children;
	var ol = $("container").getElementsByTagName('ol')[0];
	for (var i = 0; i < imgs.length; i++) {
		var olLi = document.createElement("li");
		olLi.innerText = i + 1;
		ol.appendChild(olLi);
	}
	ol.children[0].className = "current";

	// 1.0 批量注册按钮事件 进行排他 其他的全部消失 自己显示
	for (var i = 0; i < ol.children.length; i++) {
		ol.children[i].index = i;
		ol.children[i].onmouseover = function() {
			paita(this, this.index)
			num = this.index;
		}
	}

	// 2.0 鼠标经过盒子 显示箭头, 鼠标离开  隐藏箭头
	$("container").onmouseenter = function() {
		// animate($("arr"), {"opacity" : "1"})
		clearInterval(timer)
		$("arr").style.opacity = "1";
	}
	$("container").onmouseleave = function() {
		timer = setInterval($("arrRight").onclick, 2000)
		$("arr").style.opacity = "0";
	}

	// 2.1 右箭头点击事件
	$("arrRight").onclick = function() {
		// 2.1.1加加
		num++;
		// 2.1.2判断
		if (num > imgs.length - 1) {
			num = 0;
		}
		// 2.1.3执行
		paita(ol.children[num], num)
	}
	// 2.2 左箭头点击事件
	$("arrLeft").onclick = function() {
		// 2.2.1减减
		num--;
		// 2.2.2判断
		if (num < 0) {
			num = imgs.length - 1;
		}
		// 2.2.3执行
		paita(ol.children[num], num)
	}

	// 3.0 设置定时器
	timer = setInterval($("arrRight").onclick, 5000)


	function paita(obj, arg) {
		for (var i = 0; i < imgs.length; i++) {
			animate(imgs[i], {"opacity" : "0"})
			ol.children[i].removeAttribute("class");
		}
		animate(imgs[num], {"opacity" : "1"})
		obj.className = "current"
	}
}	



function $(id) {
	return document.getElementById(id);
}