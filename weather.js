/**
 * Created by Hamid on 1/24/2015.
 */

(function () {
    var weatherModuleReference = angular.module("weather", ["angular-loading-bar", "ngAnimate", "filters"]);

    weatherModuleReference.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

    weatherModuleReference.controller("weatherController", ["$http", function($http) {
        this.location = "San Francisco";
        this.weathers = [];
        //this.getData = function () {
        //    $http.get("/weather", {params: {location: this.location}}).success(function (data) {
        //        ref.weathers = data;
        //    });
        //};
    }]);

    weatherModuleReference.controller("searchController", ["$http", function ($http) {
        this.location = "San Francisco";
        var refThis = this;
        this.getData = function (pointer) {
            $http({url: "http://weathercast.hamidev.com/weather", method: "get", params: {location: this.location}, cache: false}).success(function (data) {
                pointer.weathers = data;
                pointer.location = refThis.location;
            });
        };
    }]);

    weatherModuleReference.directive("enterAction", function () {
        return {
            restrict: "A",
            link: function (scop, element, attrs) {
                element.on("keydown", function (event) {
                    if (event.keyCode == 13) {
                        jQuery("#goButton").click();
                    }
                });
            }
        };
    });

    weatherModuleReference.directive("addIcon", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var day = JSON.parse(attrs.addIcon);
                var theCondition = day.condition.toLowerCase();
                var skycons = new Skycons({"color": "orange"});
                scope.$evalAsync(function () {
                    if (theCondition.indexOf("clear throughout the day.") != -1) {
                        skycons.add(element.attr("id"), Skycons.CLEAR_DAY);
                    } else if (theCondition.indexOf("clear throughout the night.") != -1) {
                        skycons.add(element.attr("id"), Skycons.CLEAR_NIGHT);
                    } else if (theCondition.indexOf("partly cloudy") != -1 ||
                        theCondition.indexOf("overcast") != -1) {
                        if (theCondition.indexOf("day") != -1 || theCondition.indexOf("afternoon") != -1 ||
                            theCondition.indexOf("morning") != -1)
                            skycons.add(element.attr("id"), Skycons.PARTLY_CLOUDY_DAY);
                        else if (theCondition.indexOf("evening") != -1 || theCondition.indexOf("overnight") != -1)
                            skycons.add(element.attr("id"), Skycons.PARTLY_CLOUDY_NIGHT);
                    } else if (theCondition.indexOf("mostly cloudy") != -1) {
                        skycons.add(element.attr("id"), Skycons.CLOUDY);
                    } else if (theCondition.indexOf("drizzle") != -1 || theCondition.indexOf("rain") != -1) {
                        skycons.add(element.attr("id"), Skycons.RAIN);
                    } else if (theCondition.indexOf("mixed") != -1) {
                        skycons.add(element.attr("id"), Skycons.SLEET);
                    } else if (theCondition.indexOf("snow") != -1) {
                        skycons.add(element.attr("id"), Skycons.SNOW);
                    } else if (theCondition.indexOf("breezy") != -1) {
                        skycons.add(element.attr("id"), Skycons.WIND);
                    } else
                        skycons.add(element.attr("id"), Skycons.CLOUDY);
                    skycons.play();
                });
            }
        };
    });
})();


