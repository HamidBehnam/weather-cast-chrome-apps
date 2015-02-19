/**
 * 
 */
(function () {
	angular.module("filters", [])
	.filter("capitalize", [function() {
		return function (input) {
			var words = [];
			words = input.split(" ");
			
			for (var index = 0; index < words.length; ++index) {
				words[index] = words[index].charAt(0).toUpperCase() + words[index].slice(1);
			}
			
			return words.join(" ");
		}
	}])
})();