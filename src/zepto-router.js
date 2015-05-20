/**
 * Created by zqc on 2015/5/17.
 */

(function($){
    var version = '0.1';

    var win = window,
        doc = document,
        loc = location,
        root = '/',
        segment = '',
        routesArr = null;

    // 这些正则将routes转化为路由正则
    var paramRegExp = /:(\w|_)+/g,// 匹配参数，参数只允许由字母、数字和下划线组成
        optionalRegExp = /\(((\/:(\w|_)+)*)\)/g, // 匹配可选参数
        segmentRegExp = /(^\D(\w|-|_)+)(\/\D(\w|-|_)*)/;

    function _testType (type, variable) {
        return Object.prototype.toString.call(variable) === '[object ' + type + ']';
    }

    function _routes2Array (routes) {
        var arr = [];
        for(var route in routes){
            arr.push([_route2RegExp(route), routes[route]]);
        }
        return arr;
    }

    function _route2RegExp (route) {
        var r =  route
            .replace(optionalRegExp, '(?:$1)?')
            .replace(paramRegExp, '([\\w\\d\\_\\-\\.]+)');
        return new RegExp('^' + r + '$');
    }

    function _getParam (route, segment) {
        return route.match(segment).slice(1);
    }

    function _getSegment () {
        return loc.href.slice(root.length);
    }

    function _bindPopStateEvent () {
        $(win).on('popstate', _testUrl);
    }

    function _testUrl (event) {
        console.log(event.state);
    }

    function router (obj) {
        root = obj.root || root;
        routesArr = _routes2Array(obj.routes || null);
        _bindPopStateEvent();
        //console.log(arr);
    }
    // {toggle: true, replace: ture}
    function navigate (route, title, option) {
        if(!_testType('String', route)){
            console.error('Error route: route must be a String');
            return;
        }
        if(!segmentRegExp.test(route)){
            console.error('Error route: route could not start with Number!');
            return;
        }
        if(_testType('Object', title)){
            option = title;
            title = doc.title;
        }
        if(_testType('Object', option) && !option.hasOwnProperty('replace')){
            option.replace = false;
        }
        if(!_testType('Object', option)){
            option = {};
            option.replace = false;
        }
        title = title || doc.title;
        history[option.replace ? 'replaceState' : 'pushState']({route: route, title: title}, 'test', root + route);
        console.log('navigate');
    }

    $.router = router;
    $.navigate = navigate;

})(Zepto);