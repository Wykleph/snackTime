angular
    .module('trumpsNuts')
    .controller('landingController', landingController);

landingController.$inject = ['$scope', '$log', '$routeParams', '$location', '$rootScope', 'dataModel', 'server'];

/* @ngInject */
function landingController($scope, $log, $routeParams, $location, $rootScope, dataModel, server) {

	//define view model variable
	var vm = this;
	vm.model = dataModel;

	//watchers
	$scope.$watch('vm.model.shipping.address.zip', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.zip = current;
	});
	
	$scope.$watch('vm.model.shipping.address.city', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.city = current;
	});
	
	$scope.$watch('vm.model.shipping.address.state', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.state = current;
	});
	
	$scope.$watch('vm.model.shipping.address.street1', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.street1 = current;
	});
	
	$scope.$watch('vm.model.shipping.address.street2', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.street2 = current;
	});	
	
	$scope.$watch('vm.model.shipping.address.street3', function(current, original) {
		if(vm.model.copyShippingAddress) vm.model.billing.address.street3 = current;
	});	

	//view model methods
	vm.copyShippingAddress = function(btnState) {
		//$log.info('copying', vm.model.shipping);
		if(btnState) vm.model.billing.address = vm.model.shipping.address;
		else vm.model.billing.address = dataModel.billing.address;
	}

	vm.submitForm = function(value) {
		$log.info('submitting', value);

		server.submitSale(vm.model).then(function(response) {

			$log.info(response);

			//when the promise resolves, re-route them
			$location.path('/confirmation/?tesing=goodTest');
			$rootScope.$apply();

		}).catch(function(error) {

			$log.info(error);
		});

		//take them immediatly to the processing page
		$location.path('/processing');

	}
}	