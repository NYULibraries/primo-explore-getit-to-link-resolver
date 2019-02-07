// html templates
import getitToLinkResolverFull from '../html/getitToLinkResolverFull.html';
import getitToLinkResolverBrief from '../html/getitToLinkResolverBrief.html';

// controllers
import getitToLinkResolverFullController from './controllers/getitToLinkResolverFullController.js';
import getitToLinkResolverBriefController from './controllers/getitToLinkResolverBriefController.js';

import getitToLinkResolverService from './services/getitToLinkResolverService.js';

angular
  // Define the module name
  .module('getitToLinkResolver', [])
  // A reusable object for this module with our translate function
  // and a convenience 'config' object
  .factory('getitToLinkResolverService', ['getitToLinkResolverConfig', '$filter', getitToLinkResolverService])
  // Controller for below full-display component
  .controller('getitToLinkResolverFullController', getitToLinkResolverFullController)
  // Controller for below brief-display component
  .controller('getitToLinkResolverBriefController', ['getitToLinkResolverService', '$scope', getitToLinkResolverBriefController])
  // Component to add to the full display page
  .component('getitToLinkResolverFull', {
    // Include the full view service container controller
    // it's where the getit link will be found
    require: {
      prmFullViewServiceContainer: '^prmFullViewServiceContainer',
      prmFullView: '^prmFullView',
    },
    // Use the above controller
    controller: 'getitToLinkResolverFullController',
    // Setup a new section copying the markup from previous sections
    template: getitToLinkResolverFull
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
    template: getitToLinkResolverBrief
  });
