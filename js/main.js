var result = `/* 

面试官你好，我是滑振

我将以动画的形式介绍自己
只用文字介绍太单调了
我准备用代码来介绍自己
首先准备一些样式～

*/
*{
  transition: all 1s;
}
html{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 1px solid red;
  padding: 12px;
}

/* 代码需要高亮下～ */
.token.selector {
  color: #690;
}

.token.property {
  color: #905;
}

.token.function {
  color: #DD4A68;
}
/*
把样式向左边挪一点～
*/
.codeWrapper{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
/*
来，添加一个呼吸效果
*/
#code{
  margin: 10px;
  border: 1px solid #aaa;
  animation: breath 0.8s infinite alternate-reverse;
}

/*
不玩了～我来介绍下我自己～
来一张白纸～
*/
#paper{
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  background: rgb(37, 70, 101);    
  justify-content: center;
  align-items: center;
  padding: 16px;
}
#paper>.content{
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
`
var result2 = `
/*
接下来，将Markdown变成HTML
*/
/*
接下来，给HTML加样式
*/
h2{
   color: rgb(37, 70, 101)
}
ul>li,
p{
  white-space:nowrap;
}
ul>li{
    margin-left: 20px;
}
/*
自我介绍结束啦~～～
*/
`

var md = `
## 自我介绍

- 滑振/男/1994
- 本科/西北大学/信息与计算科学
- 博客：https://www.jianshu.com/u/7aa48a9ad244

## 技能介绍
- 熟悉html/css/javascript
- 熟悉jquery/bootstrap/scss
- 熟悉vue/webpack/parcel

## 项目介绍
#### vue.js技术栈搭建CNODE社区
- 使用vue.js/vue-router/webpack
- 预览链接：https://huahua029.github.io/cnode/

#### 自由画板
- 使用canvas/javascript
- 预览链接：https://huahua029.github.io/jsdemo/drawingBoard/index.html

#### 极简导航
- 使用原生js完成
- 预览链接：https://huahua029.github.io/jsdemo/nav-demo/index.html

## 联系方式
- 电话：18109243054
- 微信：1282038751
- 邮箱：huazhen007@gmail.com
`

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n++
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        myStyle.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            console.log('结束')
            fn.call()
        }
    }, 20)
}
writeCode('', result, () => {
        creatPaper(() => {
            writeCode(result, result2, () => {
                writeMarkdomn(md, () => {
                    markdownToHtml(md)
                })
            })
        })
    })
    // 插入
function creatPaper(fn) {
    var paper = document.createElement('div')
    var content = document.createElement('pre')

    paper.id = 'paper'
    content.className = 'content'
    document.body.appendChild(paper)
    paper.appendChild(content)
    fn.call()
}

function writeMarkdomn(markdowm, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n++
        domPaper.innerHTML = markdowm.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdowm.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 20)
}

function markdownToHtml(md) {
    document.querySelector('#paper>pre').innerHTML = marked(md);
}