# 1.首先在 vscode 开发工具中安装插件 Vetur 、 Prteeier-Code formatter 插件

# 2.然后 在命令行中输入 cnpm i -g prettier 全局安装 prettier 插件

# 3.在项目根目录下新建一个 .prettierrc.json 的文件，文件内容如下

{
"singleQuote": true,
"semi": false
}

# 4. 在编辑器中打开 文件 =》首选项 =》 设置 =》滚动鼠标，找到在 setting.json 文件中修改，点击打开编辑器，用下面的内容替换里面的内容

{
"files.associations": {
"_.cjson": "jsonc",
"_.wxss": "css",
"\*.wxs": "javascript"
},
"emmet.includeLanguages": {
"wxml": "html"
},
"minapp-vscode.disableAutoConfig": true,
"workbench.colorTheme": "Default Light+",
"workbench.iconTheme": "vscode-icons",
// vscode 默认启用了根据文件类型自动设置 tabsize 的选项
"editor.detectIndentation": false,
// 重新设定 tabsize
"editor.tabSize": 2,
// #每次保存的时候自动格式化
"editor.formatOnSave": true,
// #每次保存的时候将代码按 eslint 格式进行修复
"eslint.autoFixOnSave": true,
// 添加 vue 支持
"eslint.validate": [
"javascript",
"javascriptreact",
{
"language": "vue",
"autoFix": true
}
],
// #去掉代码结尾的分号
"prettier.semi": false,
// #使用带引号替代双引号
"prettier.singleQuote": true,
// #让函数(名)和后面的括号之间加个空格
"javascript.format.insertSpaceBeforeFunctionParenthesis": true,
// #这个按用户自身习惯选择
"vetur.format.defaultFormatter.html": "js-beautify-html",
// #让 vue 中的 js 按编辑器自带的 ts 格式进行格式化
"vetur.format.defaultFormatter.js": "vscode-typescript",
"vetur.format.defaultFormatterOptions": {
"js-beautify-html": {
"wrap_attributes": "force-aligned"
// #vue 组件中 html 代码格式化样式
}
},
// 格式化 stylus, 需安装 Manta's Stylus Supremacy 插件
"stylusSupremacy.insertColons": false, // 是否插入冒号
"stylusSupremacy.insertBraces": false, // 是否插入大括号
"stylusSupremacy.insertSemicolons": false, // 是否插入分好
"stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
"stylusSupremacy.insertNewLineAroundImports": false,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"[vue]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.fontSize": 18 // import 之后是否换行
}

# 5.然后在需要格式化的文件里 使用 Alt + Shift + F 组合键进行快速格式化
