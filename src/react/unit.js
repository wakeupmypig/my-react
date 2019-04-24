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
class ReactCompisteUnit extends Unit{
    getMarkUp(rootId){
        this._rootId = rootId; 
        // 1) 先获取到当前要渲染的组件
        let {type:Component,props} = this._currentElement;
        // 创建当前组件的实例
        let reactComponentInstance = this._reactComponentInstance =  new Component(props);
        // 让父类 可以拿到子类的方法
        reactComponentInstance.unit = this;
        reactComponentInstance.componentWillMount&& reactComponentInstance.componentWillMount();
        // 字符串 {type:'h1'} {type:SubCounter}
        // 先拿到render方法的结果 
        let reactComponentRenderer = reactComponentInstance.render()
        // 拿到渲染后的结果
        let reactInstance = createReactUnit(reactComponentRenderer);
        let markup = reactInstance.getMarkUp(rootId);
        // 等待儿子 全部挂载后 在触发父组件的mounted
        $(document).on('mounted',()=>{
            reactComponentInstance.componentDidMount&& reactComponentInstance.componentDidMount();
        });
        return markup;
    }
    update(partialState){ // 当前组件拿到了最新的状态 开始更新视图
        console.log(partialState);
        let reactComponentInstance = this._reactComponentInstance;
        let nextProps = this._currentElement.props; // 组件最新的属性
        // 设置最新的状态 用新的状态和老的状态合并
        let nextState = reactComponentInstance.state = {...reactComponentInstance.state,...partialState}
        console.log(nextProps,nextState);
        // 把最新的状态传递给shouldComponentUpdate 看他是否要继续更新
        if(reactComponentInstance.shouldComponentUpdate &&!reactComponentInstance.shouldComponentUpdate(nextState,nextProps)){
            return
        }
        // 开始更新
        reactComponentInstance.componentWillUpdate && reactComponentInstance.componentWillUpdate();
        // dom diff
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
    if(typeof element === 'object' && typeof element.type === 'function'){
        return new ReactCompisteUnit(element);
    }
}
export default createReactUnit


// 1) 如果元素类型发生变化 直接替换
// 2) 如果类型相同 需要深度比较 如果是文本 比较文本是否有差异 ,如果是元素就需要比对当前的属性是否相等
// 3) 会先比较key 在比较类型  为什么 react中循环 建议不要使用索引 ,如果纯为了展示 那可以使用索引
<li 香蕉>🍌</li>
<li 苹果>🍎</li>
<li 橘子>🍊</li>

<li 橘子>🍊</li>
<li 苹果>🍎</li>
<li 香蕉>🍌</li> 

// js css 原型(继承 __proto__ Object.create()) 闭包 作用域 （执行上下文） this指向
// http ajax axios（拦截器 权限校验） promise （async+await）状态码 
// 200 202 204 206 301 302 *304* 401 404 403 500 502
// http头

// vue + react
// 生命周期 () 组建通信 (7种) vuex 如何使用？ 双向绑定 
// vue扩展 vue-ssr nuxtjs  ui常见的组件 iview element-ui mint-ui 表格组件 表格怎么扩展？
// vue的优化 预渲染 骨架屏 app-shell serviceWorker 离线缓存
// vue-cli3.0的配置
// react 相关 react全家桶 (dva) 基于redux封装的 (mobx) antd
// node (express koa)
// redis mongo mysql 

// 优化 减少代码冗余  组件化 模块化...

// 项目中遇到过哪些问题？