/**
 * 
 * @param {obj} Object vue data 
 */
function observer(obj) {
    if (obj.constructor === Object) {
        Object.keys(obj).forEach(key => {
            let o = obj[key]
            var dep = new Dep()

            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: false,
                get: function () {
                    // watcher subscription
                    Dep.target && dep.depsPush(Dep.target)
                    return o
                },
                set: function (val) {
                    o = val
                    dep.depsBroad(val)
                }
            })

            observer(obj[key])
        })
    }
}

// Dep msg subscription center
class Dep {
    constructor() {
        this.deps = []
    }
    // subscription
    depsPush(sub) {
        this.deps.push(sub)
    }
    // broadcast
    depsBroad(val) {
        this.deps.forEach(function(sub){sub.notice(val)})
    }
}