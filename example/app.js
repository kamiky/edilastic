var app = angular.module('myApp', [
	'edilastic',
	])
.controller('MainCtrl', ['$scope', '$rootScope',
	function ($scope, $rootScope) {
		$scope.firstTemplate=  '<div class="template template1" edilastic="firstContent" onconfirm="update(firstContent)"> '+
			'{{firstContent}}'+
		'</div>';
		$scope.firstContent = "My default content is awesome."
		$scope.update = function(content){
			$scope.i1 = "confirm : "+content;
			//console.log('update('+content+')');
			// ajax request
		}

		$scope.secondTemplate = '<div class="template template2" edilastic="secondContent" onconfirm="update2(secondContent)" type="textarea">'+
			'{{secondContent}}'+
		'</div>';
		$scope.secondContent = "I'm a little poney.I'm a little poney.I'm a little poney.";
		$scope.open2 = function(){
			$scope.i2 = "opened !";
		}
		$scope.update2 = function(content){
			$scope.i2 = "confirm : "+content;
		}

		$scope.thirdContent = "Ny name is : ";
		$scope.thirdTemplate = '<div class="template template3" edilastic="thirdContent" onconfirm="update3(thirdContent)" onclose="close3()" shut="button">'+
			'{{thirdContent}}'+
		'</div>';
		$scope.close3 = function(){
			$scope.i3 = "close : i dont have name :(";
		}
		$scope.update3 = function(content) {
			$scope.i3 = "confirm : "+content;
		}
	}]);