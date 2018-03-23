const getitToLinkResolverConfig = __fixtures__['getitToLinkResolverConfig'];

describe('getitToLinkResolverBriefController', () => {
  let $componentController, $scope;
  let controller;
  let emptyBindings;
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
      }));
    })
  );

  beforeEach(inject(function(_$rootScope_, _$componentController_) {
    $scope = _$rootScope_;
    $componentController = _$componentController_;

    emptyBindings = {
      prmBriefResultContainer: {
        item: {
          link: {}
        }
      }
    };

    controller = $componentController(
      'getitToLinkResolverBrief',
      { $scope },
      emptyBindings
    );
  }));

  describe('$onInit', () => {
    it("should assign ResovlerService's config to scope", () => {
      controller.$onInit();
      expect($scope.config).toEqual(getitToLinkResolverConfig);
    });
  });

  describe('getitLink', () => {
    it('should be defined on the scope', () => {
      expect($scope.getitLink).toBeDefined();
    });

    it('should retreive GetIt link based on the config', () => {
      const getItBindings = {...emptyBindings};
      getItBindings.prmBriefResultContainer.item.link = {
          [getitToLinkResolverConfig.linkField]: 'url found!'
      };

      const $getItScope = $scope.$new();
      const getItController = $componentController(
        'getitToLinkResolverBrief',
        { $scope: $getItScope },
        getItBindings
      );


      getItController.$onInit();
      expect($getItScope.getitLink()).toEqual("url found!");
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
