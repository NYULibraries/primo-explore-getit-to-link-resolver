export default function(getitToLinkResolverConfig, $filter) {
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
}
