/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

      TablesPageCtrl.$inject = ['DataService'];

  /** @ngInject */
  function TablesPageCtrl(DataService) {

      var vm = this;
      vm.cityData = DataService.cityData;
  }
})();

// $http({
//   method: 'GET',
//   url: 'https://api.api-ninjas.com/v1/airquality',
//   headers: { 'X-Api-Key': apiKey },
//   params: { 'lat': cityData.latitude, 'lon': cityData.longitude }
// }).then(function successCallback(response) {
//   var airQuality = response.data;
//   cityData.COConcentration = airQuality.CO.concentration;
//   vm.cityData.push(cityData);
// }, function errorCallback(response) {
//   console.error('Error: ', response.data);
// });

//  $http({
//         method: 'GET',
//         url: 'https://api.api-ninjas.com/v1/airquality',
//         headers: { 'X-Api-Key': apiKey },
//         params: { 'lat': vm.latitude, 'lon': vm.longitude }
//       }).then(function successCallback(response) {
//         var airQuality = response.data;
//         vm.COConcentration = airQuality.CO.concentration;
//       }, function errorCallback(response) {
//         console.error('Error: ', response.data);
//       });


  //   var vm = this;
  //   var cities = ['london', 'paris', 'new york'];
  //   var apiKey = 'g2N4nPxYXHDE01lQEbexaCFjeHWKWEMqcAhjtLdq';
  //   vm.cityData = [];

  //   cities.forEach(function(city) {
  //     $http({
  //       method: 'GET',
  //       url: 'https://api.api-ninjas.com/v1/geocoding',
  //       headers: { 'X-Api-Key': apiKey },
  //       params: { 'city': city }
  //     }).then(function successCallback(response) {
  //       var location = response.data[0];
  //       var cityData = {
  //         name: location.name,
  //         latitude: location.latitude,
  //         longitude: location.longitude
  //       };

  //       $http({
  //         method: 'GET',
  //         url: 'https://api.api-ninjas.com/v1/worldtime',
  //         headers: { 'X-Api-Key': apiKey },
  //         params: { 'lat': cityData.latitude, 'lon' : cityData.longitude }
  //       }).then(function successCallback(response) {
  //         cityData.datetime = response.data.datetime;
  //       }, function errorCallback(response) {
  //         console.error('Error: ', response.data);
  //       });

  //       $http({
  //         method: 'GET',
  //         url: 'https://api.api-ninjas.com/v1/weather',
  //         headers: { 'X-Api-Key': apiKey },
  //         params: { 'lat': cityData.latitude, 'lon': cityData.longitude }
  //       }).then(function successCallback(response) {
  //         var weather = response.data;
  //         cityData.temp = weather.temp;
  //         cityData.humidity = weather.humidity;
  //         cityData.minTemp = weather.min_temp;
  //         cityData.maxTemp = weather.max_temp;
  //         cityData.sunrise = new Date(weather.sunrise * 1000).toLocaleTimeString();
  //         cityData.sunset = new Date(weather.sunset * 1000).toLocaleTimeString();
  //       }, function errorCallback(response) {
  //         console.error('Error: ', response.data);
  //       });

  //       $http({
  //         method: 'GET',
  //         url: 'https://api.api-ninjas.com/v1/airquality',
  //         headers: { 'X-Api-Key': apiKey },
  //         params: { 'lat': cityData.latitude, 'lon': cityData.longitude }
  //       }).then(function successCallback(response) {
  //         var airQuality = response.data;
  //         cityData.COConcentration = airQuality.CO.concentration;
  //         cityData.COAQI = airQuality.CO.aqi;
  //       }, function errorCallback(response) {
  //         console.error('Error: ', response.data);
  //       });

  //       vm.cityData.push(cityData);
  //     }, function errorCallback(response) {
  //       console.error('Error: ', response.data);
  //     });
  //   });
  // }

  // ///////////////////////////////////////////
  // var vm = this;
    // var apiKey = 'g2N4nPxYXHDE01lQEbexaCFjeHWKWEMqcAhjtLdq';

    // var cities = ['london', 'new york', 'tokyo'];

    // vm.cityData = [];

    // function getGeocoding(city) {
    //   return $http({
    //     method: 'GET',
    //     url: 'https://api.api-ninjas.com/v1/geocoding',
    //     headers: { 'X-Api-Key': apiKey },
    //     params: { 'city': city }
    //   });
    // }

    // function getWorldTime(latitude, longitude) {
    //   return $http({
    //     method: 'GET',
    //     url: 'https://api.api-ninjas.com/v1/worldtime',
    //     headers: { 'X-Api-Key': apiKey },
    //     params: { 'lat': latitude, 'lon' : longitude }
    //   });
    // }

    // function getWeather(latitude, longitude) {
    //   return $http({
    //     method: 'GET',
    //     url: 'https://api.api-ninjas.com/v1/weather',
    //     headers: { 'X-Api-Key': apiKey },
    //     params: { 'lat': latitude, 'lon': longitude }
    //   });
    // }

    // cities.forEach(function(city) {
    //   getGeocoding(city).then(function successCallback(response) {
    //     var location = response.data[0];
    //     var cityData = {
    //       city: location.name,
    //       latitude: location.latitude,
    //       longitude: location.longitude
    //     };

    //     return getWorldTime(cityData.latitude, cityData.longitude).then(function successCallback(response) {
    //       cityData.datetime = response.data.datetime;

    //       return getWeather(cityData.latitude, cityData.longitude).then(function successCallback(response) {
    //         var weather = response.data;
    //         cityData.temp = weather.temp;
    //         cityData.humidity = weather.humidity;
    //         cityData.minTemp = weather.min_temp;
    //         cityData.maxTemp = weather.max_temp;
    //         cityData.sunrise = new Date(weather.sunrise * 1000).toLocaleTimeString();
    //         cityData.sunset = new Date(weather.sunset * 1000).toLocaleTimeString();
    //         cityData.co_concentration = weather.co_concentration;
    //         vm.cityData.push(cityData);
    //       }, function errorCallback(response) {
    //         console.error('Error: ', response.data);
    //       });

    //     }, function errorCallback(response) {
    //       console.error('Error: ', response.data);
    //     });

    //   }, function errorCallback(response) {
    //     console.error('Error: ', response.data);
    //   });
    // });
