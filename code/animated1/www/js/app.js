// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var number = 2;
angular.module('starter', ['ionic','ngAnimate'])//,'ngFitText'])

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
	
	KioskPlugin.isInKiosk(function(isInKiosk){console.log(isInKiosk) });
	KioskPlugin.setAllowedKeys([ 24, 25 ]);
	window.addEventListener("volumebuttonslistener", onVolumeButtonsListener, false);
	



	function onVolumeButtonsListener(info){
		console.log("Button pressed: " + info.signal);
		KioskPlugin.exitKiosk();

	}
	// fitText(document.getElementsByName('h1'))
	// fitty('#fittext');


  });
})
.config(($stateProvider, $urlRouterProvider) => 
{
	$stateProvider
	
	.state('home',{
		url:'/home',
		// cache:false,
		templateUrl:'templates/home.html'
	})

	.state('draw',
	{
		url:'/draw',
		// cache: false,
		templateUrl: 'templates/draw.html',
	})
	.state('swipe',
	{
		url:'/swipe',
		// cache: false,
		// controller:'	',
		templateUrl:'templates/slide.html'	
	})



	$urlRouterProvider.otherwise('/home');
})
.controller('mainCtrl', function($scope,$ionicSlideBoxDelegate,$animate,$ionicActionSheet) {
	// $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
	console.log('sdsf');
	
	var myElement = document.querySelector('body');
	var mc = new Hammer.Manager(myElement);
	var pinch = new Hammer.Pinch();
	mc.add([pinch]);
	console.log($animate)

	// $animate.addClass(document.querySelector('#maintext'),'scroll');

	$scope.slidesHasChanged = function(){

		$ionicSlideBoxDelegate.update();

	};

	// split("hi how are you nam");

if(document.getElementById('autoscroll')!== null){
		document.getElementById('autoscroll').stop();
		document.getElementById('autoscroll').style.display="none";
		document.getElementById('autoscroll2').style.display='block';
	document.querySelector("#maintext").style.fontSize="25vw";
}

	$scope.split= function split(str, number)
	{
		let words = str.split(' ');
		if (words.length <= number)
			return str;
	
		let iteration = words.length / number;
		let returnElement = [];
		for (let index = 0; index <= iteration; index++) 
		{
			returnElement.push(words.splice(0,number).join(" "))
		}
		return returnElement;
	}

	mc.on("pinchin", function(ev) {
		document.querySelector("#maintext").style.fontSize;
		let fontSize=document.querySelector("#maintext").style.fontSize;
		let size = parseFloat (fontSize);
		if(size > 10)
		size=size-0.3;
		if(number > 0)
			number--;
		$scope.items= $scope.split(event[0],number);
		console.log(items)
		slidesHasChanged()
		$scope.$apply()

		document.querySelector("#maintext").style.fontSize=size +"vw";
	});

	mc.on("pinchout", function(ev) {
		let fontSize=document.querySelector("#maintext").style.fontSize;
		let size = parseFloat (fontSize);
		if(size<30)
		size=size+0.3;
		// if(number > 0)
		number++;
		
		$scope.items= $scope.split(event[0],number);
		console.log(items)
		slidesHasChanged()
		$scope.$apply()

		document.querySelector("#maintext").style.fontSize=size +"vw";
	});
	$ionicActionSheet.show({
		titleText: 'Press micrphone button to begin'});

	$scope.stopScroll =()=>{
		
    if(document.getElementById('b1').innerText=="Start Scrolling"){
    	document.getElementById('b1').innerText="Stop Scrolling";
			document.getElementById('autoscroll').start();
			document.getElementById('autoscroll').style.display='inline';
			document.getElementById('autoscroll2').style.display='none';
		}
		else
		{
    document.getElementById('b1').innerText="Start Scrolling";
		document.getElementById('autoscroll').stop();
		document.getElementById('autoscroll').style.display="none";
		document.getElementById('autoscroll2').style.display='block';

    }
	}

	$scope.recognized = 'Hello my name is jam';
	
	$scope.number= 2;


	$scope.items = $scope.split($scope.recognized,2);

	
	$scope.record = ()=>{
		window.plugins.speechRecognition.hasPermission(
		(event)=> {
			if(event === true) {
				let options = {
					language:'en-GB',
					prompt:'Speak and see the words',
					// showPopup :false ,
					showPartial:false 
				}
				window.plugins.speechRecognition.startListening(
				(event)=>{
					$scope.recognized= event[0];
					$scope.items= $scope.split(event[0],number);
					$scope.slidesHasChanged();
					$scope.$apply()
					console.log(items)
				}, ()=> {
					window.plugins.toast.show('Please press button and speak into the device', 'long', 'bottom', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
				},options)
			}
		},window.plugins.speechRecognition.requestPermission());
	};
	
	// if ( $scope.slider ){
  //   $scope.slider.updateLoop();
	// }
	
	// $scope.applyText = function (text){
	// 	let textfield = document.querySelector('#fittext');

	// 	text.forEach(element => {
	// 		textfield.innerHTML = '<p>Hello World!</p>';

	// 		"<ion-slide-page  style='text-align:center;'><h1>"+element+"</h1></ion-slide-page>"
	// 	});
	// }

	$scope.showActionsheet = function() {
    
		$ionicActionSheet.show({
		  titleText: 'Press micrphone button to begin',
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



	





$scope.options = {
	loop: false,
	// effect: 'fade',
	spaceBetween: 100,

	speed: 500,
	// autoHeight:true
}
$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
	// data.slider is the instance of Swiper
	if(window.plugins.toast!==undefined) window.plugins.toast.show('Swipe Right and Left', 'long', 'center', function(a){}, function(b){})

	$scope.slider = data.slider;
	// console.log(data);
});
$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
	console.log('Slide change is beginning');
});
$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
	// note: the indexes are 0-based
	$scope.activeIndex = data.slider.activeIndex;
	$scope.previousIndex = data.slider.previousIndex;
});

})
.controller('drawCtrl',($scope) =>
{
	$scope.reset = function(){
		let canvas = document.querySelector('canvas');
			canvas.width = canvas.width; 
	 }
})
.controller('swipeCtrl',function($scope, $ionicActionSheet) {
		// $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
		// $ionicActionSheet.show({
		//   titleText: 'Press and hold the button to record',});
		window.plugins.toast.show('Swipe Right and Left', 'long', 'center', function(a){}, function(b){})

})
.directive("drawing", function(){
  return {
    restrict: "A",
    link: (scope, element)=>{
			var ctx = element[0].getContext('2d');
			var drawing = false;
			// console.log(element);
      
      var lastX;
			var lastY;
			element[0].width = window.innerWidth;
			element[0].height = window.innerHeight;
			let canvasPosition = {x:0,y:0};

			console.log(element);
			console.log(canvasPosition);
			// scope.$();
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
				// event.preventDefault();

				// console.log(event.touches[0]);
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
        
      });
  
      element.bind('touchend onmouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
    }
  };
});
// function s(text){
// 	let textfield = document.querySelector('#fittext');

// 	text.forEach(element => {
// 		textfield.insertAdjacentHTML ('beforeend',"<ion-slide-page  style='text-align:center;'><h1>"+element+"</h1></ion-slide-page>")
// 	});
// }


