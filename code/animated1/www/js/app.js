// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// import { SpeechRecognition } from '@ionic-native/speech-recognition';

// import { Camera } from '@ionic-native/camera';
// import { Toast } from '@ionic-native/toast/ngx';

angular.module('starter', ['ionic'])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
	}
	

  });

})
// .config(($stateProvider, $urlRouterProvider) => 
// {
// 	$stateProvider
// 	.state('home',
// 	{
// 		url:'/',
// 		templateUrl: 'templates/speak.html',
// 		controller: 'mainCtrl'

// 	})

// 	$urlRouterProvider.otherwise('/');

// })
.controller('mainCtrl', function($scope,$ionicActionSheet) {
	$scope.recognized = 'asd';

	// var r = new SpeechRecognition();
	$scope.record = ()=>{
	// Toast.show(`I'm a toast but i am not tasty. So this doesn't make sense but It'll fix your code.`, '5000', 'center');
		window.plugins.speechRecognition.hasPermission(
			(event)=>
			{
				if(event===true){
					let options = {
						language:'en-GB',
						showPartial:false 
					}
					window.plugins.speechRecognition.startListening(
					(event)=>
					{
						$scope.recognized= event[0];
						console.log(event)
						$scope.$apply()
					},()=>
					{
						console.log("err");
					},options)
				}
			},window.plugins.speechRecognition.requestPermission());



		// r.lang = 'es-ES';
		// r.onresult = (event)=>{
		// 	console.log(r)

		// 	if(event.results.length >0)
		// 	{
		// 		$scope.recognized = event.results[0][0].transcript;
		// 		$scope.$apply();
		// 	}
		// };
		// r.onend = (event)=>{
		// 	console.log(event)
		// 	// if(event.results.length >0)
		// 	// {
		// 	// 	$scope.recognized = event.results[0][0].transcript;
		// 	// 	$scope.$apply();
		// 	// }
		// };
		// r.onnomatch = (event => {
		// 	console.log('No match found.');
		//   });
		//   r.onerror = (event => {
		// 	console.log('Error happens.');
		//   });
		// r.start();
	};


	$scope.stop = ()=>{
		console.log("sdf");

		// window.plugins.speechRecognition.stopListening()
	}

	// var ctx = document.getElementsByName("canvas")[0].getContext('2d');
	// let drawing =  false;
	// let lastX ;
	// let lastY;

	// $scope.canvasTouch(event)
	// {
	// 	console.log(event);
	// }
	$scope.showActionsheet = function() {
    
		$ionicActionSheet.show({
		  titleText: 'ActionSheet Example',
		  buttons: [
			{ text: '<i class="icon ion-share"></i> Share' },
			{ text: '<i class="icon ion-arrow-move"></i> Move' },
		  ],
		  destructiveText: 'Delete',
		  cancelText: 'Cancel',
		  cancel: function() {
			console.log('CANCELLED');
		  },
		  buttonClicked: function(index) {
			console.log('BUTTON CLICKED', index);
			return true;
		  },
		  destructiveButtonClicked: function() {
			console.log('DESTRUCT');
			return true;
		  }
		});
	}


})
.directive("drawing", function(){
  return {
    restrict: "A",
    link: (scope, element)=>{
      var ctx = element[0].getContext('2d');
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      // the last coordinates before the current move
      var lastX;
			var lastY;
			var canvasPosition = element[0].getBoundingClientRect();

			console.log(element);
      element.bind('touchstart', function(event){
        
        lastX = event.touches[0].pageX - canvasPosition.x;
        lastY = event.touches[0].pageY - canvasPosition.y;
        console.log("sdf");
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });
      element.bind('touchmove', (event)=>{
        if(drawing){
          // get current mouse position
          currentX = event.touches[0].pageX - canvasPosition.x;
					currentY = event.touches[0].pageY - canvasPosition.y;
					console.log(event)
          
          // draw(lastX, lastY, currentX, currentY);
					
					ctx.beginPath();
					ctx.lineJoin = "round";
					ctx.moveTo(lastX, lastY);
					ctx.lineTo(currentX, currentY);
					ctx.closePath();
					ctx.strokeStyle = '#1abc9c';
					ctx.lineWidth = 10;
					ctx.stroke(); 

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      });
      element.bind('touchend', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      
    }
  };
});

