angular.module('app', [])
.directive('dScrollHorizontally', function(){
	return {
		restrict: 'A',
		link: function(scope, elem, attr){
			scope.scrollToRight = function(){
				elem[0].scrollLeft += Number(attr.dScrollHorizontally);	
			}
			
			scope.scrollToLeft = function(){
				elem[0].scrollLeft -= Number(attr.dScrollHorizontally);	
			}
			
		}
	}
})