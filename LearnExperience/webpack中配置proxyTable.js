// proxyTable配置代理
//   前后端分离，意味着就会前后端的项目就不会在同一个目录或服务下，也就意味着跨域。
//   vue-cli使用webpack模板生成的项目，会自动添加webpack-dev-server依赖包，通过它的proxy选项可以配置代理，帮我们解决跨域的问题。在项目文件的根据目录下的config文件的index.js的dev配置项中，有个proxyTable可以进行代理配置。
//   因为proxy只是对接口做代理，而不是做替换，所以在浏览器中我们看到的还是代理前的接口地址，并非代理后的地址。因此如何知道代理有不用配置正确，还真是个问题。下面上示例：

proxyTable: {
    '/apis': { // 将https://www.exaple.com映射为/apis
        target: 'https://www.exaple.com', //映射地址
        changeOrigin: true, // 是否跨域,true表示是
        pathRewrite: {
            '^/apis': '' // 将/apis替换为空,
        }
    }
}
//上面的配置，将'/apis'开头的请求进行代理，代理至https://www.exaple.com
//并且/apis仅仅只是用来做匹配的，需要重写。
//就是说，如果你在页面里请求接口：/apis/getUserInfo
//将被代理成：https://www.exaple.com/getUserInfo
//   具体项目中该如何使用,再看几个示例：
//如果你们项目的接口存在某个公共路径
//比如你们的接口是这样的：192.168.1.110/api/a,192.168.1.110/api/b,192.168.1.110/api/c,
//就可以使用api来映射，如
proxyTable: {
    '/api': { 
        target: '192.168.1.110', //映射地址
        changeOrigin: true
    }
}
//然后就可以直接请求：/api/a，/api/b，/api/c


//如果你们项目的接口不存在公共路径
//比如你们的接口是这样的：192.168.1.110/a,192.168.1.110/b,192.168.1.110/c,
//就可以添加一个/apis来映射，如
proxyTable: {
    '/apis': { 
        target: '192.168.1.110', 
        changeOrigin: true,
        pathRewrite: {
            '^/apis': '' // 将/apis替换为空,
        }       
    }
}
//请求接口为：/apis/a，/apis/b，/apis/c
//因为'/apis'只是用来做映射的，真实接口并没有这个路径，所以需要使用pathRewrite将'/apis'替换成空
//'^'表示只替换开头的'/apis'

//如果你们项目的接口存在多个公共路径
//比如你们的接口是这样的：192.168.1.110/apis1/a,192.168.1.110/apis1/b,192.168.1.110/apis2/a,192.168.1.110/apis2/b
//可以添加多个映射，如
proxyTable: {
    '/apis1': { 
        target: '192.168.1.110', //映射地址
        changeOrigin: true
    }
    '/apis2': { 
        target: '192.168.1.110', //映射地址
        changeOrigin: true
    }
}
//使用：/apis1/a,/apis1/b,/apis2/a,/apis2/b






webpack中处理跨域问题
webpack代理应用的一个插件：webpack-dev-server，内置了http-procy-middleware可以解决请求url代理的问题。
原理：应用重定向的方式解决跨域问题，即就是，当后端的接口拥有独立的API,而前端想在同一个domain下访问接口的时候，可以通过设置proxy实现。

2.webpack.config.js中配置的文件：


3.使用
注：使用的url 必须以/开始 否则不会代理到指定地址。

 fetch('/user/login').then(res => {
        // 被代理到 http://test.xxx.com/user/login
        return res.json();
    }).then(res => {
        console.log(res);
    })

    fetch('user/login').then(res => {
        // http://localhost:8088/user/login 访问本地服务
        return res.json();
    }).then(res => {
        console.log(res);
    })
————————————————
