/**
 * Created by zqc on 2015/5/17.
 */

(function($){
    var version = '0.1';

    var win = window,
        doc = document,
        loc = location;
    var _global = {
        callback: null,
        root: '/',
        segment: '',
        routesArr: []
    };

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

    function _callbackFun (obj) {
        var callback = {};
        _global.routesArr.forEach(function (route, index) {
            callback[route[1]] = obj[route[1]] || function () {
                console.warn('function "' + route[1] + '" does not exist');
            }
        });
        return callback;
    }

    function _route2RegExp (route) {
        var r =  route
            .replace(optionalRegExp, '(?:$1)?')
            .replace(paramRegExp, '([\\w\\d\\_\\-\\.]+)');
        return new RegExp('^' + r + '$');
    }

    function _getParam (routeRegExp, segment) {
        return segment.match(routeRegExp).slice(1);
    }

    function _getSegment () {
        return loc.href.slice(_global.root.length);
    }

    function _bindPopStateEvent () {
        $(win).on('popstate', function (event) {
            _testUrl(event.state.route);
        });
    }

    function _testUrl (route) {
        var i,
            l = _global.routesArr.length,
            routeRegExp = null,
            callback = null;
        for(i = 0; i < l; i ++){
            if(_global.routesArr[i][0].test(route)) {
                callback = _global.routesArr[i][1];
                routeRegExp = _global.routesArr[i][0];
                break;
            }
        }
        _global.callback[callback].apply(null, _getParam(routeRegExp, route));
        //console.log(routeRegExp, route);
        //console.log(_getParam(routeRegExp, route));
    }

    function router (obj) {
        if(!_testType('Object', obj)){
            console.error('Error param: param must be a Object');
            return;
        }
        _global.root = obj.root || _global.root;
        _global.routesArr = _routes2Array(obj.routes || null);
        _global.callback = _callbackFun(obj);
        _bindPopStateEvent();

        _testUrl(_getSegment());
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
        history[option.replace ? 'replaceState' : 'pushState']({route: route, title: title}, 'test', _global.root + route);
        console.log('navigate');
    }

    $.router = router;
    $.navigate = navigate;

})(Zepto);