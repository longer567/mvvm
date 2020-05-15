class Vue{
    /**
     * 
     * @param {*} obj 
     * {
     *    a: 1
     *    b: 2 
     * }
     */
    constructor(obj){
        this.vm = obj
        observer(this.vm.data)
        new Compiler(this.vm.el, this.vm.data, this)
        setTimeout((params) =>
            this.vm.data.a = '222'
        , 1000)
        
    }
}