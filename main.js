!function() {
    var css1 = `
    /* 
    * 面试官你好，我是XXX
    * 只用文字作做我介绍太单调了
    * 我就用代码来介绍吧
    * 首先准备一些样式
    */
    * {
        transition: all 1s;    
    }
    /* 
    * 先给背景换个色吧
    * 字也换个颜色
    */
    html {
        color: rgb( 222,222,222 ); 
        background: rgb( 0,43,54 );
    }
    #code {
        width: 100%;
        border: 1px solid #aaa;
        padding: 16px;
        font-size: 16px;
        border-radius: 15px;
        overflow: auto;
    }
    /*
    * 代码高亮一下吧 
    * /
    .token.selector {
        color: #690;
    }
    .token.property {
        color: #905;
    }
    .token.punctuation { 
        color: yellow; 
    }
    .token.function {
        color: #DD4A68;
    }
    /*
    * 有点单调，加点呼吸效果吧
    * /
    #code {
        animation: breath 1s infinite alternate-reverse;
    }
    #code-wrapper {
        position: fixed;
        width: 50%;
        height: 100%;
        left: 0;
    }
    /*
    * 好了，开始要写我的简历了，来张白纸
    * /
    #paper > .content {
        background: white;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        padding-left: 16px;
        overflow: auto;
    }
    `

    var css2 = `
    /* 
    * 接下来用一个优秀的库 marked.js
    * 把 Markdown 变成 HTML
    */
    `

    var css3 = `
    /*
    * 这就是我的会动的简历
    * 谢谢观看
    */
    `

    var md = `
# 自我介绍

我叫 XXX
2000 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

    function writeCss(prefix, code, fn) {
        var domCode = document.querySelector('#code')
        var n = 0
        var id = setInterval(() => {
            n += 1
            domCode.innerHTML = Prism.highlight(prefix + code.slice(0, n), Prism.languages.css);
            styleTag.innerHTML = prefix + code.slice(0, n)
            domCode.scrollTop = domCode.scrollHeight
            if(n >= code.length){
                window.clearInterval(id)
                fn & fn.call()
            }
        },75)
    } 

    function creartPaper(fn) {
        var paper = document.createElement('div') 
        paper.id = 'paper'
        var content = document.createElement('pre')
        content.className = 'content'
        paper.appendChild(content)
        document.body.appendChild(paper)
        fn && fn.call()
    }

    function writeMarkdown(markdown, fn) {
        var domPaper = document.querySelector('#paper > .content')
        var n = 0
        var id = setInterval(() => {
            n += 1
            domPaper.innerHTML = markdown.substring(0, n)
            domPaper.scrollTop = domPaper.scrollHeight
            if(n >= markdown.length){
                window.clearInterval(id)
                fn & fn.call()
            }
        },75)
    }

    function convertMarkdownToHtml(markdown, fn){
        var div = document.createElement('div')  
        div.className = 'markdown markdown-body'
        div.innerHTML = marked(markdown)
        let markdownContainer = document.querySelector('#paper > .content')
        markdownContainer.replaceWith(div)
        console.log(marked(markdown))
        fn && fn.call()
    }

    writeCss('', css1, () => {
        creartPaper(() => {
            writeMarkdown(md, () => {
                writeCss(css1, css2, () => {
                    convertMarkdownToHtml(md, () => {
                        writeCss(css1 + css2, css3, () => {
                            console.log('done')
                        })
                    })
                })
            })
        })
    })
}()