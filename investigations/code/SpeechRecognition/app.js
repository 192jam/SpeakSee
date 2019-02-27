angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  1
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
     StatusBar.styleDefault();
	}});

})
.controller('mainCtrl', function($scope,$ionicActionSheet) 
{
	$scope.recognized = 'asd';

	$scope.record = ()=>
	{
		window.plugins.speechRecognition.hasPermission(
			(event)=>
			{
				if(event===true)
				{
					let options = {
						language:'en-GB',
						showPartial:false 
					}
					window.plugins.speechRecognition.startListening(					(event)=>
					{
						$scope.recognized= event[0];
						console.log(event)
						$scope.$apply()
					},()=> {
						console.log("err");
					},options)
				}
			},window.plugins.speechRecognition.requestPermission());
	};
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
