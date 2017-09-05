angular
  .module('getitToLinkResolver', [])
  .factory('getitToLinkResolverService', ['getitToLinkResolverConfig', '$filter', function(getitToLinkResolverConfig, $filter) {
    return {
      translate: function(original) {
        return original.replace(/\{(.+)\}/g, (match, p1) => $filter('translate')(p1));
      },
      config: {
        linkField: getitToLinkResolverConfig.linkField,
        linkText: getitToLinkResolverConfig.linkText,
        iconBefore: getitToLinkResolverConfig.iconBefore,
        iconAfter: getitToLinkResolverConfig.iconAfter
      }
    }
  }])
  .controller('getitToLinkResolverFullController', ['getitToLinkResolverService', '$scope', function(getitToLinkResolverService, $scope) {
    this.$onInit = function() {
      $scope.config = getitToLinkResolverService.config;
    };
    $scope.getitLink = () => {
      try {
        return this.prmFullViewServiceContainer.item.delivery.link.filter(link => link["displayLabel"] == getitToLinkResolverService.config.linkField)[0]["linkURL"];
      } catch (e) {
        return '';
      }
    };
    $scope.translate = (original) => getitToLinkResolverService.translate(original);
  }])
  .controller('getitToLinkResolverBriefController', ['getitToLinkResolverService', '$scope', function(getitToLinkResolverService, $scope) {
    this.$onInit = function() {
      $scope.config = getitToLinkResolverService.config;
    };
    $scope.getitLink = () => {
      try {
        return this.prmBriefResultContainer.item.link[getitToLinkResolverService.config.linkField];
      } catch (e) {
        return '';
      }
    };
    $scope.translate = (original) => getitToLinkResolverService.translate(original);
  }])
  .component('getitToLinkResolverFull', {
    bindings: {
      parentCtrl: '<'
    },
    require: {
      prmFullViewServiceContainer: '^prmFullViewServiceContainer'
    },
    controller: 'getitToLinkResolverFullController',
    template: '<button class="neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple">'+
              '<a ng-href="{{ getitLink() }}" class="arrow-link check-avail-link check-avail-link-full" target="_blank">'+
              '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconBefore.set}}" icon-definition="{{config.iconBefore.icon}}"></prm-icon>'+
              ' {{ translate(config.linkText) }} '+
              '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconAfter.set}}" icon-definition="{{config.iconAfter.icon}}"></prm-icon>'+
              '<prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>'+
              '</a> '+
              '</button>'
  })
  .component('getitToLinkResolverBrief', {
    bindings: {
      parentCtrl: '<'
    },
    require: {
      prmBriefResultContainer: '^prmBriefResultContainer'
    },
    controller: 'getitToLinkResolverBriefController',
    template: '<button class="neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple">'+
              '<a ng-href="{{ getitLink() }}" class="arrow-link check-avail-link check-avail-link-brief" target="_blank">'+
              '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconBefore.set}}" icon-definition="{{config.iconBefore.icon}}"></prm-icon>'+
              ' {{ translate(config.linkText) }} '+
              '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconAfter.set}}" icon-definition="{{config.iconAfter.icon}}"></prm-icon>'+
              '<prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>'+
              '</a> '+
              '</button>'
  });
