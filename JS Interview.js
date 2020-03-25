/** 值类型 */
let a = 10  
    b = a
a = 20
console.log(b) // 10
/** 引用类型 */
let a = {age: 20}
let b = a
b.age = 21
console.log(a.age) // 21 浅拷贝

/** 常见值类型 */
let a // undefined
const s = 'abc' // string
const n = 100 // number
const b = true // boolean
const s = Symbol('s') // symbol
/** 常见引用类型 */
const obj = { x: 100 } // object
const arr = ['a', 'b', 'c'] // object
const n = null // 特殊引用类型 指针指向空地址
/** 函数类型 */
function fn() {} // 不用于存储数据 没有拷贝 复制函数

/** 类型判断-typeof */ 
    // 判断所有值类型
    let a;  typeof a // 'undefined'
    // 判断函数
    typeof console.log // 'function'
    typeof function () {} // 'function'
    // 识别引用类型(不能再继续识别) e.g: 无法识别 null array arguments
    typeof null // 'object'
    typeof ['a', 'b'] // 'object
    typeof { x : 100 } // 'object

/** 深拷贝 
 * @param {Object} obj 拷贝对象  
 */
function deepClone(obj = {}) {
    // obj 是 null 或 不是对象和数组 直接返回
    if (typeof obj !== 'object' || obj == null)  return obj
    // 初始化返回结果
    let result
    if (obj instanceof Array) result = []
    else result = {}
    for (let key in obj) {
        // 保证key不是原型的属性
        if (obj.hasOwnProperty(key)) result[key] = deepClone(obj[key]) /** 递归 */
    }
    // 返回结果
    return result
}

const obj1 = {
    age: 20,
    name: 'xxx',
    city: {
        address: 'Beijing'
    },
    arr: ['a', 'b', 'c']
}
const obj2 = deepClone(obj1)
obj2.city.address = 'Shanghai'
obj2.arr[0] = 'd'
console.log(obj1.address.city) // Beijing
console.log(obj1.arr[0]) // a

/** 字符串拼接 */ 
const a = 100 + 10 // 110 
const b = 100 + '10' // '10010'
const c = true + '10' // 'true10'
const d = 100 + parseInt('10')

/** == */
100 == '100' // true
0 == '' // true
0 == false // true
false == '' // true
null == undefined // true
// 除了 == null之外, 其他都用 === e.g:
const obj = { x: 100 }
if (obj.a == null) {} // 相当于: if (obj.a === null || obj.a === undefined) {}

// 以下是fasely变量 除此都是truely变量
!!0 === false
!!NaN === false // Not a Number
!!'' === false
!!null === false
!!undefined === false
!!false === false
const a = true

console.log(10 && 0) // 0
console.log('' || 'abc') // 'abc'
console.log(!window.abc) // true

/** 继承 */
class People { // 父类
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(this.name + 'eat something')
    }
}

class Student extends People { // 子类
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log ('Name: ' + this.name + ', StudentId: ' + this.number)
    }
}

/** 通过类new对象 */
const xiaoluo = new Student ('XiaoLuo', 1001)
console.log(xiaoluo.name)
console.log(xiaoluo.number)
xiaoluo.sayHi()
xiaoluo.eat()

/** 类型判断-instanceof */
xiaoluo instanceof Student // true
xiaoluo instanceof People // true
xiaoluo instanceof Object // true
[] instanceof Array // true
[] instanceof Object // true
{} instanceof Object // true

/** 原型 */
// class实际上是函数 是语法糖
typeof People  // 'function'
typeof Student // 'function'

/** 原型关系
 * 每个class都有显式原型prototype
 * 每个对象都有隐式原型 _proto
 * 实例的_proto_指向对应class的prototype
 */
console.log(xiaoluo._proto_) // 隐式原型
console.log(Student.prototype) // 显式原型
console.log(xiaoluo._proto_ === Student.prototype) // true

/** 基于原型的执行规则
 * 获取属性xiaoluo.name或执行方法xiaoluo.sayhi()时
 * 先在自身属性和方法寻找
 * 如果找不到自动去_proto_中查找
 */

/** 原型链 */
console.log(Student.prototype._proto_)
console.log(People.prototype)
console.log(People.prototype === Student.prototype._proto_) // true

xiaoluo.hasOwnProperty('name') // true
xiaoluo.hasOwnProperty('sayHi') // false
xiaoluo.hasOwnProperty('hasOwnProperty') // false

/** 作用域 */
/** 自由变量
 * 一个变量在当前作用域没定义 但被使用了
 * 向上级作用域 一层一层一次寻找 直到找到为止
 * 如果到全局作用域都没找到 则报错 xx is not defined
 */
let a = 0
function fn1() {
    let a1 = 100
    function fn2() {
        let a2 = 200
        function fn3() {
            let a3 = 300
            return a + a1 + a2 + a3
        }
        fn3()
    }
    fn2()
}
fn1()

if (true) let x = 100
console.log(x) // 会报错: x is not defined

/** 闭包
 * 作用域引用的特殊情况 有两种表现:
 * 函数作为参数被传递
 * 函数作为返回值被返回
*/
/** 所有自由变量的查找 是在函数定义的地方 向上级作用域 不是在执行的地方 */
// 函数作为返回值被返回
function create() {
    const a = 100
    return function() {
        console.log(a)
    }
}
const fn = create()
const a = 200
fn() // 100

// 函数作为参数被传递
function print(fn) {
    const a = 200
    fn()
}
const a = 100
function fn() {
    console.log(a)
}
print(fn) // 100

/** this
 * this的取值 是在函数执行时确定的 不是在函数定义时确定的
 * 当作普通函数被调用: 返回window
 * 使用call apply bind: 绑定传入参数
 * 作为对象方法被调用: 返回对象本身
 * 在class方法中调用: 返回对象本身
 * 箭头函数: 找上级作用域的this确定
 */
function fn1() {
    console.log(this)
}
fn1() // window
fn1.call({ x: 100 }) // { x: 100 } 把{ x: 100 }赋给fn1的this
const fn2 = fn1.bind({ x: 200 }) // bind返回一个新的函数去执行
fn2() // { x: 200 }

const zw = {
    name: 'zw',
    sayHi() {
        console.log(this) // this为当前对象
    },
    wait() {
        setTimeout(function() {
            console.log(this) // this === window
        })
    }
}

const zw = {
    name = 'zw',
    sayHi() {
        console.log(this) // this为当前对象
    },
    waitAgain() {
        setTimeout(() => { // 箭头函数取值取上级作用域的值
            console.log(this) // this为当前对象
        })
    }
}

/** bind用法 */
function fn1(a, b, c) {
    console.log('this', this)
    console.log(a, b, c)
    return 'this is fn1'
}

const fn2 = fn1.bind({x: 100}, 10, 20, 30)
const res = fn2()
console.log(res)
fn1._proto_ === Function.prototype // true
Function.prototype.apply
Function.prototype.call
Function.prototype.bind

/** 手写bind函数 */
Function.prototype.bind1 = function() {
    /** 将参数解析为数组
     * arguments可以获取函数中所有参数 slice是Array原型的API 把arguements赋给Array.prototype.slice的this
     */
    const args = Array.prototype.slice.call(arguments)
    const t = args.shift() // 获取this(取出数组第一项 数组剩余的就是传递的参数) const arr =[1, 2, 3, 4]; arr.shift() = 1; arr = [2, 3, 4]
    const self = this // 当前函数 fn1.bind(...)中的fn1
    return function() { // 返回一个函数
        return self.apply(t, args) // 执行原函数 并返回结果
    }
}

/** 实际开发中闭包的应用
 *  隐藏数据
 * 做一个cache的缓存工具
 */
// 闭包隐藏数据 只提供API
function createCache() {
    const data = {} // 闭包中的数据 被隐藏 不被外界访问
    return {
        set: function(key, val) {
            data[key] = val
        },
        get: function(key) {
            return data[key]
        }
    }
}
const c = createCache()
c.set('a', 100)
console.log(c.get('a'))

/** 创建10个<a>标签 点击时弹出对应的序号 */
let a
for (let i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) { // 函数不会立即执行 只有被点击才会执行
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
