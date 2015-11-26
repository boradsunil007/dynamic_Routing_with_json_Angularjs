/**
 * 
 */

var myApp = angular.module("myApp", ["ui.router","oc.lazyLoad","ui.grid","ui.grid.pagination"]);
var $stateProviderRef = null;
var $urlRouterProviderRef = null;
myApp.config(function ($locationProvider,$stateProvider, $urlRouterProvider,$sceDelegateProvider) {
    
   /*  $urlRouterProvider.otherwise("/form1");*/
     $stateProvider
        .state("menu", {
            url: "/menu",
            templateUrl: "menu.html",
            controller:'menuCtrl',
		 controllerAs:'menu'
        })
     
        .state("widget", {
            url:"/widget",
            templateUrl: "widget.html",   
            controller:'widgetCtrl',
		 controllerAs:'widget'
        })
     
        .state("page", {
            url:"/page",
            templateUrl:"page.html",
            controller:'pageCtrl',
		 controllerAs:'page'
        })
     
        .state("axis", {
                url:"/axis",
                templateUrl: "form4.html",
                controller:'axisCtrl'
            });
    
   
    $urlRouterProviderRef = $urlRouterProvider;
    $stateProviderRef = $stateProvider;
    $locationProvider.html5Mode(false);
    $urlRouterProviderRef.otherwise("/");
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
    
});


myApp.run(['$q', '$rootScope', '$state', '$http',
  function ($q, $rootScope, $state, $http) 
  {
      //   $ocLazyLoad.load('vendor/highcharts-ng.js');   
    $http.get('m.json')
    .success(function(data)
    {
        
        for(var i=0;i<data.length;i++){
            console.log(data[i].name + "sdjkfh");
             var state = {
            "url": data[i].name,
            "templateUrl": "form1.html",
            "controller":'mainCtrl'
          };

          // here we configure the views
          

          $stateProviderRef.state(data[i].name, state);
        }
      angular.forEach(data, function (value, key) 
      { 
          console.log("j" + JSON.stringify(value));
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
myApp.controller('menuCtrl',['$scope','DataService',function($scope,DataService){
	
	var menu=this;
	DataService.getData("menuList").then(function(response){
		menu.gridOptions.data=response.data;	
			console.log("asfd"+menu.data);
	});

		/*[
		{
			id:1,
			name:'home',
			page:'abc',
			icon:'sdfg'
		},{
			id:2,
			name:'about',
			page:'xyz',
			icon:'sdfg'
		},{
			id:3,
			name:'contact',
			page:'def',
			icon:'sdfg'
		}];*/
	
	menu.pages=[{"page":"abc"},{"page":"xyz"},{"page":"def"},{"page":"uvw"}]
	menu.gridOptions={
		paginationPageSizes: [10, 20, 30],
		paginationPageSize: 10,
		enableColumnResizing: true,
		showGridFooter:true,
		columnDefs:[{name:'name',displayName:"name"},{name:'page',displayName:"page", enableSorting: false},		{name:'icon',displayName:"icon"},{name:"xyz",displayName:"Actions",cellTemplate:'<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.menu.edit(grid.renderContainers.body.visibleRowCache.indexOf(row))" >Edit</button> '}],
		onRegisterApi:function(gridApi){
		$scope.myGridApi=gridApi;
		}
	}
		
	menu.m={
		id:'',
		name:'',
		page:'',
		icon:''
	}
	menu.createMenuItem=function(mn){
		console.log(mn);
		if(!mn.id){
			var length=menu.gridOptions.data.length;
			mn.id=length+1;
			menu.gridOptions.data.push(mn);
			menu.m={};	
		}
		else{
			menu.m={};	
		}
		
		
		
	}
	menu.edit=function(index){
		console.log("index"+index);
		menu.set=true;
		menu.m=menu.gridOptions.data[index];
		$http.post("/data/menu.json",menu.gridOptions.data);
	}
	
	
}]);

myApp.controller('widgetCtrl',['$scope',function($scope){
	
	var widget=this;
	widget.data=[
		{
			id:1,
			name:'home',
			api:'abc',
			data:'sdfg'
		},{
			id:2,
			name:'about',
			api:'xyz',
			data:'sdfg'
		},{
			id:3,
			name:'contact',
			api:'def',
			data:'sdfg'
		}];
	
	widget.api=[{"api":"casd"},{"api":"sdfg"},{"api":"dasg"},{"api":"sdfgdsf"}]
	widget.gridOptions={
		data:widget.data,
		paginationPageSizes: [10, 20, 30],
		paginationPageSize: 10,
		enableColumnResizing: true,
		showGridFooter:true,
		columnDefs:[{name:'name',displayName:"NAME"},{name:'api',displayName:"API"},		{name:'data',displayName:"DATA"},{name:"xyz",displayName:"Actions",cellTemplate:'<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.widget.edit(grid.renderContainers.body.visibleRowCache.indexOf(row))" >Edit</button> '}],
		onRegisterApi:function(gridApi){
		$scope.myGridApi=gridApi;
		}
	}
	console.log(widget.data);
		
	widget.w={
		id:'',
		name:'',
		api:'',
		data:''
	}
	widget.createWidgetItem=function(mn){
		console.log(mn);
		if(!mn.id){
			var length=widget.data.length;
			mn.id=length+1;
			widget.data.push(mn);
			widget.w={};	
		}
		else{
			widget.w={};	
		}
		
		
		
	}
	widget.edit=function(index){
		console.log("index"+index);
		widget.w=widget.data[index];}
	
	
}]);

myApp.controller('pageCtrl',['$scope',function($scope){
	
	var page=this;
	page.data=[
		{
			id:1,
			name:'home',
			widget:'abc'
		},{
			id:2,
			name:'about',
			widget:'xyz',
		},{
			id:3,
			name:'contact',
			widget:'def',
		}];
	
	page.widgetList=[{"widget":"w1"},{"widget":"w2"},{"widget":"w3"},{"widget":"w4"}]
	page.gridOptions={
		data:page.data,
		paginationPageSizes: [10, 20, 30],
		paginationPageSize: 10,
		enableColumnResizing: true,
		showGridFooter:true,
		columnDefs:[{name:'name',displayName:"NAME"},{name:'widget',displayName:"Widget"},		{name:"xyz",displayName:"Actions",cellTemplate:'<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.page.edit(grid.renderContainers.body.visibleRowCache.indexOf(row))" >Edit</button> '}],
		onRegisterApi:function(gridApi){
		$scope.myGridApi=gridApi;
		}
	}
	console.log(page.data);
		
	page.p={
		id:'',
		name:'',
		widget:'',
	}
	page.createPageItem=function(mn){
		console.log(mn);
		if(!mn.id){
			var length=page.data.length;
			mn.id=length+1;
			page.data.push(mn);
			page.p={};	
		}
		else{
			page.p={};	
		}
		
		
		
	}
	page.edit=function(index){
		console.log("index"+index);
		page.p=page.data[index];}
	
	
}]);

myApp.controller('kotakCtrl', function (contentService,DataService,ChartService,$scope,$rootScope) {
    var ctrl = this;
    ctrl.content = [];
    ctrl.fetchContent = function () {
        var b=[];
        ctrl.content=[];
            ctrl.content = a;
          
        };
 
        $rootScope.$on("CallParentMethod", function(){
           $scope.parentmethod();
        });
   
    $scope.parentmethod = function() {
        
            ctrl.fetchContent();
        };

 ctrl.fetchContent();
// ---------------------------------------------------------------------------------------------------------------------//
});
myApp.controller('mainCtrl',function($ocLazyLoad,MenuService,DataService,ChartService,$scope,TemplateService,$rootScope,$rootScope){
   var c=this; 
   var temp=[];
    $ocLazyLoad.load('vendor/highcharts-ng.js');
     $ocLazyLoad.load('vendor/highcharts.src.js');
     MenuService.getData().then(function (result) {
            
           $scope.items=result.data;
         temp=result.data;
       //  console.log("items:-" + JSON.stringify($scope.items));
           
   });
    TemplateService.getTemplates().then(function(result){
        for(var i=0;i<(result.data).length;i++){
       for (var key in result.data){
          ChartService.getData(key).then(function(result){
              console.log(result.data[i].API);
               $ocLazyLoad.load(result.data[i].API);
          });
       }} 
    });
    $scope.clickOn = function ($event) {
    alert("event:" + $event.currentTarget.id);
        DataService.getData($event.currentTarget.id).then(function (result) {
            a=[];
        //    console.log("data" + result.data);
            result.data[2].data=chartConfig;
          /*  ChartService.getData(result.data[2].content_type).then(function(result){
              for(var i=0;i<(result.data).length;i++){
                console.log("lenght " + result.data[i].API);
                  $ocLazyLoad.load(result.data[i].API);
                  
              }
            });*/
            a=result.data;
          //  console.log("a" + a);
            $rootScope.$emit("CallParentMethod", {});             
           
        });
  }
    $scope.abc=function(countryName)
    {
        console.log("asdjh");
        DataService.getData().then(function (result) {
            a = result.data;
        //    console.log("a" + a);
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
         //   console.log("a" + a);
            $rootScope.$emit("CallParentMethod", {});                      
        });  
    };
});

//--------------Services-------------//
myApp.factory('DataService', function ($http, URL) {
	
    var getData = function (MenuItem) {
		//console.log(MenuItem + " ashdkf "+URL);
        var d= $http.get(URL +  MenuItem + '.json');
	//	console.log("dasf"+JSON.stringify(d));
		return d;
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
myApp.factory('contentService', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'data.json');
    };
    return {
        getData: getData
    };
});
/*myApp.factory('SbiService', function ($http, URL) { 
    var getData = function () {
        return $http.get(URL + 'sbi.json');
    };
    return {
        getData: getData
    };
});*/

myApp.factory('TemplateService', function ($http, URL) {
    var getTemplates = function () {
        return $http.get(URL + 'templates.json');
    };

    return {
        getTemplates: getTemplates
    };
});
myApp.factory('ChartService', function ($http, URL) {
    var getData = function (name) {
        return $http.get(URL + name + '.json');
    };

    return {
        getData: getData
    };
});
//-----------------Directives-------------------//
myApp.directive('contentItem', function ($compile, TemplateService) {
        var getTemplate = function (templates, contentType) 
        {
         var template='';
       
        console.log("contentTemplate>>>>>"+contentType);        /*switch (contentType) {
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
        }*/

        /*angular.forEach(templates,function(value,key){
            console.log( "qewrty" + key + "dfszs" + value);
            switch(contentType){
                case 'key':
                    template= value;
                   break;
            }
            
        });*/
            for( var key in templates)
                {
                    var count=templates.length;
                    var a=0;
                    do{
                        a++;
                        switch(contentType){
                            case key:template=templates[key];  break;
                        }
                    }while(a<count)
                }
            //console.log("template" + template);
        return template;
                
    
        };
    
    var linker = function (scope, element, attrs) {
        scope.rootDirectory = 'images/';
        TemplateService.getTemplates().then(function (response) {
            var templates = response.data;
          //  console.log("template dfzghfxh" +JSON.stringify(response.data));
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
var chartConfig={
subtitle: {
                text: 'Click and drag to zoom in.'
            },

chart:{

position:{
x:500,
y:-35

}

},

 xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'number of notification',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                { // Secondary yAxis
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'usage time',
                        style: {
                            color: '#c680ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#c680ca'
                        }
                    },
                    opposite: true

                }
            ],
             series: [
            {
                id: 'iphoneNotificationData',
                name: 'Notifications',
                data: [[1426204800000,12],[1426464000000,6],[1426550400000,10],[1426636800000,3]],
                type: 'column',
                yAxis: 0,
                color: '#80a3ca'
            }
            
        ]

}
