// 值类型
let a = 10  
    b = a
a = 20
console.log(b) // 10
// 引用类型
let a = {age: 20}
let b = a
b.age = 21
console.log(a.age) // 21 浅拷贝

// 常见值类型
let a // undefined
const s = 'abc' // string
const n = 100 // number
const b = true // boolean
const s = Symbol('s') // symbol
// 常见引用类型
const obj = { x: 100 } // object
const arr = ['a', 'b', 'c'] // object
const n = null // 特殊引用类型 指针指向空地址
// 函数类型
function fn() {} // 不用于存储数据 没有拷贝 复制函数

// typeof: 
    // 判断所有值类型
    let a;  typeof a // 'undefined'
    // 判断函数
    typeof console.log // 'function'
    typeof function () {} // 'function'
    // 识别引用类型(不能再继续识别) e.g: 无法识别 null array arguments
    typeof null // 'object'
    typeof ['a', 'b'] // 'object
    typeof { x : 100 } // 'object

/**
 * 深拷贝 
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

// 字符串拼接
const a = 100 + 10 // 110 
const b = 100 + '10' // '10010'
const c = true + '10' // 'true10'
const d = 100 + parseInt('10')

// ==
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