/**
 * 
 */

var myApp = angular.module("myApp", ["ui.router","oc.lazyLoad"]);
var $stateProviderRef = null;
var $urlRouterProviderRef = null;
myApp.config(function ($locationProvider,$stateProvider, $urlRouterProvider,$sceDelegateProvider) {
    
    /* $urlRouterProvider.otherwise("/form1");
     $stateProvider
        .state("kotak", {
            url: "/kotak",
            templateUrl: "form1.html",
            controller:'kotakCtrl'
        })
     
        .state("sbi", {
            url:"/sbi",
            templateUrl: "form1.html",   
            controller:'kotakCtrl'
        })
     
        .state("boi", {
            url:"/boi",
            templateUrl:"form3.html",
            controller:'boiCtrl'
        })
     
        .state("axis", {
                url:"/axis",
                templateUrl: "form4.html",
                controller:'axisCtrl'
            });
    */
   
    $urlRouterProviderRef = $urlRouterProvider;
    $stateProviderRef = $stateProvider;
    $locationProvider.html5Mode(false);
    $urlRouterProviderRef.otherwise("/");
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
    
});


myApp.run(['$q', '$rootScope', '$state', '$http',
  function ($q, $rootScope, $state, $http) 
  {
    $http.get('m.json')
    .success(function(data)
    {
      angular.forEach(data, function (value, key) 
      { 
          console.log(key);
          var state = {
            "url": key,
            "templateUrl": "form1.html",
            "controller":'mainCtrl'
          };

          // here we configure the views
          

          $stateProviderRef.state(key, state);
      });
      
    });
}]);


myApp.constant('URL', 'data/');

//--------------Controllers-------------//
 var a=[];
myApp.controller('kotakCtrl', function (JenishService,DataService,ChartService,$scope,$rootScope) {
    var ctrl = this;

    ctrl.content = [];
   
    
    ctrl.fetchContent = function () {
        var b=[];
        ctrl.content=[];
            ctrl.content = a;
            console.log("sada" + JSON.stringify(ctrl.content));
        };
 
        $rootScope.$on("CallParentMethod", function(){
           $scope.parentmethod();
        });
   
    $scope.parentmethod = function() {
        
            ctrl.fetchContent();
        };

 ctrl.fetchContent();
    
});
myApp.controller('mainCtrl',function($ocLazyLoad,MenuService,DataService,ChartService,$scope,$rootScope,SbiService,$rootScope){
   var c=this; 
   var jeni=[];
    $ocLazyLoad.load('js/highcharts-ng.js');
     MenuService.getData().then(function (result) {
            
           $scope.items=result.data;
         jeni=result.data;
           
   });
    console.log("aAs");
    $scope.clickOn = function ($event) {
    alert("event:" + $event.currentTarget.id);
        DataService.getData($event.currentTarget.id).then(function (result) {
            a=[];
            
            console.log("jenish" + result.data);
            
            a=result.data;
            console.log("a" + a);
 $rootScope.$emit("CallParentMethod", {});             
           
        });
  }
  //  $scope.items=m;
    $scope.abc=function(countryName)
    {
        console.log("asdjh");
        DataService.getData().then(function (result) {
            a = result.data;
            console.log("a" + a);
 $rootScope.$emit("CallParentMethod", {});             
           
        });  
    };
     $scope.sbi=function()
    {
         var b=[];
         a=b;
        console.log("sbi");
        SbiService.getData().then(function (result) {
            a = result.data;
            console.log("a" + a);
 $rootScope.$emit("CallParentMethod", {});             
            
        });  
    };
});

//--------------Services-------------//
myApp.factory('DataService', function ($http, URL) {
     
    var getData = function (abc) {
        return $http.get(URL +  abc + '.json');
    };

    return {
        getData: getData
    };
});
myApp.factory('MenuService', function ($http, URL) {
     
    var getData = function () {
        return $http.get('m.json');
    };

    return {
        getData: getData
    };
});
myApp.factory('JenishService', function ($http, URL) {
     
    var getData = function () {
        return $http.get(URL + 'data.json');
    };

    return {
        getData: getData
    };
});
myApp.factory('SbiService', function ($http, URL) {
     
    var getData = function () {
        return $http.get(URL + 'sbi.json');
    };

    return {
        getData: getData
    };
});

myApp.factory('TemplateService', function ($http, URL) {
    var getTemplates = function () {
        return $http.get(URL + 'templates.json');
    };

    return {
        getTemplates: getTemplates
    };
});
myApp.factory('ChartService', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'charts.json');
    };

    return {
        getData: getData
    };
});
//-----------------Directives-------------------//
myApp.directive('contentItem', function ($compile, TemplateService) {
    var getTemplate = function (templates, contentType) {
        var template = '';

        switch (contentType) {
            case 'image':
                template = templates.imageTemplate;
                break;
            case 'video':
                template = templates.videoTemplate;
                break;
            case 'notes':
                template = templates.noteTemplate;
                break;
	    case 'chart':
                template = templates.chartTemplate;
                break;
        }

        return template;
    };
    var linker = function (scope, element, attrs) {
        scope.rootDirectory = 'images/';

        TemplateService.getTemplates().then(function (response) {
            var templates = response.data;

            element.html(getTemplate(templates, scope.content.content_type));

            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: 'E',
        link: linker,
        scope: {
            content: '='
        }
    };
});

