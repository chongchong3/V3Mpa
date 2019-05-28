> h5端多页面改为单页面(目前只有一级路由，没有多级路由)

> 所有less文件集入vue文件
> 所有页面 .vue放入 **page** 文件夹下

> login.html & loginGov.html 分为两个端登录， 统一跳转进appIndex.html
> **gotoH5URL页面跳转方式需修正**

> 注意下相对引用的路径，及删除fileName.js中除了login, loginGov, appIndex的文件 

> 针对h5端, axios需三次封装 拦截404, 以及res.code != 0 的情况等