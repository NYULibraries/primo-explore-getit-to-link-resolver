// Array.prototype.findIndex polyfill:
Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],i=0;i<t;){var o=e[i];if(r.call(n,o,i,e))return i;i++}return-1},configurable:!0,writable:!0});

getitToLinkResolverFullController.$inject = ['getitToLinkResolverService', '$scope'];
export default function getitToLinkResolverFullController(getitToLinkResolverService, $scope) {
  const ctrl = this;
  ctrl.$onInit = function() {
    // Get our config in this scope
    $scope.config = getitToLinkResolverService.config;
    // Place GetIt before the Details tab
    $scope.targetServiceIdx = ctrl.prmFullView.services.findIndex(({ title }) => title === "brief.results.tabs.details") - 1;
    $scope.targetServiceTitle = ctrl.prmFullView.services[$scope.targetServiceIdx].title;
    $scope.shouldAddGetItLink = ctrl.prmFullViewServiceContainer.service.title === $scope.targetServiceTitle;

    $scope.getitLink = (() => {
      try {
        return ctrl.prmFullViewServiceContainer.item.delivery.link.filter(link =>
          link["displayLabel"] === getitToLinkResolverService.config.linkField
        )[0]["linkURL"];
      } catch (e) {
        return '#';
      }
    })() || '#';
  };
  // Retrieve the GetIt link from whichever field the config told us it's in
  // note the different path for looking for links in full and brief displays
  // Use the translate function in this scope
  $scope.translate = (original) => getitToLinkResolverService.translate(original);
}
