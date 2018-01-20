'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = undefined;

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mergeOptions = require('merge-options');

var _mergeOptions2 = _interopRequireDefault(_mergeOptions);

var _catstrings = require('./catstrings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** DEFAULT OPTIONS */
var TOOT_OPTIONS = {
  visibility: 'public',
  sensitive: false
};

var TIME_BETWEEN_TOOTS = 120; // minutes
/** */

var getSettings = exports.getSettings = function getSettings(file) {
  var data = _fs2.default.readFileSync(file);
  if (data == null) {
    throw new Error('Unable to load settings');
  }

  var customSettings = JSON.parse(data);
  var instanceUrl = customSettings.instanceUrl;
  var accessToken = customSettings.accessToken;


  if (instanceUrl == null || accessToken == null) {
    throw new Error('accessToken and instanceUrl are mandatory');
  }

  if (instanceUrl.endsWith('/') === false) {
    instanceUrl = instanceUrl + '/';
  }

  var tootOptions = (0, _mergeOptions2.default)(TOOT_OPTIONS, customSettings.tootOptions || {});

  var catStrings = _catstrings.CATSTRINGS;
  if (Array.isArray(customSettings.customCatStrings)) {
    catStrings = [].concat((0, _toConsumableArray3.default)(catStrings), (0, _toConsumableArray3.default)(customSettings.customCatStrings));
  }

  var timeBetweenToots = parseInt(customSettings.timeBetweenToots, 10);
  if ((0, _isNan2.default)(timeBetweenToots)) {
    timeBetweenToots = TIME_BETWEEN_TOOTS;
  }

  return {
    instanceUrl: instanceUrl,
    accessToken: accessToken,
    tootOptions: tootOptions,
    catStrings: catStrings,
    timeBetweenToots: timeBetweenToots
  };
};

exports.default = getSettings;