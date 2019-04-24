import React from './react';
// 最早 react 和 react-dom 是同一个包

// react.render 方法可以渲染什么东西
// 字符串 数字
// jsx元素 react元素
// 自定义组件
let say = function(){
    alert(1)
}
// let element = <h1>你好,<button onClick={say}>say</button></h1>
let obj = React.createElement('h1',{name:'zfpx',age:10},'你好',React.createElement('button',{onClick:say},'say'));

React.render(obj,document.getElementById('root'));
// dom解构 -> 树结构