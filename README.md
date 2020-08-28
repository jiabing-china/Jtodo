# Jtodo

>  （PS：不含vue的脚手架，webpack版本是4.X，vue2.X）写在前面，我决定自己来写这个小demo，因为对着别人的东西做的时候，发生了各种问题，非常痛苦，当然，与工作不一样，我不需要赶时间，所以，我可以慢慢做，同时用各种方式，不用当生产线上的工人。

新建文件vuetodo

文件目录
Jtodo                            
├─ dist                          
│  ├─ fonts                      
│  │  ├─ checked.svg             
│  │  └─ unChecked.svg           
│  ├─ bg.jpg                     
│  ├─ index.html                 
│  ├─ main.3efc9cf4.js           
│  ├─ main.e647d16e.css          
│  ├─ manifest.main.1ee16c22.js  
│  └─ vendors.2c31e1e9.js        
├─ src                           
│  ├─ assets                     
│  │  ├─ images                  
│  │  │  ├─ bg.jpg               
│  │  │  ├─ checked.svg          
│  │  │  └─ unChecked.svg        
│  │  └─ styles                  
│  │     ├─ footer.styl          
│  │     ├─ global.styl          
│  │     ├─ style.styl           
│  │     └─ test.css             
│  ├─ todo                       
│  │  ├─ footer.jsx              
│  │  ├─ header.vue              
│  │  ├─ item.vue                
│  │  ├─ tabs.vue                
│  │  └─ todo.vue                
│  ├─ app.vue                    
│  └─ index.js  
├─ .babelrc
├─ package-lock.json             
├─ package.json                  
├─ postcss.config.js             
├─ README.md                     
└─ webpack.config.js             

```sh
npm init -y
npm i webpack webpack-cli -D
npm i vue vue-loader
npm i css-loader vue-template-compiler
npm i postcss postcss-loader autoprefixer
npm i -D babel-loader @babel/core @babel/preset-env
npm i babel-plugin-transform-vue-jsx -D
npm i babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx -D
npm i babel-preset-env
。。。。。。。
```
这边就不全写了，package.json里面有详细的，npm install一下就行了，需要注意以下几个点 

1：vue-loader需要css-loader vue-template-compiler，css-loader又需要style-loader

2：Vue Loader 的配置和其它的 loader 不太一样。除了通过一条规则将 vue-loader 应用到所有扩展名为 .vue 的文件上之外，请确保在你的 webpack 配置中添加 Vue Loader 的插件：
```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```
这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

一个更完整的 webpack 配置示例看起来像这样：
```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ]
}
```
实际上我测试也是有问题的，下面说一下

style-loader是作为顶层的loader来渲染到dom上的，这也就意味着，尽量在处理css或者预编译的loader的顶层上加上style-loader。为此我们看一下webpack的英文官网，一定要是英文！！！

关于style-loader的：

Inject CSS into the DOM(css注入到DOM中)

To begin, you'll need to install style-loader:（导入，这要是看不懂，亲，建议这边回家种红薯）

It's recommended to combine style-loader with the css-loader（推荐这两玩意结合起来用，两粒一起嚼起来才最佳）

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```
你看，webpack，处理css-loader就会加上style-loader，vue-loader处理 .vue文件中内部的<style>样式块，只在加了vue-style-loader，可我在测试中 .vue中内部样式就是不生效，额外加了style-loader药到病除，下面黑魔法来了，等我demo做完了，我就不信邪，我又去掉了style-loader，好像有可以显示样式了，说实话，我本是无神论者，现在我相信了，科学的尽头就是玄学。也可能是误操作，菜才能解释这一切。

>然后简单说一下剩下的loader,可能会漏，漏掉的就去找英文文档，英文的，就是那种看着难受的，看懂了很爽的。

babel=》这个需要三个，loader、core、env（加载器，核心，环境），可能处理jsx文件还需要相关的插件，注意@和没@的区别，我看好像版本的问题，具体还是要查，webpack的3和4我感觉属于大版本更新，废弃和启用的差别大。

postcss-loader=》搭配postcss，他们的关系我觉得就是vue和vue-loader的关系。这个用来处理css，比如加浏览器前缀，，利用hash值来达到长缓存。

处理图片的比如url-loader和file-loader的就不说了，还有svg的

>插件：

这个在demo用的不多，我就举几个我用到的

clean-webpack-plugin=》这个是好东西，打包的时候，清除上一次dist里面的文件

html-webpack-plugin=》生成一个html当根

mini-css-extract-plugin=》webpack4.X，需要这个插件来提取css样式的。

webpack里面的

config.optimization.splitChunks这个玩意可以拆包，为了稳定性，我们对于第三方类库几乎不更新，为了长缓存，我们需要把业务代码与第三方类库的代码剥离开来。

hash，入口文件，整个文件的hash，一旦有个文件改变，值也变，没缓存意义

chunkhash，统一模块的hash值，同上

contenthash，文件内容一样，hash值不一样

>最后写README,md的时候，我在ie下跑代码的时候，发现不能运行，我傻了，我忘了babel也要配置，不想配置了，正常人谁会用ie？而且，作为webpack核心功能之一，这转移很完善，坑不多~吧~吧~吧~

>总结：没啥业务，算是过了一遍vue基本语法，模板，事件绑定，父子组件通信的props和$emit，手撕了webpack最最最基础的东西，基本走了一遍上线的流程。（最简单的那种）现在前端工程化，模块化，我接触有点晚了，慢慢来吧，更新过快是坏事，也是好事。听说vite有丶好用，但是webpack开发者会心一笑。。。。。。




