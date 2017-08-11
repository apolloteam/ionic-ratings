//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla/ionic-ratings
//rajeshwar.patlolla@gmail.com

(function () {
  'use strict';
  angular.module('ionic-ratings', ['ionic'])
    .directive('ionicRatings', ionicRatings);

  function ionicRatings() {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
      '</div>',
      scope: {
        ratingsObj: '=ratingsobj',
        index: '=index'
      },
      link: function (scope, element, attrs) {

        //Setting the default values, if they are not passed
        function setupValue(ratingsObj, updateRating) {
          scope.iconOn = ratingsObj.iconOn || 'ion-ios-star';
          scope.iconOff = ratingsObj.iconOff || 'ion-ios-star-outline';
          // scope.iconOnColor = ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
          // scope.iconOffColor = ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
          if (updateRating) {
            scope.rating = ratingsObj.rating || 0;
          }

          scope.minRating = ratingsObj.minRating || 0;
          scope.readOnly = ratingsObj.readOnly || false;
          scope.index = scope.index || 0;

          //Setting the color for the icon, when it is active
          scope.iconOnColor = {
            color: ratingsObj.iconOnColor || 'rgb(200, 200, 100)'
          };

          //Setting the color for the icon, when it is not active
          scope.iconOffColor = {
            color: ratingsObj.iconOffColor || 'rgb(200, 100, 100)'
          };
        }

        setupValue(scope.ratingsObj, true);

        //Setting the rating
        scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

        //Setting the previously selected rating
        scope.prevRating = 0;

        scope.$watch('ratingsObj.rating', function (newValue, oldValue) {
          setRating(newValue);
        });

        scope.$watch('ratingsObj.readOnly', function (newValue, oldValue) {
          scope.readOnly = newValue || false;
        });

        scope.$watch('ratingsObj.iconOn', function (newValue, oldValue) {
          scope.iconOn = newValue || 'ion-ios-star';
        });
        scope.$watch('ratingsObj.iconOff', function (newValue, oldValue) {
          scope.iconOff = newValue || 'ion-ios-star-outline';
        });
        scope.$watch('ratingsObj.iconOnColor', function (newValue, oldValue) {
          //Setting the color for the icon, when it is active
          scope.iconOnColor = {
            color: newValue || 'rgb(200, 200, 100)'
          };
        });
        scope.$watch('ratingsObj.iconOffColor', function (newValue, oldValue) {
          //Setting the color for the icon, when it is not active
          scope.iconOffColor = {
            color: newValue || 'rgb(200, 100, 100)'
          };
        });

        function setRating(val, uiEvent) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          scope.prevRating = val;
          if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
        }

        //Called when he user clicks on the rating
        scope.ratingsClicked = function (val) {
          setRating(val, true);
        };

        //Called when he user un clicks on the rating
        scope.ratingsUnClicked = function (val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          if (scope.prevRating == val) {
            if (scope.minRating !== 0) {
              scope.rating = scope.minRating;
            } else {
              scope.rating = 0;
            }
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating, scope.index);
        };
      }
    };
  }

})();