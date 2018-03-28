const getitToLinkResolverConfig = __fixtures__['getitToLinkResolverConfig'];

describe('getitToLinkResolverFull component', () => {

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

  let element;
  beforeEach(inject(function(_$compile_, _$rootScope_){
    const $compile = _$compile_;
    const $rootScope = _$rootScope_;
    const $scope = $rootScope.$new();

    const parentCtrl = {
      service: {
        title: "nui.brief.results.tabs.send_to"
      }
    };

    // can add spyOn to parentController to mock parent functions. E.g. spyOn(fooController, 'add').andReturn(3);
    element = angular.element(`<div><getit-to-link-resolver-full /></div>`);
    element.data('$prmFullViewServiceContainerController', parentCtrl);

    element = $compile(element)($scope).find('getit-to-link-resolver-full');
    $scope.$digest();
  }));

  describe('template layout', () => {
    it('should be wrapped in ng-if directive div', () => {
      const ngIf = element.children()[0];
      expect(ngIf.tagName).toEqual('DIV');
      expect(ngIf.attributes[0].name).toEqual('ng-if');
    });
  });

  describe('icons', () => {
    it('should appropriately map specified before icon', () => {
      const iconBefore = getitToLinkResolverConfig.iconBefore;
      const icons = Array.from(element.find('prm-icon'));

      const matches = icons.reduce((acc, icn) => {
        if (icn.getAttribute('icon-definition') === iconBefore.icon &&
          icn.getAttribute('svg-icon-set') === iconBefore.set) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      expect(matches).toEqual(1);
    });

    it('should appropriately map specified after icon', () => {
      const iconAfter = getitToLinkResolverConfig.iconAfter;
      const icons = Array.from(element.find('prm-icon'));
      const matches = icons.reduce((acc, icn) => {
        if (icn.getAttribute('icon-definition') === iconAfter.icon &&
            icn.getAttribute('svg-icon-set') === iconAfter.set) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      expect(matches).toEqual(1);
    });
  });

});
