/**
 * @author Zhaoyu Wang
 * @desc Basic JavaScript Interview questions
 */

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
const obj = { x: 100 } // Object
const arr = ['a', 'b', 'c'] // Array
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
        console.log(this.name, 'eat something')
    }
}

class Student extends People { // 子类
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log ('Name: ', this.name, ', StudentId: ', this.number)
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
 * 每个对象都有隐式原型 _proto_
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
 * 函数作为返回值被返回
 * 函数作为参数被传递
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

/** 单线程
 * 浏览器和node.js已支持JS启动进程 e.g: Web Worker
 * JS和DOM渲染共用同一个线程 因为JS可修改DOM结构
 */

/** 异步
 * 通过callback回调函数
 */
console.log(100)
setTimeout(() => {
    console.log(200)
}, 1000)
console.log(300) // 100 300 200

/** 异步和同步
 * 基于JS是单线程语言
 * 异步不阻塞后面代码执行
 * 同步阻塞后面代码执行
 */

/** 异步应用场景
 * 网络请求 e.g: ajax图片加载
 * 定时任务 e.g: setTimeout
 */
// 加载ajax
console.log('start')
$.get('./data1.json', function(data1) {
    console.log(data1)
}) 
console.log('end')

// 图片加载
console.log('start')
let img = document.createElement('img')
img.onload = function() {
    console.log('loaded')
}
img.src = '/xxx.png'
console.log('end')

// setTimeout
console.log(100)
setTimeout(function() {  // 一次性
    console.log(200)
}, 1000)
console.log(300) // 100 300 200

// setInterval
console.log(100)
setInterval(function() { // 循环执行
    console.log(200)
}, 1000)
console.log(300) // 100 300 200

/**Promise
 * 解决callback hell
 */
function getData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'
getData(url1).then(data1 => {
    console.log(data1)
    return getData(url2)
}).then(data2 => {
    console.log(data2)
    return getData(url3)
}).then(data3 => {
    console.log(data3)
}).catch(err => console.error(err)) // 防错处理

/** 手写Promise加载一张图片 */
function loadImg(src) {
    const p = new Promise((resolve, reject) => { // resolve和reject这两个参数也是函数
        const img = document.createElement('img')
        img.onload = () => { // 加载成功
            resolve(img)
        }
        img.onerror = () => { // 加载失败
            const err = new Error ('图片加载失败', src)
            reject(err)
        }
        img.src = src
        }
    )
    return p
}

const url1 = '/data1.json'
const url2 = '/data2.json'
loadImg(url1).then(img1 => {
    console.log(img1.width)
    return img1 // 普通对象
}).then(img1 => {
    console.log(img1.height)
    return loadImg(url2) // promise实例
}).then(img2 => {
    console.log(img2.width)
    return img2
}).then(img2 => {
    console.log(img2.height)
}).catch(ex => console.error(ex)) // 捕捉错误

/** JS Web API
 * DOM: 网页上的DOM元素 e.g: 文本 图片
 * BOM: 浏览器的导航 URL地址 跳转 宽高
 * 事件绑定: 绑定事件 监听点击
 * AJAX: 网络请求
 * 存储: 网页中的暂存和缓存
 */

 /** DOM操作(Document Object Model) */
// DOM本质: 从HTML文件解析出的一颗tree

/** DOM节点操作
 * 获取DOM节点
 * property: 修改对象属性 不会体现到HTML结构中 ** 尽量使用property 能在JS机制中避免重复DOM重新渲染 **
 * attribute: 修改HTML属性 会改变HTML结构
 * 两者都可能引起DOM重新渲染
 */
// 获取DOM节点
const div1 = document.getElementById('div1') // 元素
const divList = document.getElementsByTagName('div') // 集合
console.log(divList.length)
console.log(divList[0])
const containerList = document.getElementsByClassName('container') // 集合
const pList = document.querySelectorAll('p') // 集合
// property
const p1 = pList[0]
p1.style.width = '100px'
console.log(p1.style.width)
p1.className = 'red'
console.log(p1.className)
console.log(p1.nodeName) // tag节点的名称
console.log(p1.nodeType) // 一般nodeType是 1
// attribute
p1.setAttribute('data-name', 'imooc')
console.log(p1.getAttribute('data-name'))
p1.setAttribute('style', 'font-size: 50px')
console.log(p1.getAttribute('style'))
/**DOM结构操作
 * 新增/插入节点
 * 获取子元素列表 获取父元素
 * 删除子节点
 */
// 新增节点
const div1 = document.getElementById('div1') 
const div2 = document.getElementById('div2')
// 新建节点
const newP = document.createElement('p') 
p1.innerHTML = 'This is newP'
// 插入节点
div1.appendChild(newP) 
// 移动节点
const p1 = document.getElementById('p1')
div2.appendChild(p1)
// 获取父元素
console.log(p1.parentNode)
// 获取子元素列表
const div1ChildNodes = div1.childNodes
const div1ChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => {
    if(child.nodeType === 1) return true // 需要正常nodeType的节点 不需要文本节点 Text: nodeType = 3
    return false
})
console.log(div1ChildNodesP)
// 删除子元素
div1.removeChild(div1ChildNodesP[0])

/** DOM性能
 * DOM操作占CPU比较多 可能会导致浏览器重新渲染 避免频繁DOM操作
 * 对DOM查询做缓存
 * 将频繁操作改为一次性操作
 */
// DOM查询做缓存
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
    // 不缓存DOM查询结果 每次循环都会计算length 频繁进行DOM查询
}
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
    // 缓存length 只进行一次DOM查询
}
// 将频繁操作改为一次性操作
const list = document.getElementById('list')
// 创建一个文档片段 此时还没插入到DOM结构中
const frag = document.createDocumentFragment()
for (let i = 0; i < 10; i++) {
    const li = document.createElement('li')
    li.innerHTML = 'List HTML' + i
    // 先插入文档片段中
    frag.appendChild(li)
}
// 都完成后 统一插入到DOM结构中
list.appendChild(frag)

/** BOM */
// navigator 识别浏览器类型
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)
// screen
console.log(screen.width)
console.log(screen.height)
// location 拆解URL各个部分
console.log(location.href)
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/199'
console.log(location.search)
console.log(localStorage.hash)
// history
history.back()
history.forward() 

/** 事件 */
// 事件绑定和代理
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function(event) {
        const target = event.target
        if (selector) 
            if (target.matches(selector)) fn.call(target, event) // 代理绑定
        else fn.call(target, event) // 普通绑定
    })
}
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'clicked', event => {
    // console.log(event.target) // 获取触发的元素
    event.preventDefault() // 阻止默认行为
    alert(this.innerHTML)
})
const div = document.getElementById('div')
bindEvent(div, 'click', 'a', function(event) {
    event.preventDefault()
    alert(this.innerHTML)
})

/** 事件冒泡
 * 基于DOM树形结构
 * 事件顺着触发元素向上冒泡
 * 应用场景: 代理
 */
const body = document.body
bindEvent(body, 'clicked', event => {
    console.log('body clicked')
    console.log(event.target)
})
const div2 = document.getElementById('div2')
bindEvent(div2, 'clicked', event => {
    console.log('div2 clicked')
    console.log(event.target)
})
// 事件激活
const p1 = document.getElementById('p1')
bindEvent(p1, 'click', event => {
    event.stopPropagation() // 阻止冒泡
    console.log('激活')
})
// 事件取消
const body = document.body
bindEvent(body, 'click', event => {
    console.log('取消')
})
/** 事件代理
 * 代码简洁
 * 减少浏览器内存占用
 * 不要滥用: 事件瀑布流
 */
const div = document.getElementById('div')
bindEvent(div, 'click', event => {
    event.preventDefault()
    const target = event.target
    if (target.nodeName === 'A') alert(target.innerHTML)
})
/** 无限下拉图片列表 如何监听每个图片的点击
 * 事件代理
 * 用event.target获取触发元素
 * 用matches判断是否触发元素
 */

 /** ajax */
// XMLHttpRequest get请求
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data/test.json', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) // 函数异步执行
        if (xhr.status === 200) alert(xhr.responseText) 
}
xhr.send(null)
// XMLHttpRequest post请求
const xhr = new XMLHttpRequest()
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function () { // 函数异步执行
    if (xhr.readyState === 4) {
        if (xhr.status === 200) alert(xhr.responseText)
        else if (xhr.status === 404) console.log('Not found') 
    }
}
const postData = {
    userName: 'ZW',
    password: 'xxx'
}
xhr.send(JSON.stringify(postData))

/** 手写ajax */
function ajax(url) {
    const p = new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200)  resolve(JSON.parse(xhr.responseText))
                else if (xhr.status === 404) reject(new Error('Not found')) 
            }
        }
        xhr.send(null)
    })
    return p
}

const url = '/data/test.json'
ajax(url).then(res => console.log(res)).catch(err => console.error(err))

/** xhr.readyState
 * 0-(未初始化) 还没调用send()方法
 * 1-(载入) 已调用send()方法 正发送请求
 * 2-(载入完成) send()方法执行完成 已接收到全部响应内容
 * 3-(交互) 正在解析响应内容
 * 4-(完成) 相应内容解析完成 可以在客户端调用
 */

/** 同源策略
 * ajax请求时 浏览器要求当前网页和server必须同源
 * 同源: 协议 域名 端口 三者必须一致
 * 前端: http://a.com:8080/ server: https://b.com/api/xxx(端口default: 80)
 */

/** 加载图片css js可无视同源策略
 * <img src = 跨域的图片地址 />
 * <link href = 跨域的css地址 />
 * <script src = 跨域的js地址></script>
 * <img />可用于统计打点 可使用第三方统计服务
 * <link /> <script>可使用CDN CDN一般都是外域
 * <script>可实现JSONP
 */

 /** 跨域
  * 所有的跨域必须经过server端允许和配合
  * 未经server端允许就实现跨域 说明浏览器有漏洞 危险信号
  */

/** JSONP
 * 服务器可任意动态拼接数据返回 只要符合HTML格式要求
 * <script>可绕过跨域限制 可以获得跨域的数据 只要server端愿意返回
 */
<script>
    window.callback = function(data) {
        console.log(data)  // 跨域所得到的信息
    }
</script>
<script src="https://ZW.com/getdata.js"></script>

/** cookie
 * 用于浏览器和server通讯
 * 被借用来到本地存储
 * 可用document.cookie = '...'来修改
 * cookie缺点
 * 存储大小 最大4kb
 * HTTP请求时需要发送到服务端 增加请求数据量
 * 只能用document.cookie = '...'来修改 过于简陋
 */

/** localStorage和sessionStorage
 * HTML5专门为存储设计 最大可存5M
 * API简单易用setItem getItem
 * 不会随着HTTP请求被发送出去
 * 区别
 * localStorage数据会永久存储 除非代码或手动删除
 * sessionStorage数据只存在当前会话 浏览器关闭则情况
 * 用localStorage更多
 */

/** cookie localStorage和sessionStorage区别
 * 容量
 * API易用性
 * 是否跟随HTTP请求发送出去
 */

/** 开发环境
 * git
 * 调试工具
 * 抓包
 * webpack babel
 * Linux常用命令
 */

/** git
 * git add .
 * git checkout xxx
 * git commit -m "xxx"
 * git push origin master
 * git pull origin master
 * git branch
 * git checkout -b xxx
 * git merge xxx
 */

/** 抓包
 * 移动端h5页 查看网络请求 需要工具抓包
 * 手机和电脑连同一个局域网
 * 将手机代理到电脑上
 * 手机浏览网页 即可抓包
 */

/** webpack
 * ES6模块化 浏览器暂不支持
 * ES6语法 浏览器并不完全支持
 * 压缩代码 整合代码 让网页加载更快
 */

/** babel将ES6转ES5 */

/** 从输入URL到渲染出页面的整个过程
 * 加载过程
 * DNS解析: 域名 -> IP地址
 * 浏览器根据IP地址向服务器发起HTTP请求
 * 服务器处理HTTP请求 并返回给浏览器
 * 渲染过程-1
 * 根据HTML代码生成DOM Tree
 * 根据CSS代码生成CSSOM
 * 将DOM Tree和CSSOM整合为Render Tree
 * 渲染过程-2
 * 根据Render Tree渲染页面
 * 遇到<script>暂停渲染 优先加载并执行JS代码 完成再继续
 * 直到把Render Tree渲染完成
 */

/** CSS放在head的原因
 * 把CSS规则在DOM Tree生成前就加载完 
 * DOM Tree直接和所有的CSS整合生成Render Tree
 * 避免重复渲染
 */

/** JS放在body最后的原因
 * 先把HTML渲染完成 再执行script
 */

/** window.onload和DOMContentLoaded
 * window.addEventListener('load', function() {
 *    // 页面全部资源加载完才会执行 包括图片 视频
 * })
 * document.addEventListener('DOMContentLoaded', function() {
 *    // DOM渲染完即可执行 此时图片 视频可能还没加载完
 * })
 */

/** 性能优化原则(空间换时间)
 * 多使用内存 缓存
 * 减少CPU计算量 减少网络加载耗时
 */

/** 让加载更快
 * 减少资源体积: 压缩代码
 * 减少访问次数: 合并代码 SSR服务器端渲染 缓存
 * 使用更快的网络: CDN
 */

/** 让渲染更快
 * CSS放head JS放body下
 * 尽早执行JS 用DOMContentLoaded触发
 * 懒加载(图片懒加载 上滑加载更多)
 * 对DOM查询进行缓存
 * 频繁DOM操作 合并到一起插入DOM结构
 * 节流throttle 防抖debounce
 */
/** 缓存
 * 静态资源加hash后缀 根据文件内容计算hash
 * 文件内容不变 则hash不变 url不变
 * url和文件不变 则会自动触发HTTP缓存机制 返回304
 */

/** CDN */

/** SSR
 * 服务器渲染: 将网页和数据一起加载 一起渲染
 * 非SSR(前后端分离): 先加载网页 再加载数据 再渲染数据
 * 早先的JSP ASP PHP 现在的Vue React
 */

/** 懒加载 */

/** 缓存DOM查询 */

/** 多个DOM操作一起插入到DOM结构 */

/** 尽早开始JS执行 */

/** 手写debounce 
 * 监听输入框的文字变化后触发change事件
 * 直接用keyup事件 则会频繁促发change事件
 * debounce: 用户输入结束或暂停时 才会触发change事件
*/
const input1 = document.getElementById('input1')
// let timer = null
// input1.addEventListener('keyup', function() {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//         console.log(input1.value) // 模拟触发change事件 
//         timer = null //清空定时器
//     }, 500);
// })

function debounce(fn, delay = 500) {
    let timer = null // timer是在闭包中的
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay);
    }
}
input1.addEventListener('keyup', debounce(function() {
    console.log(input1.value)
}), 600)

/** 手写throttle
 * 拖拽一个元素时 要随时拿到该元素被拖拽的位置
 * 直接用drag事件 则会频繁触发 很容易导致卡顿
 * throttle: 无论拖拽多块 都会每个100ms触发一次
 */
const div1 = document.getElementById('div1')
// let timer = null
// div1.addEventListener('drag', function(e) {
//     if (timer) return
//     timer = setTimeout(() => {
//         console.log(e.offsetX, e.offsetY)
//         timer = null
//     }, 100);
// })

function throttle(fn, delay = 100) {
    let timer = null
    return function() {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay);
    }
}
div1.addEventListener('drag', throttle(function(e) {
    console.log(e.offsetX, e.offsetY)
}, 200))

/** 安全
 * XSS跨站请求攻击
 * XSRF跨站请求伪造
 */

/** XSS预防
 * 替换特殊字符 e.g: < -> &lt; > -> &gt;
 * <script> -> &lt; script&gt; ,直接显示 而不会作为脚本执行
 */

/** XSRF预防
 * 使用post接口
 * 增加密码验证
 */