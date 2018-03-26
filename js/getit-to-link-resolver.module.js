angular
  // Define the module name
  .module('getitToLinkResolver', [])
  // A reusable object for this module with our translate function
  // and a convenience 'config' object
  .factory('getitToLinkResolverService', ['getitToLinkResolverConfig', '$filter', function(getitToLinkResolverConfig, $filter) {
    return {
      // Use the translate filter to get values from the Primo Back Office
      translate: function(original) {
        return original.replace(/\{(.+)\}/g, (match, p1) => $filter('translate')(p1));
      },
      // Set reusable config constants from the config element on the parent ng app
      config: {
        linkField: getitToLinkResolverConfig.linkField,
        linkText: getitToLinkResolverConfig.linkText,
        iconBefore: getitToLinkResolverConfig.iconBefore,
        iconAfter: getitToLinkResolverConfig.iconAfter,
        serviceSectionHeader: getitToLinkResolverConfig.serviceSectionHeader
      }
    };
  }])
  // Controller for below full-display component
  .controller('getitToLinkResolverFullController', ['getitToLinkResolverService', '$scope', function(getitToLinkResolverService, $scope) {
    const ctrl = this;
    ctrl.$onInit = function() {
      // Get our config in this scope
      $scope.config = getitToLinkResolverService.config;
      // Are we in the "send to" section? Then we're going to add our GetIt
      // link right after it as a new section
      $scope.shouldAddGetItLink = ctrl.prmFullViewServiceContainer.service.title === "nui.brief.results.tabs.send_to";

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
  }])
  // Controller for below brief-display component
  .controller('getitToLinkResolverBriefController', ['getitToLinkResolverService', '$scope', function(getitToLinkResolverService, $scope) {
    const ctrl = this;
    ctrl.$onInit = function() {
      // Get our config in this scope
      $scope.config = getitToLinkResolverService.config;
      $scope.getitLink = (() => {
        try {
          return ctrl.prmBriefResultContainer.item.link[$scope.config.linkField];
        } catch (e) {
          return '';
        }
      })() || '#';
    };
    // Retrieve the GetIt link from whichever field the config told us it's in
    // note the different path for looking for links in full and brief displays
    // Yes this needs to be DRYed up
    // Use the translate function in this scope
    $scope.translate = (original) => getitToLinkResolverService.translate(original);
  }])
  // Component to add to the full display page
  .component('getitToLinkResolverFull', {
    // Include the full view service container controller
    // it's where the getit link will be found
    require: {
      prmFullViewServiceContainer: '^prmFullViewServiceContainer'
    },
    // Use the above controller
    controller: 'getitToLinkResolverFullController',
    // Setup a new section copying the markup from previous sections
    template: `<div ng-if="shouldAddGetItLink">
                <div class="section-head">
                    <div layout="row" layout-align="center center" class="layout-align-center-center layout-row">
                      <h4 class="section-title md-title light-text">{{translate(config.serviceSectionHeader)}}</h4>
                      <md-divider flex="" class="md-primoExplore-theme flex"></md-divider>
                    </div>
                </div>
                <div class="section-body">
                <a ng-href="{{ getitLink }}" class="neutralized-button md-button md-primoExplore-theme md-ink-ripple arrow-link check-avail-link check-avail-link-full" target="_blank">
                  <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconBefore.set}}" icon-definition="{{config.iconBefore.icon}}"></prm-icon>
                  {{ translate(config.linkText) }}
                  <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconAfter.set}}" icon-definition="{{config.iconAfter.icon}}"></prm-icon>
                  <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
                </a>
                </div>
              </div>
    `
  })
  // Component to add to the brief display page
  .component('getitToLinkResolverBrief', {
    // Include the brief result container controller
    // it's where the getit link will be found for the brief result
    require: {
      prmBriefResultContainer: '^prmBriefResultContainer'
    },
    // Use the above controller
    controller: 'getitToLinkResolverBriefController',
    // Setup a new link to include after the brief result copying existing markup
    // classes like "md-button neutralized-button" allow it to function like a
    // button, i.e. not display strangely and be clickable
    template: `
              <a ng-href="{{ getitLink }}" class="md-button md-primoExplore-theme md-ink-ripple neutralized-button arrow-link check-avail-link check-avail-link-brief" target="_blank">
                <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconBefore.set}}" icon-definition="{{config.iconBefore.icon}}"></prm-icon>
                 {{ translate(config.linkText) }}
                <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.iconAfter.set}}" icon-definition="{{config.iconAfter.icon}}"></prm-icon>
                <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
              </a>
    `
  });
