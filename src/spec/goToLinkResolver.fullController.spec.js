import getitToLinkResolverConfig from './fixtures/getitToLinkResolverConfig';

describe('getitToLinkResolverFullController', () => {
  let $componentController, $scope;

  let translateSpy;
  beforeEach(() => {
    translateSpy = { translate: orig => orig };
    spyOn(translateSpy, 'translate');
  });

  beforeEach(module('getitToLinkResolver', ($provide) => {
    $provide.constant("getitToLinkResolverConfig", getitToLinkResolverConfig);
    $provide.service('getitToLinkResolverService',
      () => ({
        translate: translateSpy.translate,
        config: {...getitToLinkResolverConfig}
      })
    );
  }));

  let controller, emptyBindings;
  beforeEach(inject(function(_$rootScope_, _$componentController_) {
    $scope = _$rootScope_;
    $componentController = _$componentController_;

    emptyBindings = {
      prmFullViewServiceContainer: {
        service: {},
        item: {
          delivery: {}
        }
      },
      prmFullView: {
        services: [
          { title: 'tab_1.service.fake' },
          { title: 'tab_2.service.fake' },
          { title: 'tab_3.service.fake' },
          { title: 'beforeDetails' },
          { title: 'brief.results.tabs.details' },
          { title: 'tab_links.service.fake' },
          { title: 'tab_virtualbrowse.service.fake' },
        ]
      }
    };

    controller = $componentController(
      'getitToLinkResolverFull',
      { $scope },
      emptyBindings
    );
  }));

  describe('$onInit', () => {
    it("should assign ResovlerService's config to scope", () => {
      controller.$onInit();
      expect($scope.config).toEqual(getitToLinkResolverConfig);
    });

    it("should assign shouldAddGetItLink to false if not tab before details section", () => {
      const sendToBindings = angular.copy(emptyBindings);
      sendToBindings.prmFullViewServiceContainer.service.title = "brief.results.tabs.details";

      controller.$onInit();
      expect($scope.shouldAddGetItLink).toBeDefined();
      expect($scope.shouldAddGetItLink).toBe(false);

      console.log(sendToBindings);

      const $sendToScope = $scope.$new();
      const controllerInSendTo = $componentController(
        'getitToLinkResolverFull',
        { $scope: $sendToScope },
        sendToBindings
      );

      controllerInSendTo.$onInit();
      expect($sendToScope.shouldAddGetItLink).toBeDefined();
      expect($sendToScope.shouldAddGetItLink).toBe(false);
    });

    it("should assign shouldAddGetItLink to true if tab before details section", () => {
      const sendToBindings = angular.copy(emptyBindings);
      sendToBindings.prmFullViewServiceContainer.service.title = "beforeDetails";

      controller.$onInit();
      expect($scope.shouldAddGetItLink).toBeDefined();
      expect($scope.shouldAddGetItLink).toBe(false);

      const $sendToScope = $scope.$new();
      const controllerInSendTo = $componentController(
        'getitToLinkResolverFull',
        { $scope: $sendToScope },
        sendToBindings
      );

      controllerInSendTo.$onInit();
      expect($sendToScope.shouldAddGetItLink).toBeDefined();
      expect($sendToScope.shouldAddGetItLink).toBe(true);
    });

    describe('getitLink', () => {
      it('should be defined on the scope', () => {
        controller.$onInit();
        expect($scope.getitLink).toBeDefined();
      });

      it('should retreive GetIt link based on the config', () => {
        const getItBindings = angular.copy(emptyBindings);
        getItBindings.prmFullViewServiceContainer.item = {
          delivery: {
            link: [{
              displayLabel: "openURL",
              linkURL: "url found!"
            }]
          }
        };

        const $getItScope = $scope.$new();
        const getItController = $componentController(
          'getitToLinkResolverFull',
          { $scope: $getItScope },
          getItBindings
        );

        getItController.$onInit();
        expect($getItScope.getitLink).toEqual("url found!");
      });
    });

  });


  describe('translate', () => {
    it('should be defined on $scope', () => {
      expect($scope.translate).toBeDefined();
    });

    it('should invoke translate function from getitToLinkResolverService', () => {
      $scope.translate('test');
      expect(translateSpy.translate).toHaveBeenCalledWith('test');
    });
  });


});
