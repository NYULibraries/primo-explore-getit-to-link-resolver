const getitToLinkResolverConfig = __fixtures__['getitToLinkResolverConfig'];

describe('getitToLinkResolverService', () => {
  beforeEach(module('getitToLinkResolver', ($provide) => {
    $provide.constant('getitToLinkResolverConfig', getitToLinkResolverConfig);
    $provide.value('translateFilter', original => original + '!');
  }));

  let getitToLinkResolverService;
  beforeEach(inject((_getitToLinkResolverService_) => {
    getitToLinkResolverService = _getitToLinkResolverService_;
  }));

  describe('translate', () => {
    it('should be defined', () => {
      expect(getitToLinkResolverService.translate).toBeDefined();
    });

    it('should replace strings in curly braces', () => {
      const translated = getitToLinkResolverService.translate('My {CONFIG_VALUE} value');
      expect(translated).toEqual("My CONFIG_VALUE! value");
    });
  });

  describe('config', () => {
    it('should match config object', () => {
      expect(getitToLinkResolverService.config).toEqual(getitToLinkResolverConfig);
    });
  });

});
