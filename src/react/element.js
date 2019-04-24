class Element{ // 是react的元素的类
    constructor(type,props){
        this.type = type;
        this.props = props;
    }
}
// 通过这个类 创建虚拟dom元素 分别有type属性和props属性
function createElement(type,props={},...children){
    props = props || {}
    props.children = children;
    return new Element(type,props)
}

export default createElement