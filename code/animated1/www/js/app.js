// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
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
.config(($stateProvider, $urlRouterProvider) => 
{
	$stateProvider
	
	.state('home',{
		url:'/home',
		templateUrl:'templates/home.html'
	})

	.state('draw',
	{
		url:'/draw',
		templateUrl: 'templates/draw.html',
	})

	$urlRouterProvider.otherwise('/home');
})
.controller('mainCtrl', function($scope,$ionicActionSheet) {
	var myElement = document.querySelector('body');
	var mc = new Hammer.Manager(myElement);
	var pinch = new Hammer.Pinch();
	mc.add([pinch]);
	document.querySelector("h1").style.fontSize="25vw";

	mc.on("pinchin", function(ev) {
		document.querySelector("h1").style.fontSize;
		let fontSize=document.querySelector("h1").style.fontSize;
		let size = parseFloat (fontSize);
		size=size-1;
		document.querySelector("h1").style.fontSize=size +"vw";
	});

	mc.on("pinchout", function(ev) {
		let fontSize=document.querySelector("h1").style.fontSize;
		let size = parseFloat (fontSize);
		size=size+1;
		document.querySelector("h1").style.fontSize=size +"vw";
	});

	$scope.recognized = 'asd';

	$scope.record = ()=>{
		window.plugins.speechRecognition.hasPermission(
		(event)=> {
			if(event === true) {
				let options = {
					language:'en-GB',
					showPartial:false 
				}
				window.plugins.speechRecognition.startListening(
				(event)=>{
					$scope.recognized= event[0];
					console.log(event)
					$scope.$apply()
				}, ()=> {
					window.plugins.toast.show('Please press button and speak into the device', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
				},options)
			}
		},window.plugins.speechRecognition.requestPermission());
	};

	$scope.showActionsheet = function() {
    
		$ionicActionSheet.show({
		  titleText: 'Press and hold the button to record',
		  // buttons: [
			// { text: '<i class="icon ion-share"></i> Share' },
			// { text: '<i class="icon ion-arrow-move"></i> Move' },
		  // ],
		  // destructiveText: 'Delete',
		  cancelText: 'Press and hold the button to record',
		  // cancel: function() {
		  // }
		});
	}


})
.controller('drawCtrl',($scope) =>
{
	$scope.reset = function(){
		let canvas = document.querySelector('canvas');
			canvas.width = canvas.width; 
	 }
})
.directive("drawing", function(){
  return {
    restrict: "A",
    link: (scope, element)=>{
			var ctx = element[0].getContext('2d');
			var drawing = false;
			console.log(element);
      
      var lastX;
			var lastY;
			let canvasPosition = element[0].getBoundingClientRect();
			element[0].width = window.screen.width - canvasPosition.x 
			element[0].height = window.screen.height - canvasPosition.y 
			console.log(canvasPosition);
			element[0].bind('touchstart', function(event)
			{ 
        lastX = event.touches[0].pageX - canvasPosition.x;
        lastY = event.touches[0].pageY - canvasPosition.y;
       // draw a new line
        ctx.beginPath();
				console.log("start",event.touches[0].pageX);
        drawing = true;
      });
      element[0].bind('touchmove', (event)=>{
				event.preventDefault();

				console.log(event.touches[0]);
        if(drawing){
					// console.log("draw",event.touches[0]);
          // get current mouse position
          currentX = event.touches[0].pageX - canvasPosition.x;
					currentY = event.touches[0].pageY - canvasPosition.y;
					console.log("postion",	currentX, currentY);	
					console.log( "offset",	canvasPosition.x,"y :",canvasPosition.y);	
					ctx.beginPath();
					ctx.lineJoin = "round";
					// ctx.lineCap = "round"
					ctx.moveTo(lastX, lastY);
					ctx.lineTo(currentX, currentY);
					ctx.closePath();
					// ctx.strokeStyle = '#1abc9c';
					ctx.strokeStyle = '#1abc9c';
					ctx.lineWidth = 10;
					ctx.stroke(); 

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      },{passive:true});
  
      element[0].bind('touchend onmouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
    }
  };
});

