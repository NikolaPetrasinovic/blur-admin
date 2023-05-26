(function () {
  "use strict";
  angular.module("BlurAdmin.pages.tableData").controller("TableDataPageCtrl", TableDataPageCtrl);
  TableDataPageCtrl.$inject = ["DataService"];

  function TableDataPageCtrl(DataService) {
    var vm = this;
    vm.cityData = DataService.cityData;
  }
})();
