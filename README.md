# 数字经信前端

## 项目说明

| 项目名称 | 描述 |
| -------- | -------- |
| szjx-front | 数字经信前端 |

# 目录说明
```
├── szjx-front
│   ├── config                  // 用于生成文件， node运行
│   ├── dist                    // 文件生成目录
│   ├── public          
│   ├── src 
│   │   ├── assets              // 静态文件目录。img, font... 
│   │   ├── common              // 公共js目录
│   │   │   ├── constant        // 文案
│   │   │   ├── helpers         // 和业务相关的公共代码
│   │   │   ├── interface       // 接口目录
│   │   │   ├── less            // 公共的less
│   │   │   ├── mixins          // vue的mixins文件夹
│   │   │   └── utils           // 工具库文件夹。以index.js为导出口（必须是纯函数）
│   │   ├── components          // 公共的组件
│   │   └── gov/ent/h5          // 业务的多个端
│   ├── static
│   ├── tests
│   ├── .env...
│   ├── .eslintrc
│   ├── .gitignore
│   ├── .babelrc
│   ├── package.json
│   ├── postcss
│   └── vue.config.js
```
# vue
v-for的时候最好使用`key`，但是不要用index，没有唯一值就算了

# utils文件夹
> 主要用于存储一些公用的方法

方法全部使用`export const`进行单个导出

以`index.js`为单个出口，所有文件通过`index.js`导出

使用的时候用 
```
import { gotoUrl } from '@/common/utils/index'
```

具体方法参看`/common/utils/index.js`


# 导入
导入不能使用`import * as utils from '@/common/utils/index.js'`这种方式。

表意不明，会加载多余的文件

使用`import { gotoUrl } from '@/common/utils/index'`方式，局部引入。

# less
less除了多个页面共同使用一个less的样式否则不要单独建立文件，公用的less放在`/common/less/`下

示例
```html
<style lang="less" scoped>
 .name{
     margin: 10px;
 }
</style>
```

**必须加scoped，不允许在js中加载less**，如果将来多文件合并，在js中直接加载less会造成样式冲突。

如果需要改组件内的样式如`el-input`

**必须必须必须加上一个id（或者独一无二的包裹框）**
```
#id{
    .el-input{
        width: 100px
    }
}
```


# 路由
使用`const router = () => import('./test.vue')`，webpack会单独拆出一个js文件

# 测试
暂无

# 改进建议
## element-ui
二次封装
* el-table
* el-Pagination
* button
* 。。。

样式统一，以后方便修改

## 脚手架
### create
create 的时候加参数 router 等

默认的时候可以不添加router，因为是多页面，当需要构建spa的时候执行
```js
node ./createGov.js router
```

或者`./config/fileName.js`导出时采用配置的方法
```js
module.exports = {
    h5: {
        login: {
            router: true,
            store: true,
            autoFix: true
            ...
        }
    }
}
```


### eslint
。。。

## 项目结构
### 接口
`/interface/api/`下文件过于多，接口重复， 但是难度较大

按前端模块分，有点麻烦


