const getitToLinkResolverConfig = __fixtures__['getitToLinkResolverConfig'];

describe('getitToLinkResolverFullController', () => {
  let $componentController, $scope, $filter;
  let controller, controllerInSendTo;
  let $sendToScope;

  beforeEach(module('getitToLinkResolver', ($provide) => {
    $provide.constant("getitToLinkResolverConfig", getitToLinkResolverConfig);
    $provide.service('getitToLinkResolverService',
      () => ({
        translate(original) {
          return original;
        },
        config: {...getitToLinkResolverConfig}
      }));
    })
  );

  beforeEach(inject(function(_$rootScope_, _$componentController_, _$filter_) {
    $scope = _$rootScope_;
    $componentController = _$componentController_;
    $filter = _$filter_;

    const emptyBindings = {
      prmFullViewServiceContainer: {
        service: { },
        item: {
          delivery: { }
        }
      }
    };

    controller = $componentController(
      'getitToLinkResolverFull',
      { $scope },
      emptyBindings
    );

    const sendToBindings = {...emptyBindings};
    sendToBindings.prmFullViewServiceContainer.service.title = "nui.brief.results.tabs.send_to";

    $sendToScope = $scope.$new();
    controllerInSendTo = $componentController(
      'getitToLinkResolverFull',
      { $scope: $sendToScope },
      sendToBindings
    );

  }));

  describe('$onInit', () => {
    it("should assign ResovlerService's config to scope", () => {
      controller.$onInit();
      expect($scope.config).toEqual(getitToLinkResolverConfig);
    });

    it("should assign shouldAddGetItLink function when in the 'send to' section", () => {
      controllerInSendTo.$onInit();

      $sendToScope.shouldAddGetItLink.toBeDefined();
      expect($sendToScope.shouldAddGetItLink()).toBe(true);
    });
  });

});
