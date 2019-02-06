export default function(getitToLinkResolverService, $scope) {
  const ctrl = this;
  ctrl.$onInit = function() {
    // Get our config in this scope
    $scope.config = getitToLinkResolverService.config;
    // Are we in the "send to" section? Then we're going to add our GetIt
    // link right after it as a new section
    $scope.shouldAddGetItLink = ctrl.prmFullViewServiceContainer.service.title === "nui.brief.results.tabs.links";

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
