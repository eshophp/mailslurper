requirejs.config({
	  baseUrl: '/assets',
	  paths: {
			"controllers": "mailslurper/js/controllers",
			"models": "mailslurper/js/models",
			"services": "mailslurper/js/services",
			"templates": "mailslurper/templates",
			"widgets": "mailslurper/js/widgets",

			"blockui": "blockui/jquery.blockUI",
			"bootstrap": "bootstrap/dist/js/bootstrap",
			"bootstrap-daterangepicker": "bootstrap-daterangepicker/daterangepicker",
			"bootstrap-dialog": "bootstrap-dialog/dist/js/bootstrap-dialog",
			"bootstrap-growl": "bootstrap-growl/jquery.bootstrap-growl",
			"hbs": "require-handlebars-plugin/hbs",
			"jquery": "jquery/dist/jquery",
			"lightbox": "lightbox2/dist/js/lightbox.min",
			"moment": "moment/moment",
			"handlebars": "handlebars/handlebars"
	  },
	  shim: {
			"blockui": { deps: ["jquery"] },
			"bootstrap": { deps: ["jquery"]},
			"bootstrap-growl": { deps: ["bootstrap"] },
			"handlebars": {
				 exports: "Handlebars"
			},
			"jquery": { exports: "$" }
	  }
 });

 /*
 * This method loads a specified controller. It assumes a suffix of "Controller",
 * and it assumes the "controllers" directory. This also loads the serviceURL
 * for you.
 */
window.loadController = function(controllerName) {
	"use strict";

	require(
		[
			"services/SettingsService"
		],
		function(SettingsService) {
			if (!SettingsService.serviceSettingsExistInLocalStore()) {
				SettingsService.getServiceSettings().then(
					function(serviceSettings) {
						SettingsService.storeServiceSettings(serviceSettings);
						require(["controllers/" + controllerName + "Controller"]);
					}
				)
			} else {
				require(["controllers/" + controllerName + "Controller"]);
			}
		}
	);
};
