// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var number = 2;
var s;
angular.module('starter', ['ionic'])//,'ngFitText'])

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

		screen.orientation.lock('landscape').then(function(obj) {
			// console.log(obj);
	}, function(obj) {
			// console.log(obj);
	})
	if(window.plugins!==undefined){
		KioskPlugin.isInKiosk(function(isInKiosk){console.log(isInKiosk) });
		KioskPlugin.setAllowedKeys([ 24, 25 ]);
	}
	window.addEventListener("volumebuttonslistener", onVolumeButtonsListener, false);
	// this is for test - to get out kiosk mode if the tester is stuck.
	function onVolumeButtonsListener(info){
		console.log("Button pressed: " + info.signal);
		KioskPlugin.exitKiosk();

	}


	window.addEventListener('native.keyboardshow', function(){
		window.Keyboard.hide();
	});

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
.controller('mainCtrl', function($scope,Holder) {
	
	var myElement = document.querySelector('body');
	var mc = new Hammer.Manager(myElement);
	var pinch = new Hammer.Pinch();
	mc.add([pinch]);
 

		document.getElementById('autoscroll').style.display="none";
		document.getElementById('autoscroll2').style.display='block';

		let main = document.getElementsByTagName("h1");
		for (let i = 0; i < main.length; i++) {
			main[i].style.fontSize="25vw";
		}

	mc.on("pinchin", function(ev) {

		let fontSize=document.getElementById("maintext").style.fontSize;
		let size = parseFloat (fontSize);
		if(size > 10)
		size=size-0.3;


		let main = document.getElementsByTagName("h1");
		for (let i = 0; i < main.length; i++) {
			main[i].style.fontSize=size +"vw";
		}
	});

	mc.on("pinchout", function(ev) {
		let fontSize=document.getElementById("maintext").style.fontSize;
		
		let size = parseFloat (fontSize);
		if(size<40)
		size=size+0.3;
		
		let main = document.getElementsByTagName("h1");
		for (let i = 0; i < main.length; i++) {
			main[i].style.fontSize=size +"vw";
		}
		let input = document.getElementsByTagName("input");
		for (let i = 0; i < input.length; i++) {
			input[i].style.fontSize=size +"vw";
		}
	});
	
	$scope.stopScroll =()=>{
		console.log('button presse')
    if(document.getElementById('b1').innerText=="Start Scrolling"){
    	document.getElementById('b1').innerText="Stop Scrolling";
			document.getElementById('autoscroll').style.display='inline';
			document.getElementById('autoscroll2').style.display='none';
		}
		else
		{
    document.getElementById('b1').innerText="Start Scrolling";
		// document.getElementById('autoscroll').stop();
		document.getElementById('autoscroll').style.display="none";
		document.getElementById('autoscroll2').style.display='block';
		}	
	}

	$scope.recognized = Holder.value;
	
	$scope.record = ()=>{
		window.plugins.speechRecognition.hasPermission(
		(event)=> {
			if(event === true) {
				let options = {
					language:'en-GB',
					prompt:'Speak and see the words',
					// showPopup :false ,
					showPartial:true 
				}
				window.plugins.speechRecognition.startListening(
				(event)=>{
					$scope.recognized= event[0];
					Holder.value = event[0];
					document.getElementsByTagName('input').value= event[0];

					$scope.$apply()
				}, ()=> {
					window.plugins.toast.show('Please press button and speak into the device', 'long', 'bottom', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
				},options)
			}
		},window.plugins.speechRecognition.requestPermission());
	};
	
})
.controller('drawCtrl',($scope) =>
{
	if(window.plugins!== undefined) 
		window.plugins.toast.show('Drag finger to draw', 'long', 'bottom', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
	$scope.reset = function(){
		let canvas = document.querySelector('canvas');
			canvas.width = canvas.width; 
	 }
})
.directive("drawing", function(){
  return {
    restrict: "A",
    link: (scope, element) => {
			var ctx = element[0].getContext('2d');
			var drawing = false;
      
      var lastX;
			var lastY;
			element[0].width = window.innerWidth;
			element[0].height = window.innerHeight;
			let canvasPosition = {x:0, y:0};

			element.bind('touchstart onmousedown', function(event)
			{ 			 
				canvasPosition = document.querySelector('canvas').getBoundingClientRect()

        lastX = event.touches[0].pageX - canvasPosition.x;
        lastY = event.touches[0].pageY - canvasPosition.y;
       // draw a new line
        ctx.beginPath();
				console.log("start",event.touches[0].pageX);
        drawing = true;
      });
      element.bind('touchmove onmousemove', (event)=>{
				event.preventDefault();

				if(drawing){
          // get current mouse position
          currentX = event.touches[0].pageX - canvasPosition.x;
					currentY = event.touches[0].pageY - canvasPosition.y;

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
      });
  
      element.bind('touchend onmouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
    }
  };
})
.factory('Holder', function() {
  return {
    value: 'Hi how are you'
	};
});
