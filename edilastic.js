var app = angular.module('edilastic', []);

var settings = {
	attrs: {
		/* 
		** 'button' : hide edilastic with button click
		** 'window' : automatically close edilastic input by clicking outside of element
		*/
		shut:'window',
		/*
		** external is an array of id
		** associated with close:'window', the input will close only if mouse click is triggered
		** outside of the input + list of objects represented by external array
		*/
		external: null,

		/*
		** 'input' : element replaced by input (default)
		** 'textarea' : element replaced by textarea
		** accessible through DOM attributs : options or type (attrs.type will overwrite attrs.options)
		*/
		type:'input',

		/*
		** enable auto resize (only for textarea) when writing multiple line
		*/
		elastic:true,
		/*
		** define an input/textarea id
		*/
		tid:null,
		/*
		** Clone : Copy class names
		*/
		clone:true,
	},
	options: {
		/*
		** default confirm / cancel button templates
		** only if close == button
		*/
		confirmTemplate:"<button type=\"button\" class=\"btn-edilastic btn-confirm\">Confirm</button>",
		cancelTemplate:"<button type=\"button\" class=\"btn-edilastic btn-cancel\">Cancel</button>",
		/*
		** default edilastic input / textarea templates
		*/
		textareaTemplate:"<textarea class=\"edilastic-open\"></textarea>",
		inputTemplate:"<input class=\"edilastic-open\"/>",
	}
};

app.directive('edilastic', ['$window', '$timeout', function ($window, $timeout) {
	return {
		restrict: 'A',
		scope : {
			value: "=edilastic", // model
			onconfirm: "&",
			onopen: "&",
			onclose:"&",
		},
		compile: function(iElement, attr){
			var originalClassNames = iElement.attr('class');
			return function ($scope, element, attrs) {
				function EdilasticDirective() {
					if (!$scope.value) {
						throw "Error : no scope model is assigned to the edilastic directive (e.g <div edilastic=\"model\"> is required)";
					}
					var self = this;
					var options = $scope.$eval(attrs.options);
					angular.extend(this, settings.attrs, settings.options, options, {
						isHover:false,
						isOpen:false,
					});
					for (var key in settings.attrs) {
						if (attrs[key]) self[key] = $scope.$eval(attrs[key]) || attrs[key];
					}
					console.log(this);
					$timeout(function(){self.initialize()}, 0);
				}

				EdilasticDirective.prototype.initialize = function() {
					var self = this;
					if (self.type == "textarea")
						self.input = angular.element(self.textareaTemplate);
					else
						self.input = angular.element(self.inputTemplate);
					if (self.tid) {
						self.input.attr('id', self.tid);
					}
					if (self.clone == true) {
						console.log('clone...');
						self.input.addClass(originalClassNames);
					}
					self.form = angular.element("<form class=\"edilastic-form\" style=\"display:none; margin:0px\"></form>");
					self.form.append(self.input);
					self.input.on("blur keyup change", self.resize);
					element.after(self.form);
					if (self.shut == 'window') {
						var array = [];
						if (self.external && !Array.isArray(self.external))
							var array = [self.external];
						else if (self.external && Array.isArray(self.external))
							var array = self.external;
						array.forEach(function (item){
							var ee = angular.element(document.getElementById(item));
							ee.on('mouseenter', function(){self.isHover=true;});
							ee.on('mouseleave', function(){self.isHover=false;});   
						});
						element.on('mouseenter', function(){self.isHover=true;});
						element.on('mouseleave', function(){self.isHover=false;});
						element.next().children().on('mouseenter', function(){self.isHover=true;});
						element.next().children().on('mouseleave', function(){self.isHover=false;});
						angular.element($window).on('click',function(){
							if (self.isHover == true)
								self.open();
							else if (!self.isHover && self.isOpen)
								self.confirm();
						});
					} else if (self.shut == 'button' ) {
						element.on('click', self.open);
						var groupBtn = angular.element("<div class=\"form-group edilastic-group\"></div>");
						var confirmBtn = angular.element(self.confirmTemplate);
						var cancelBtn = angular.element(self.cancelTemplate);
						self.form.append(groupBtn);
						groupBtn.append(confirmBtn);
						groupBtn.append(cancelBtn);
						confirmBtn.on('click', self.confirm);
						cancelBtn.on('click', self.close);
					} else {
						throw "Error: close value unknown. ("+self.shut+")";
					}
				}

				EdilasticDirective.prototype.resize = function() {
					if (self.type == "textarea" && self.elastic == true) {
						self.input[0].style.height = "" + self.input[0].scrollHeight + "px";
					}
				}

				EdilasticDirective.prototype.open = function() {
					if (self.isOpen)
						return ;
					self.isOpen = true;
					self.input.val($scope.value);
					$timeout(self.resize, 0);
					self.form.css('display', '');
					element.css('opacity',0);
					// prevent page scroll up bug
					$timeout(function(){element.css('display', 'none');},0);
					if ($scope.onopen && typeof $scope.onopen == "function") {
						$scope.$apply(function(){$scope.onopen();});
					}
				}

				EdilasticDirective.prototype.close = function() {
					self.form.css('display', 'none');
					element.css('opacity',1);
					element.css('display', '');
					self.isOpen = false;
					if ($scope.onclose && typeof $scope.onclose == "function") {
						$scope.$apply(function(){$scope.onclose();});
					}
				}

				EdilasticDirective.prototype.confirm = function() {
					if (self.input.val() == $scope.value)
						return self.close();
					$scope.$apply(function (){
						$scope.value = self.input.val();
					});
					self.close();
					if ($scope.onconfirm && typeof $scope.onconfirm == "function") {
						$scope.$apply(function() {$scope.onconfirm();});
					}
				}

				var self = new EdilasticDirective();
			};
		}
	}
}]);
