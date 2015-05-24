# zepto-router
一个zepto插件，利用HTML5 History API实现的路由控制插件，适用于移动端单页面应用。
需要后台支持，当浏览器访问一个地址时，服务器返回的是这个单页面。前端路由由这个单页面来控制。

不支持hash路径控制。
提供两个基本接口：
```javascript
    $.router(option);
    $.navigate(segment, title, option);
```

### 接口调用
```javascript
    $.router(option);
```

#### 参数
    @option
        root: 根路径
        routes: 路径对象

#### routes 语法
    routes有特定的语法，类似于Backbone.Router的语法
    routes是一个JavaScript对像

    routes属性名为一个指定语法字符串，router插件在运行时将其解析成正则表达式。
    解析规则如下：
    规则一：":part"匹配单个路径
    规则二："(/:type)"匹配可选单个路径
    规则三："p:page"匹配组合单个路径
    目前路由规则只有三个，规则可以互相组合。
    组合例子：
    1.路由`":part"`可以匹配man
    2.路由`"part(/:type)"`可以匹配路径part或者路径part/man
    3.路由`"part/:type"`可以匹配路径part/man
    4.路由`"part/p:page"`可以匹配路径part/p2

    routes属性值为匹配路径成功后的回调函数，一个路径的回调函数由第一个复合条件的路由规则决定

### 接口调用
```javascript
    $.navigate(segment, title, option);
```

#### 参数
    @segment
        路径片段，符合routes的路由规则
    @title
        document.title
    @option
        replace: 路径是否替代当前的路径
        toggle: 未知

### 例子
```javascript
    // 定义路由规则以及回调函数
    $.router({
        root: 'http://localhost:3000/',
        routes: {
            ':part(/:type/:bar)': 'jamPart',
            ':part/:type': 'jamPart',
            ':part/y:type': 'jamPart',
            ':part(/:type)': 'jamPart',
            'load/:file': 'loadFile'
        },
        jamPart: function (part, type) {
            console.log('jampart');
            console.log(part, type);
            document.title = setText(type);
        },
        loadFile: function (file) {
        }
    });

    // 设置url
    $.navigate('homework/unhand', title, {
        replace: false
    });
```
具体例子可以看目录中example下的plugin-test.html文件
本例子使用了nodeJS作为服务器，测试环境需要有node环境，node服务器文件在serer下的server.js文件
环境配好后，执行server.js文件，在浏览器地址栏输入http://localhost:3000/man/info可看到demo运行情况
