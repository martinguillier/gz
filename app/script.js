	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute','youtube-embed']);
	scotchApp.run(function($rootScope) {
		$rootScope.maListe = [];
	});

	scotchApp.service("profile", function Profile() {
		var profile=this;

		profile.myJobs='{"id":"test"}';
	});
	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/pagesBis/home.html',
				controller  : 'startCtrl'
			})

			// route for the about page
			.when('/questions', {
				templateUrl : 'pages/pagesBis/questionnaire.html',
				controller  : 'QuestionnaireCtrl'
			})

			// route for the contact page
			.when('/jobs', {
				templateUrl : 'pages/pagesBis/job.html',
				controller  : 'JobCtrl'
			})
			.when('/profile', {
				templateUrl : 'pages/pagesBis/profile.html',
				controller  : 'ProfileCtrl'
			})
		;
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('JobCtrl', function($scope, $http, $location, profile) {
		// create a message to display in our view
		$scope.message = 'Je propose des metiers et attend le feedback utilisateur';
		$http.get("http://localhost:8000/data.json")
			.then(function(response) {
				$scope.infos = response.data;
			});
		$scope.idJob=0;
		$scope.myJobs=profile;

		$scope.changeJob= function () {
			$scope.myJobs='{"id":"allo"}';
			if ($scope.idJob==3){
				$location.path('/profile');
			}
			$scope.idJob=$scope.idJob+1;

		};

	});

	scotchApp.controller('QuestionnaireCtrl', function($scope, $http, $location) {
		$scope.message = 'Je resume les aspirations qui ont été envisagées à partir des actions de l\'utilisateur';
		$http.get("http://localhost:8000/questionnaire.json")
			.then(function(response) {
				$scope.steps = response.data;
			});
		$scope.idStep=0;
		$scope.nextStep= function () {
			if($scope.idStep==$scope.steps.length-1){
				$location.path('/jobs');
			}
			$scope.idStep= $scope.idStep+1;
		};
	});

	scotchApp.controller('startCtrl', function($scope, $location) {
		$scope.message = 'Salut ! On va essayer de trouver ensemble quelles sont tes aspirations et les métiers qui pourraient y être associés';
		$scope.goTo=function (path) {
			 $location.path(path);

		}
	});

	scotchApp.controller('ProfileCtrl', function($scope, $location, $http, profile) {
		$scope.message = 'Avec ce que tu nous as dit sur toi, regarde ce qu\'on t\'a concocté';

		$scope.myJobs=profile;
		$scope.goTo=function (path) {
			$location.path(path);
		}
		$http.get("http://localhost:8000/data.json")
			.then(function(response) {
				$scope.myJob = response.data;
			});
		$scope.knowmore=function () {
			$scope.knowmoreFlag=($scope.knowmoreFlag==true ? false : true);
			$scope.apply()
		};
		$scope.playerVars = {
			controls: 1,
			autoplay: 0
		};
		$scope.knowmoreFlag=false;
	});