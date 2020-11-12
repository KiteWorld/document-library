这几天看了 jsliang 大佬的面试的复习指南。觉得自己掌握的知识非常有限，让我危机感十足，怕自己离开现在的公司就失去竞争力。入职半年的小前端切图仔，写得不好得地方大家多多包涵指教。

食用前，请对照「github」上的例子，食用更佳。 [「学习例子」](https://github.com/KiteWorld/document-library/tree/master/JavaScript/%E4%BA%8B%E4%BB%B6%E6%B5%81)

事件委托，也叫事件代理。顾名思义就是拜托别人就办事。反映在 JS 上就是，原本某个 DOM 绑定的事件委托给别的 DOM 来执行。在学习「事件委托」之前，我们先说一下「事件流」和「事件模型」
## 事件流
事件流，按我的理解就是，事件的传递。根据传递的方向不同一般分成捕获型和冒泡型
### 捕获型事件流
由子元素向父元素传递
![捕获型.png][2]

### 冒泡型事件流
由父元素到子元素传递
![冒泡型.png][1]

具体什么时候执行函数是通过addEventListener()第三个参数决定的，不填默认为false，也就是冒泡时执行，为true，捕获时执行。

## 事件模型
事件模型和事件流的关系，说一下自己的理解。事件模型其实是不同浏览器之间制定的处理标准，不同事件模型对应的事件流也存在差异。

事件模型主要有三种模型：
 - 原始事件模型 （没有事件流）
 - DOM2事件模型 （W3C规范的标准事件模型）
 - IE事件模型 （IE浏览器独有）

这里主要说一下「DOM2 事件模型」，也是现代浏览器的标准。其他两种事件模型，可以参考文章下方第二个链接。

「DOM2事件模型」事件流分为三个阶段：
 - 捕获事件阶段
 - 处于目标阶段
 - 冒泡事件阶段

 还是以前面的 demo 为例，点击 li 时，事件就开始传递。首先是捕获阶段（document-->html-->body-->div-->ul-->li），然后是处于目标阶段，也就是到达你点击的 li ，处于捕获和冒泡的中间，最后是冒泡阶段（li-->ul-->div-->--body-->html-->document）
 ![DOM2事件模型.png][3]

看到这里大概就清楚捕获和冒泡是怎么一回事了。我们来看看他们的使用场景

## 冒泡

我们在开发的过程中一定开发过「下拉加载列表」的功能，一般情况下，我们的做法都是循环遍历出列表的数据，并逐条添加点击事件。

例如：

```
	<div class="list-container">
		<ul class="list">
		</ul>
	</div>
	<button class="btn">添加列表项</button>
	<script>
		let listContainer = document.getElementsByClassName("list-container")[0] //div
		let list = document.getElementsByClassName("list")[0] //ul
		let listItem = document.querySelector(".list-item")
		let btn = document.querySelector(".btn") //button
		let doSome = (text) => {
			console.log(text)
		}
		let dataList = ["1", "2", "3", "4", "5"]

		let addDOM = (text) => {
			let newDOM = document.createElement("li")
			newDOM.classList.add("list-item")
			newDOM.addEventListener("click", () => {
				doSome(text)
			})
			newDOM.innerHTML = text
			list.appendChild(newDOM)
		}

		dataList.forEach((x, i) => {
			addDOM(x)
		})

		btn.addEventListener("click", () => {
			dataList.push(dataList.length + 1)
			addDOM(dataList[dataList.length - 1])
		})
```

这样会带来一个问题，就是会占用大量的内存，从而影响网页的性能。数据比较少的时候还好说，但一般情况下，「下拉加载列表」的数据量都不会太小我们可以利用「冒泡事件流」的特性来，解决这个问题。我们只要在「ul」或者「div」中添加点击事件，就可以实现上一个例子的功能。我们参考下面的例子:

```
    <div class="list-container">
		<ul class="list">
		</ul>
	</div>
	<button class="btn">添加列表项</button>
	
	<script>
		let list = document.getElementsByClassName("list")[0] //ul
		let listItem = document.querySelector(".list-item")
		let btn = document.querySelector(".btn") //button
		let dataList = ["1", "2", "3", "4", "5"]

		let addDOM = (text) => {
			let newDOM = document.createElement("li")
			newDOM.classList.add("list-item")
			//添加自定义属性，可以存接口的需要的属性值，例如:查看该项数据详细的ID
			newDOM.setAttribute("data-text", text) 
			newDOM.innerHTML = text
			list.appendChild(newDOM)
		}

		dataList.forEach((x, i) => {
			addDOM(x)
		})

		list.addEventListener("click", (e) => {
			console.log(e.target.dataset.text) //获取自定义属性 data-text 的值
		})

		btn.addEventListener("click", () => {
			dataList.push(dataList.length + 1)
			addDOM(dataList[dataList.length - 1])
		})
	</script>
```

这就是事件委托。这里值得注意的是，当你需要确定判断，自己点击的是哪个元素或者修改目标元素的样式的时候，可以使用「event.target」里面的属性来实现。上面的例子就演示了通过「e.target.dataset」来获取自定义属性 data-text 的值。

## 阻止冒泡

冒泡虽然在上述问题中表现很优异，但不要被骗了，他可能是个「朱朝阳」。是个坏孩纸。

假设现在父元素和子元素中都绑定了点击事件，这时候我们点击子元素的时候，父元素的点击事件也跟着触发了。一般情况下我们都只是希望目标元素的事件触发而已。这时候就轮到「阻止冒泡」出场了。我们可以使用「event.stopPropagation()」来阻止事件冒泡。

```
<div class="list-container">
		<ul class="list">
			<li class="list-item">1</li>
		</ul>
	</div>
	<script>
		let listContainer = document.getElementsByClassName("list-container")[0] //div
		let list = document.getElementsByClassName("list")[0] //ul
		let listItem = document.querySelector(".list-item") //l

		let doSome = (text) => {
			console.log(text)
		}
		listItem.addEventListener("click", (e) => {
			console.log("这个打印信息只是说明使用「e」和「event」是等价的，可以相互使用", e === event) //true 自定义的参数「e」和「event」对象引用是相同的。
			e.stopPropagation() //阻止事件传递
			doSome('li————最先执行')
		})
		list.addEventListener("click", (e) => {
			console.log("——————ul没有阻止冒泡——————")
			doSome('ul————接着执行')
		})
		listContainer.addEventListener("click", () => {
			doSome('div————最后执行')
		})
	</script>
```


## 捕获

非常惭愧，自己在开发的过程中没有利用过「捕获」来实现功能。在网上搜了一下，也没有找到能说出个所以然的文章。如果你知道有哪些经典的例子，请在评论区里留言，供大家学习学习，先说声谢谢。

来自阿怪的个人博客：[https://kite1874.com/19/](https://kite1874.com/19/)

参考文章：

 - [JS中的事件、事件冒泡和事件捕获、事件委托](https://www.cnblogs.com/leftJS/p/10948138.html)<br>
 - [javaScript事件（一）事件流](https://www.cnblogs.com/starof/p/4066381.html)<br>
 - [事件流](https://github.com/LiangJunrong/document-library/blob/master/%E7%B3%BB%E5%88%97-%E9%9D%A2%E8%AF%95%E8%B5%84%E6%96%99/JavaScript/%E5%9F%BA%E7%A1%80.md#%E4%BA%94-%E4%BA%8B%E4%BB%B6%E6%B5%81)


[1]: https://github.com/KiteWorld/document-library/blob/master/JavaScript/%E4%BA%8B%E4%BB%B6%E6%B5%81/images/%E5%86%92%E6%B3%A1%E5%9E%8B.png
[2]: https://github.com/KiteWorld/document-library/blob/master/JavaScript/%E4%BA%8B%E4%BB%B6%E6%B5%81/images/%E6%8D%95%E8%8E%B7%E5%9E%8B.png
[3]: https://github.com/KiteWorld/document-library/blob/master/JavaScript/%E4%BA%8B%E4%BB%B6%E6%B5%81/images/DOM2%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B.png
