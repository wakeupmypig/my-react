class Component {
    constructor(props){
        this.props = props;
    }
    setState(partailState){ // 当前设置的部分状态
        // this.unit 相当于当前的子组件
        this.unit.update(partailState);// 为了能在父类中调用子类的方法
        // 所以子类定义一个属性指向自己
    }
}
export default Component