	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute','youtube-embed']);
	scotchApp.run(function($rootScope) {
		$rootScope.maListe = [];
	});

	scotchApp.service('ListManager', function(){
		this.addToList =function (x) {
			return $rootScope.maListe.concat(x);
		}
	})

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : '../pages/copy/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : '../pages/copy/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : '../pages/copy/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http, ListManager) {
		// create a message to display in our view
		$scope.message = 'Je propose des metiers et attend le feedback utilisateur';
		$http.get("http://localhost:8000/data.json")
			.then(function(response) {
				$scope.infos = response.data;
			});
		$scope.idJob=0;
		$scope.knowmoreFlag=false;
		$scope.playerVars = {
			controls: 0,
			autoplay: 1
		};

		$scope.changeJob= function () {
			$rootScope.maListe=ListManager.addToList(infos[idJob]);
			$scope.idJob=($scope.idJob==$scope.infos.length-1 ? 0 : $scope.idJob+1);
			$scope.knowmoreFlag=false;
		};
		$scope.knowmore=function () {
			$scope.knowmoreFlag=($scope.knowmoreFlag==true ? false : true);
			$scope.apply()
		};
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Je resume les aspirations qui ont été envisagées à partir des actions de l\'utilisateur';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Je suis la liste des métiers pour lesquels l\'utilisateur a montré de l\'intérêt';
	});