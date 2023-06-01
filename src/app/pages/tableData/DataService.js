(function () {
  "use strict";

  angular.module("BlurAdmin.pages.tableData").service("DataService", DataService);
  DataService.$inject = ["$http", "$q", "$timeout"];

  function DataService($http, $q, $timeout) {
    var vm = this;
    var completedRequests = 0;
    vm.loadingData = true;
    var apiKey = "Jh3zMPDE8TAbtnu7dtbywLoyRhHpb6IzIhU31gne";
    var cities = [
      "london",
      "new york",
      "cairo",
      "paris",
      "madrid",
      "belgrade",
    ];
    vm.cityData = [];

    function getGeocodingData(city) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/geocoding",
        headers: { "X-Api-Key": apiKey },
        params: { city: city },
      })
        .then(function (response) {
          var geocodingData = response.data[0];
          // console.log(geocodingData);
          return {
            latitude: geocodingData.latitude,
            longitude: geocodingData.longitude,
          };
        })
        .catch(function (error) {
          console.error("Error: ", error);
          throw error;
        });
    }

    function getWorldTimeData(latitude, longitude ) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/worldtime",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude,lon: longitude},
      })
       .then(function (response) {
          var worldTime = response.data;
          var cityData = {
            datetime: worldTime.datetime,
          };
          // console.log("Latitude:", latitude, "Longitude:", longitude); 
          return cityData;
        })
       .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            datetime: "No data found",
          };
          return cityData;
        });
    }

    function getWeatherData(latitude, longitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/weather",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude,lon: longitude },
      })
       .then(function (response) {
          var weatherData = response.data;
          var cityData = {
            humidity: weatherData.humidity,
            minTemp: weatherData.min_temp,
            maxTemp: weatherData.max_temp,
            sunrise: new Date(weatherData.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(weatherData.sunset * 1000).toLocaleTimeString(),
          };
          // console.log("Latitude:", latitude, "Longitude:", longitude); 
          return cityData;
        })
       .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            humidity: "No data found",
            minTemp: "No data found",
            maxTemp: "No data found",
            sunrise: "No data found",
            sunset: "No data found",
          };
          return cityData;
        });
    }

    function getAirQualityData(longitude, latitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/airquality",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude, lon: longitude },
      })
        .then(function (response) {
          var airQualityData = response.data;
          var coData = airQualityData.CO;
          var concentration = coData ? coData.concentration : "No data found";
          var cityData = {
            concentration: concentration,
          };
          return cityData;
        })
        .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            concentration: "No data found",
          };
          return cityData;
        });
    }
    
    
    

    function getWorldTimeDataCity(city) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/worldtime",
        headers: { "X-Api-Key": apiKey },
        params: { city: city },
      })
        .then(function (response) {
          var worldTime = response.data;
          var cityData = {
            datetime: worldTime.datetime,
          };
          return cityData;
        })
        .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            datetime: "No data found",
          };
          return cityData;
        });
    }

    function getWeatherDataCity(city) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/weather",
        headers: { "X-Api-Key": apiKey },
        params: { city: city },
      })
        .then(function (response) {
          var weatherData = response.data;
          var cityData = {
            temp: weatherData.temp,
            humidity: weatherData.humidity,
            minTemp: weatherData.min_temp,
            maxTemp: weatherData.max_temp,
            sunrise: new Date(weatherData.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(weatherData.sunset * 1000).toLocaleTimeString(),
          };
          return cityData;
        })
        .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            humidity: "No data found",
            minTemp: "No data found",
            maxTemp: "No data found",
            sunrise: "No data found",
            sunset: "No data found",
          };
          return cityData;
        });
    }

    function getAirQualityDataCity(city) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/airquality",
        headers: { "X-Api-Key": apiKey },
        params: { city: city },
      })
        .then(function (response) {
          var airQualityData = response.data;
          var coData = airQualityData.CO;
          var concentration = coData ? coData.concentration : "No data found";
          var cityData = {
            concentration: concentration,
          };
          return cityData;
        })
        .catch(function (error) {
          console.error("Error: ", error);
          var cityData = {
            concentration: "No data found",
          };
          return cityData;
        });
    }    

    function handleRequests(city) {
      return getGeocodingData(city)
        .then(function (response) {
          var latitude = response.latitude;
          var longitude = response.longitude;
    
          var promises = [
            getWorldTimeData(latitude, longitude),
            getWeatherData(latitude, longitude),
            getAirQualityData(latitude, longitude),
          ];
    
          return $q.all(promises);
        })
        .then(function (results) {
          var cityData = {
            city: city,
            datetime: results[0].datetime,
            humidity: results[1].humidity,
            minTemp: results[1].minTemp,
            maxTemp: results[1].maxTemp,
            sunrise: results[1].sunrise,
            sunset: results[1].sunset,
            concentration: results[2].concentration,
          };
          vm.cityData.push(cityData);
          completedRequests++;
          if (completedRequests === cities.length) {
            $timeout(function() {
              vm.loadingData = false; // All data is loaded
            }, 2000);
          }
        })
        .catch(function (error) {
          console.error("Error: ", error);
          return $q.all([
            getWorldTimeDataCity(city),
            getWeatherDataCity(city),
            getAirQualityDataCity(city),
          ]).then(function (results) {
            var cityData = {
              city: city,
              datetime: results[0].datetime,
              humidity: results[1].humidity,
              minTemp: results[1].minTemp,
              maxTemp: results[1].maxTemp,
              sunrise: results[1].sunrise,
              sunset: results[1].sunset,
              concentration: results[2].concentration,
            };
            vm.cityData.push(cityData);
          })
          .catch(function (error) {
            console.error("Error: ", error);
            throw error;
          });
        });
    }

    var promises = cities.map(function (city) {
      return handleRequests(city);
    });

    $q.all(promises)
      .then(function () {
        console.log("All promises resolved");
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  }
})();