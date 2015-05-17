/**
 * Created by zqc on 2015/5/17.
 */

(function($){
    var version = '0.1';

    // 这些正则将routes转化为路由正则
    var nameReg = /:[^\/\(\)]+/g, // 匹配参数
        optionalReg = /\((\/:.+)\)/g; // 匹配可选参数

    function _routes2Array (routes) {
        var arr = [];
        for(var item in routes){
            arr.push([item, routes[item]]);
        }
        return arr;
    }

    function _route2RegExp (route) {
        var r =  route
            .replace(optionalReg, '(?:$1)?')
            .replace(nameReg, '([^\\(\\)\\/]+)');
        return new RegExp('^' + r + '$');
    }

    function getParam (route, url_segment) {
        return route.match(url_segment).slice(1);
    }

    function router (obj) {
        var arr = _routes2Array(obj.routes);
        arr.forEach(function (item, index) {
            item[0] = _route2RegExp(item[0]);
        });
        console.log(arr);
    }

    $.router = router;

})(Zepto);