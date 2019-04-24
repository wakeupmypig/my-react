import React from './react';
// 最早 react 和 react-dom 是同一个包

// react.render 方法可以渲染什么东西
// 字符串 数字
// jsx元素 react元素
// 自定义组件
// let say = function(){
//     alert(1)
// }
// let element = <h1>你好,<button onClick={say}>say</button></h1>
// let obj = React.createElement('h1',{name:'zfpx',age:10},'你好',React.createElement('button',{onClick:say},'say'));
class SubCounter extends React.Component{
    componentWillMount(){
        console.log('将要挂载')
    }
    componentDidMount(){
        console.log('挂载完成')
    }
    render(){
        return 
    }
}
class Counter extends React.Component{// setState
    constructor(props){
        super(props);
        this.state = {number:0}// 默认给当前组件添加一个状态
    }
    componentWillMount(){
        console.log('willmount')
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    componentDidMount(){
        console.log('didMount');
        setInterval(()=>{
            this.setState({number:this.state.number+1});
        },1000)
    }
    // shouldComponentUpdate(nextState,nextProps){
    //     return false; // 返回false表示不更新 返回true 更新 
    // }
    render(){
        return this.state.number
    }
}

React.render(React.createElement(Counter,{name:'zf'}),document.getElementById('root'));
// dom解构 -> 树结构

// 1) 实现了 渲染字符串 数字等
// 2) 实现了 渲染jsx语法
// 3) 实现了 渲染类