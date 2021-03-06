"use strict";

var Q           = require('q');

var Constants   					= require('./Constants.js');
var RouterArgs	             		= require('./RouterArgs.js');
var lrException                     = require('./errorException.js');
var showHelp                     	= require('./help.js');
var selectProject	             	= require('./projectSelect.js');
var download	             		= require('./download.js');
var showMainMenu	             	= require('./mainMenu.js');
var cache	                    	= require('./cache.js');

var router = function (step) {
	if (RouterArgs.fetch('doShowHelp')) {
		showHelp();
	} else {
		if (step === Constants.fetch('STEP_START')) {
			selectProject();
		} else if (step === Constants.fetch('STEP_JUST_LOADED_CONFIG')) {
			if (RouterArgs.fetch('loadFromCache')) {
				cache.readFromCache();
			} else {
				download.downloadAllFromServer();
			}
		} else if (step === Constants.fetch('STEP_JUST_READ_ALL_FROM_SERVER')) {
			showMainMenu();
		} else if (step === Constants.fetch('STEP_JUST_SAVED_ALL_FILES_TO_DISK')) {
			showMainMenu();
		} else if (step === Constants.fetch('STEP_JUST_UPLOADED_DDMS')) {
			showMainMenu();
		} else if (step === Constants.fetch('STEP_JUST_WATCHED_FOLDER')) {
			showMainMenu();
		} else if (step === Constants.fetch('STEP_JUST_CREATED_PROJECT')) {
			selectProject();
		} else {
			lrException('Unknown next step!');
		}
	}
};

module.exports = router;