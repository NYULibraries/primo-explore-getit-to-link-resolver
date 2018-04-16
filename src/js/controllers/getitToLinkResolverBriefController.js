export default function(getitToLinkResolverService, $scope) {
  const ctrl = this;
  ctrl.$onInit = function() {
    // Get our config in this scope
    $scope.config = getitToLinkResolverService.config;
    $scope.getitLink = (() => {
      try {
        return ctrl.prmBriefResultContainer.item.link[$scope.config.linkField];
      } catch (e) {
        return '#';
      }
    })() || '#';
  };
  // Retrieve the GetIt link from whichever field the config told us it's in
  // note the different path for looking for links in full and brief displays
  // Yes this needs to be DRYed up
  // Use the translate function in this scope
  $scope.translate = (original) => getitToLinkResolverService.translate(original);
}
