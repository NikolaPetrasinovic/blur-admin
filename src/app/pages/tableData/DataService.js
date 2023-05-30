(function () {
  "use strict";

  angular.module("BlurAdmin.pages.tableData").service("DataService", DataService);
  DataService.$inject = ["$http", "$q"];

  function DataService($http, $q) {
    var vm = this;
    var apiKey = "Jh3zMPDE8TAbtnu7dtbywLoyRhHpb6IzIhU31gne";
    var cities = [
      "london",
      "new york",
      "tokyo",
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
          console.log(geocodingData);
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

    function getAirQualityData(latitude, longitude) {
      return $http({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/airquality",
        headers: { "X-Api-Key": apiKey },
        params: { lat: latitude, lon: longitude },
      })
        .then(function (response) {
          var airQualityData = response.data[0];
          var cityData = {};
    
          if (airQualityData && airQualityData.concentration) {
            cityData.concentration = airQualityData.concentration;
          } else {
            cityData.concentration = "No data found";
          }
    
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
        var airQualityData = response.data[0]; // Get the first item from the response array
        var cityData = {
          concentration: airQualityData.concentration,
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



// (function () {
//   "use strict";

//   angular.module("BlurAdmin.pages.tableData").service("DataService", DataService);

//   DataService.$inject = ["$http", "$q"];

//   function DataService($http, $q) {
//     var vm = this;
//     var apiKey = "Jh3zMPDE8TAbtnu7dtbywLoyRhHpb6IzIhU31gne";
//     var cities = [
//       "london",
//       "new york",
//       "tokyo",
//       "paris",
//       "madrid",
//       "belgrade",
//     ];
//     vm.cityData = [];
  
//     function getGeocodingData(city) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/geocoding",
//         headers: { "X-Api-Key": apiKey },
//         params: { city: city },
//       }).catch(function (error) {
//         console.error("Error: ", error);
//         throw error;
//       });
//     }
  
//     function triggerOtherFunctions(city) {
//       getGeocodingData(city)
//         .then(function (response) {
//           var geocodingData = response.data;
//           var longitude = geocodingData.longitude;
//           var latitude = geocodingData.latitude;
  
//           // Trigger other functions with longitude and latitude
//           getWorldTimeData(longitude, latitude);
//           getWeatherData(longitude, latitude);
//           getAirQualityData(longitude, latitude);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           // If geocoding request fails, trigger other requests and pick up data
//           var defaultData = {
//             city: city,
//             datetime: "No data found",
//             humidity: "No data found",
//             minTemp: "No data found",
//             maxTemp: "No data found",
//             sunrise: "No data found",
//             sunset: "No data found",
//             concentration: "No data found",
//           };
//           vm.cityData.push(defaultData);
//         });
//     }
    
//     function getWorldTimeData(longitude, latitude) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/worldtime",
//         headers: { "X-Api-Key": apiKey },
//         params: { lon: longitude, lat: latitude },
//       })
//         .then(function (response) {
//           var worldTime = response.data;
//           var cityObj = {
//             city: city,
//             datetime: worldTime.datetime,
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
    
//     function getWeatherData(longitude, latitude) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/weather",
//         headers: { "X-Api-Key": apiKey },
//         params: { lon: longitude, lat: latitude },
//       })
//         .then(function (response) {
//           var weatherData = response.data;
//           var cityObj = {
//             city: city,
//             temp: weatherData.temp,
//             humidity: weatherData.humidity,
//             minTemp: weatherData.min_temp,
//             maxTemp: weatherData.max_temp,
//             sunrise: new Date(weatherData.sunrise * 1000).toLocaleTimeString(),
//             sunset: new Date(weatherData.sunset * 1000).toLocaleTimeString()
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
    
//     function getAirQualityData(longitude, latitude) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/airquality",
//         headers: { "X-Api-Key": apiKey },
//         params: { lon: longitude, lat: latitude },
//       })
//         .then(function (response) {
//           var airQualityData = response.data;
//           var cityObj = {
//             city: city,
//             concentration: airQualityData.concentration
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
//     cities.forEach(function (city) {
//       triggerOtherFunctions(city);
//     });

    
//     function getWorldTimeDataCity(city) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/worldtime",
//         headers: { "X-Api-Key": apiKey },
//         params: { city: city },
//       })
//         .then(function (response) {
//           var worldTime = response.data;
//           var cityObj = {
//             city: city,
//             datetime: worldTime.datetime
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
    
//     function getWeatherDataCity(city) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/weather",
//         headers: { "X-Api-Key": apiKey },
//         params: { city: city },
//       })
//         .then(function (response) {
//           var weatherData = response.data;
//           var cityObj = {
//             city: city,
//             temp: weatherData.temp,
//             humidity: weatherData.humidity,
//             minTemp: weatherData.min_temp,
//             maxTemp: weatherData.max_temp,
//             sunrise: new Date(weatherData.sunrise * 1000).toLocaleTimeString(),
//             sunset: new Date(weatherData.sunset * 1000).toLocaleTimeString()
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
    
//     function getAirQualityDataCity(city) {
//       return $http({
//         method: "GET",
//         url: "https://api.api-ninjas.com/v1/airquality",
//         headers: { "X-Api-Key": apiKey },
//         params: { city: city },
//       })
//         .then(function (response) {
//           var airQualityData = response.data;
//           var cityObj = {
//             city: city,
//             concentration: airQualityData.concentration
//           };
//           vm.cityData.push(cityObj);
//         })
//         .catch(function (error) {
//           console.error("Error: ", error);
//           throw error;
//         });
//     }
//       }
// })();








////////////////////////////// ovako da se uradi !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1








  // (function () {
  //   "use strict";
  
  //   angular.module("BlurAdmin.pages.tableData").service("DataService", DataService);
  
  //   DataService.$inject = ["$http", "$q"];
  
  //   function DataService($http, $q) {
  //     var vm = this;
  //     var apiKey = "Jh3zMPDE8TAbtnu7dtbywLoyRhHpb6IzIhU31gne";
  //     var cities = [
  //       "london",
  //       "new york",
  //       "tokyo",
  //       "paris",
  //       "madrid",
  //       "belgrade",
  //     ];
  //     vm.cityData = [];
  
  //     function getCityData(city) {
  //       var cityData = { city: city };
  //       var promises = [
  //         getWorldTimeData(city),
  //         getWeatherData(city),
  //         getAirQualityData(city),
  //       ];
  //       return $q.all(promises)
  //         .then(function (responses) {
  //           var worldTime = responses[0].data;
  //           var weather = responses[1].data;
  //           var airQuality = responses[2].data;
  //           cityData.datetime = worldTime.datetime;
  //           cityData.temp = weather.temp;
  //           cityData.humidity = weather.humidity;
  //           cityData.minTemp = weather.min_temp;
  //           cityData.maxTemp = weather.max_temp;
  //           cityData.sunrise = new Date(
  //             weather.sunrise * 1000
  //           ).toLocaleTimeString();
  //           cityData.sunset = new Date(
  //             weather.sunset * 1000
  //           ).toLocaleTimeString();
  //           cityData.COConcentration = airQuality.CO.concentration;
  //           vm.cityData.push(cityData);
  //         })
  //         .catch(function (error) {
  //           console.error("Error: ", error);
  //           vm.cityData.push(cityData);
  //         });
  //     }

  //     function getGeocodingData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/geocoding",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { lon: longitude, lat: latitude },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function getWorldTimeData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/worldtime",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function getWeatherData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/weather",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function getAirQualityData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/airquality",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     var promises = cities.map(function (city) {
  //       return getCityData(city);
  //     });
  
  //     $q.all(promises).then(function () {
  //       console.log(vm.cityData);
  //     }).catch(function (error) {
  //       console.error("Error: ", error);
  //     });
  //   }
  // })();




  ////////////////////////////////////////////////////////////////////////
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
  


  // (function () {
  //   "use strict";
  //   angular.module("BlurAdmin.pages.tableData").service("DataService", DataService);
  //   DataService.$inject = ["$http", "$q"];
    
  //   function DataService($http, $q) {
  //     var vm = this;
  //     var apiKey = "g2N4nPxYXHDE01lQEbexaCFjeHWKWEMqcAhjtLdq";
  //     var cities = [
  //       "london",
  //       "new york",
  //       "tokyo",
  //       "paris",
  //       "madrid",
  //       "belgrade",
  //     ];
  //     vm.cityData = [];
  
  //     function getCityData(city) {
  //       var cityData = { city: city };
  //       var promises = [
  //         getWorldTimeData(city),
  //         getWeatherData(city),
  //         getAirQualityData(city),
  //       ];
  //       return $q.all(promises)
  //         .then(function (responses) {
  //           var worldTime = responses[0].data;
  //           var weather = responses[1].data;
  //           var airQuality = responses[2].data;
  //           cityData.latitude = weather.latitude;
  //           cityData.longitude = weather.longitude;
  //           cityData.datetime = worldTime.datetime;
  //           cityData.temp = weather.temp;
  //           cityData.humidity = weather.humidity;
  //           cityData.minTemp = weather.min_temp;
  //           cityData.maxTemp = weather.max_temp;
  //           cityData.sunrise = new Date(
  //             weather.sunrise * 1000
  //           ).toLocaleTimeString();
  //           cityData.sunset = new Date(
  //             weather.sunset * 1000
  //           ).toLocaleTimeString();
  //           cityData.COConcentration = airQuality.CO.concentration;
  //           vm.cityData.push(cityData);
  //           return cityData; // Dodatno vraćanje podataka za sledeću funkciju
  //         })
  //         .catch(function (error) {
  //           console.error("Error: ", error);
  //         });
  //     }
  
  //     function getWorldTimeData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/worldtime",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function getWeatherData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/weather",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function getAirQualityData(city) {
  //       return $http({
  //         method: "GET",
  //         url: "https://api.api-ninjas.com/v1/airquality",
  //         headers: { "X-Api-Key": apiKey },
  //         params: { city: city },
  //       }).catch(function (error) {
  //         console.error("Error: ", error);
  //         throw error;
  //       });
  //     }
  
  //     function updateCityData() {
  //       var promises = cities.map(function (city) {
  //         return getCityData(city);
  //       });
  
  //       $q.all(promises)
  //         .then(function (data) {
  //           console.log(vm.cityData);
  //         })
  //         .catch(function (error) {
  //           console.error("Error: ", error);
  //         });
  //     }
  
  //     updateCityData(); // Poziv funkcije za ažuriranje podataka
  
  //     // Dodatne funkcije za pojedinačne HTTP zahteve
  //     vm.getWorldTimeData = getWorldTimeData;
  //     vm.getWeatherData = getWeatherData;
  //     vm.getAirQualityData = getAirQualityData;
  //   }
  // })();