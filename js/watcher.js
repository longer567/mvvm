class Watcher{
    constructor(vm, attrVal, callback){
        this.vm = vm
        this.attrVal = attrVal
        this.callback = callback
        this.value = this.get()
    }
    get(){
        Dep.target = this
        var value = this.vm[this.attrVal]
        Dep.target = null
        return value
    }
    notice(newValue) {
        if (this.value !== newValue)
        {
            this.callback(newValue, this.value)
        }
    }
}