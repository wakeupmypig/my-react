import $ from 'jquery';
import createReactUnit from './unit'
import createElement from './element'
import Component from './component'
let React = {
    render,
    nextRootIndex:0,
    createElement,
    Component
}
// 我们希望可以根据传入的内容 渲染出不同的结果
function render(element,container){
    // 工厂模式 通过createReactUnit这个方法 可以产生一个当前元素类型的实例
    let ReactUnitInstance = createReactUnit(element);
    // 只要调用getMarkUp 方法 就会返回一个html字符串
    let markUp = ReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
    $(document).trigger('mounted'); //发布订阅  触发函数 
}

export default React;