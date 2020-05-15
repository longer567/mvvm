/**
 * 
 * @param {String} el hook el
 * @param {Object} vm vue instance
 */
class Compiler {
    constructor(el, vm) {
        // sure el is DOM object
        this.el = this.isDOM(el) ? el : document.querySelector(el)
        this.vm = vm
        this.compile()
    }
    compile() {
        this.$frag = this.elFrag(this.el)
        // scan resolution node to frag
        this.el.appendChild(this.scanNode(this.$frag))
    }
    isDOM(item) {
        return (typeof HTMLElement === 'function') ?
            (item instanceof HTMLElement) :
            (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'))
    }
    elFrag(el) {
        var elFrag = new DocumentFragment(), child
        while (child = el.firstChild)
            elFrag.appendChild(child)
        return elFrag
    }
    scanNode(node) {
        var nodeList = node.children, comp = this;
        [...nodeList].forEach(nodeItem => {
            // element node
            if (nodeItem.nodeType === 1) {
                comp.elemNodeHandle(nodeItem)
            }
            // text node
            else if (nodeItem.nodeType === 2) {
                
            }

            if (nodeItem.children && nodeItem.children.length) {
                comp.scanNode(nodeItem)
            }
        })
        
        return node
    }
    // element node 
    elemNodeHandle(node) {
        var attrs = node.attributes, comp = this;
        [...attrs].forEach(attr => {
            var attrName = attr.name, 
                attrVal = attr.value, 
                vpreFix = attrName.slice(0, 2),
                vCommand = attrName.slice(2)
            if (vpreFix === 'v-'){
                if (vAttrs[vCommand]) {
                    // init v-val
                    vAttrs[vCommand](comp.vm, node, attrVal)
                }
            }
        })
    }
}

// v-command-attrs
var vAttrs = {
    text(vm, node, attrVal) {
        upDate.textUpdate(node, vm[attrVal])
        new Watcher(vm, attrVal, function(value, oldValue) {
            upDate.textUpdate(node, value, oldValue)
        })
    },
    model(vm, node, attrVal) {
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (vm[attrVal] === newValue) {
                return;
            }

            vm[attrVal] = newValue
        });
        upDate.modelUpdata(node, vm[attrVal])
        new Watcher(vm, attrVal, function(value, oldValue) {
            upDate.modelUpdata(node, value, oldValue)
        })
    }
}

var upDate = {
    textUpdate(node, value) {
        node.textContent = value ? value : ''
    },
    modelUpdata(node, value, oldValue) {
        node.value = value ? value : ''
        
    }
}