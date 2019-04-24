import $ from 'jquery'
class Unit{
    constructor(element){
        // 通过父类来存储element元素
        this._currentElement = element;
    }
}
class ReactTextUnit extends Unit{ // 默认不调用super  也是调用了super
    // 子类重写父类的getMarkUp方法
    getMarkUp(rootId){ // 保存当前的id值
        this._rootId = rootId;
        return `<span data-reactid="${rootId}">${this._currentElement}</span>`;
    }
}
class ReactNativeUnit extends Unit{
    getMarkUp(rootId){
        this.rootId = rootId;
        // react源码 用的是字符串拼接
        let {props,type} = this._currentElement;
        // 将jsx元素 转化成html字符串 domdiff
        let tagStart = `<${type} data-reactid="${rootId}"`;
        let contentString = '';
        let tagEnd = `</${type}>`;
        for(let keyProp in props){
            if(/on[A-Z]/.test(keyProp)){ // 说明现在绑定的是事件
                // 事件委托 ele.srcElement
                let eventType = keyProp.slice(2).toLowerCase();
                $(document).on(eventType,`[data-reactid="${rootId}"]`,props[keyProp]);
            }else if(keyProp === 'children'){
                // child 可能是 字符串  可能是一个对象
                contentString = props[keyProp].map((child,idx)=>{
                    // 递归的获取 儿子对应的字符串结果
                    let childInstance = createReactUnit(child);
                    return childInstance.getMarkUp(`${rootId}.${idx}`);
                }).join('');
            }else{
                tagStart += (` ${keyProp}=${props[keyProp]}`);
            }
        }
        return tagStart + '>' + contentString + tagEnd;
    }
}
function createReactUnit(element){
    // 识别字符串或者数字
    if(typeof element == 'string' || typeof element === 'number'){
        return new ReactTextUnit(element);
    }
    // 判断当前元素 是一个普通的jsx元素
    if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element);
    }
}
export default createReactUnit