# zepto-router
一个zepto插件，利用HTML5 History API实现的路由控制插件，适用于移动端单页面应用

语法
--

```JavaScript
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
```
