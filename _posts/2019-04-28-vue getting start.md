---
layout: vue getting start
title: vue
categories: vue
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Vue入门</title>
	<script src="./vue.js"></script>
</head>
<body>
	<div id="root">
		<input v-model="content"/>
		<div @click="handleClick">{{content}}</div>
		<input v-model="firstName">
		<input v-model="lastName">
		<div>{{fullName}}</div>
		<div>{{count}}</div>
		<div v-if="show">show if</div>
		<div v-show="show">show show</div>
		<button @click="toggleClick">toggle</button>
		<ul>
			<li v-for="(item,index) of list" :key="index">{{item}}</li>
		</ul>
	</div>

	<script>
	var v = new Vue({
		 el: "#root",
		 data: {
			content: "this is content",
			firstName: "fn",
			lastName: "ln",
			count: 0,
			show: true,
			list: [1,2,3,4,5]
		 },
         // beforeCreate,created,beforeMount,mounted,beforeUpdate,updated,beforeDestroy,destroyed
		 created: function () {
			// `this` points to the v instance
			console.log('created: count is: ' + this.count)
		 },
		 computed: {
			fullName: function() {
				return this.firstName + "--" + this.lastName;
			}
		 },
		 watch: {
			fullName: function() {
				return this.count++;
			}
		 },
		 methods: {
			handleClick: function() {
				this.content = "nin hao , shi jie";
			},
			toggleClick: function() {
				this.show = !this.show;
			}
		 }
	});

	Vue.component("todo-item",{
		template: "<li>abcd</li>"
	});
	</script>

	<!-- 
	1.以下代码没有效果
	<div id="root" @click="handleClick">{{content}}</div>
	<input v-model="content" />
	
	<script>
		var my_vue = new Vue({
			el: "#root",
			data: {
				content: "this is a content"
			},
			methods: {
				handleClick: function(){
					this.content = "您好，世界！";
				}
			}
		});
	</script>

	2.methods,不是method

	3.v-if会删除和新建元素，v-show会设置元素的display属性

	4.组件其实就是指页面上的某一部分

	5.在Vue中，组件就是实例，实例就是组件,组件之间是可以互相通信的
	-->
</body>
</html>
```

2.TodoList.html

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>VUE入门-TotoList的增删功能</title>
	<script src="./vue.js"></script>
</head>
<body>
	<div id="root">
		<div>
			<input v-model="inputValue">
			<button @click="handleSubmit">提交</button>
		</div>
		<ul>
			<todo-item v-for="(item,index) of list"
				:key="index"
				:content="item"
				:index="index"
				@delete="handleDelete"
			>				
			</todo-item>
		</ul>
	</div>
	<script>
		Vue.component("todo-item", {
			props: ["content", "index"],
			template: "<li @click='handleClick'>{{content}}</li>",
			methods: {
				handleClick: function() {
					this.$emit('delete', this.index);
				}
			}
		});

		var v = new Vue({
			el: "#root",
			data: {
				inputValue: "",
				list: []
			},
			methods: {
				handleSubmit: function() {
					if (this.inputValue.trim() == "") {
						alert("请输入内容");
						return;
					}
					this.list.push(this.inputValue);
					this.inputValue = "";
				},
				handleDelete: function(index) {
					this.list.splice(index,1);
				}
			}
		});
	</script>
</body>
</html>
```

**更新列表：**



**参考文章：**

* [一个Java后端的Vue自学笔记][1]
* [Vue.js 教程 (9) : 过渡动画][2]


[1]: https://blog.csdn.net/hz_940611/article/details/80544670
[2]: http://www.cnblogs.com/avon/p/6030875.html