// js实现点击按钮复制文本功能
/**
 * 最近遇到一个需求，需要点击按钮，复制 <p> 标签中的文本到剪切板
  之前做过复制输入框的内容，原以为差不多，结果发现根本行不通
  尝试了各种办法，最后使了个障眼法，实现了下面的效果
 */

 /**
  * 
  * 一、原理分析

浏览器提供了 copy 命令 ，可以复制选中的内容

1
document.execCommand("copy")
如果是输入框，可以通过 select() 方法，选中输入框的文本，然后调用  copy 命令，将文本复制到剪切板

但是 select() 方法只对 <input> 和 <textarea> 有效，对于 <p> 就不好使

最后我的解决方案是，在页面中添加一个 <textarea>，然后把它隐藏掉

点击按钮的时候，先把 <textarea> 的 value 改为 <p> 的 innerText，然后复制 <textarea> 中的内容 

二、代码实现

HTML 部分

<style type="text/css">
  .wrapper {position: relative;}
  #input {position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;}
</style>
 
<div class="wrapper">
  <p id="text">我把你当兄弟你却想着复制我？</p>
  <textarea id="input">这是幕后黑手</textarea>
  <button onclick="copyText()">copy</button>
</div>
<style type="text/css">
  .wrapper {position: relative;}
  #input {position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;}
</style>

<div class="wrapper">
  <p id="text">我把你当兄弟你却想着复制我？</p>
  <textarea id="input">这是幕后黑手</textarea>
  <button onclick="copyText()">copy</button>
</div>





  */


  /**
   *  JS 部分
   * 
   *  <script type="text/javascript">
        function copyText() {
        var text = document.getElementById("text").innerText;
        var input = document.getElementById("input");
        input.value = text; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        alert("复制成功");
        }
      </script>
      亲测，Firefox 48.0，Chrome 60.0，IE 8 都能用
      以上就是本文的全部内容，希望对大家的学习有所帮助，也希望大家多多支持脚本之家。
   * 
   */