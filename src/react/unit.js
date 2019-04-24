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
function createReactUnit(element){
    // 不同的
    if(typeof element == 'string' || typeof element === 'number'){
        return new ReactTextUnit(element);
    }
}
export default createReactUnit