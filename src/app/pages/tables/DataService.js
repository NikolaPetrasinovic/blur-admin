(function () {
  "use strict";

  angular.module("BlurAdmin.pages.tables").service("DataService", DataService);

  DataService.$inject = ["$http"];

  function DataService($http) {
    var vm = this;
    var apiKey = "g2N4nPxYXHDE01lQEbexaCFjeHWKWEMqcAhjtLdq";
    var cities = ["london", "new york", "tokyo", "paris", "madrid", "belgrade", "rio de janeiro", "jakarta"];
    vm.cityData = [];
  
   function getCityData(city) {
  var cityData = {};
  return getGeocodingData(city)
    .then(function (response) {
      var location = response.data[0];
      cityData.city = location.name;
      cityData.latitude = location.latitude;
      cityData.longitude = location.longitude;
      return cityData;
    })
    .then(function (cityData) {
      return getWorldTimeData(cityData.latitude, cityData.longitude)
        .then(function (response) {
          cityData.datetime = response.data.datetime;
          return cityData;
        });
    })
    .then(function (cityData) {
      return getWeatherData(cityData.latitude, cityData.longitude)
        .then(function (response) {
          var weather = response.data;
          cityData.temp = weather.temp;
          cityData.humidity = weather.humidity;
          cityData.minTemp = weather.min_temp;
          cityData.maxTemp = weather.max_temp;
          cityData.sunrise = new Date(
            weather.sunrise * 1000
          ).toLocaleTimeString();
          cityData.sunset = new Date(
            weather.sunset * 1000
          ).toLocaleTimeString();
          return cityData;
        });
    })
    .then(function (cityData) {
      return getAirQualityData(cityData.latitude, cityData.longitude)
        .then(function (response) {
          var airQuality = response.data;
          cityData.COConcentration = airQuality.CO.concentration;
          return cityData;
        });
    })
    .then(function (cityData) {
      vm.cityData.push(cityData);
    })
    .catch(function (error) {
      console.error("Error: ", error);
      vm.cityData.push({
        city: city,
        error: "No data available"
      });
    });
}
  
    function getGeocodingData(city) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/geocoding",
        headers: { "X-Api-Key": apiKey },
        params: { city: city },
      }).catch(function (error) {
        console.error("Error: ", error);
        throw error;
      });
    }
  
    function getWorldTimeData(latitude, longitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/worldtime",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude, lon: longitude },
      }).catch(function (error) {
        console.error("Error: ", error);
        throw error;
      });
    }
  
    function getWeatherData(latitude, longitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/weather",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude, lon: longitude },
      }).catch(function (error) {
        console.error("Error: ", error);
        throw error;
      });
    }
  
    function getAirQualityData(latitude, longitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/airquality",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude, lon: longitude },
      }).catch(function (error) {
        console.error("Error: ", error);
        throw error;
      });
    }
  
    cities.forEach(function (city) {
      getCityData(city);
    });
  }
})();

// function getCityData(city) {
//   var cityData = {};
//   return getGeocodingData(city)
//     .then(function (response) {
//       var location = response.data[0];
//       cityData.city = location.name;
//       cityData.latitude = location.latitude;
//       cityData.longitude = location.longitude;
//       return getWorldTimeData(cityData.latitude, cityData.longitude);
//     })
//     .then(function (response) {
//       cityData.datetime = response.data.datetime;
//       return getWeatherData(cityData.latitude, cityData.longitude);
//     })
//     .then(function (response) {
//       var weather = response.data;
//       cityData.temp = weather.temp;
//       cityData.humidity = weather.humidity;
//       cityData.minTemp = weather.min_temp;
//       cityData.maxTemp = weather.max_temp;
//       cityData.sunrise = new Date(
//         weather.sunrise * 1000
//       ).toLocaleTimeString();
//       cityData.sunset = new Date(
//         weather.sunset * 1000
//       ).toLocaleTimeString();
//       return getAirQualityData(cityData.latitude, cityData.longitude);
//     })
//     .then(function (response) {
//       var airQuality = response.data;
//       cityData.COConcentration = airQuality.CO.concentration;
//       vm.cityData.push(cityData);
//     })
//     .catch(function (error) {
//       console.error("Error: ", error);
//       vm.cityData.push({
//         city: city,
//         error: "No data available"
//       });
//     })
// }