import $ from 'jquery';
import createReactUnit from './unit'
let React = {
    render,
    nextRootIndex:0
}
// 我们希望可以根据传入的内容 渲染出不同的结果
function render(element,container){
    // 工厂模式
    let ReactUnitInstance = createReactUnit(element);
    // 只要调用getMarkUp 方法 就会返回一个html字符串
    let markUp = ReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
}

export default React;