'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startBot = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mastodonApi = require('mastodon-api');

var _mastodonApi2 = _interopRequireDefault(_mastodonApi);

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendToot = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var accessToken = _ref2.accessToken,
        instanceUrl = _ref2.instanceUrl,
        tootOptions = _ref2.tootOptions,
        catStrings = _ref2.catStrings;
    var instance, text;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instance = new _mastodonApi2.default({
              access_token: accessToken,
              api_url: instanceUrl
            });
            text = catStrings[Math.floor(Math.random() * catStrings.length)];
            return _context.abrupt('return', instance.post('statuses', (0, _assign2.default)(tootOptions, {
              status: text
            })));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendToot(_x) {
    return _ref.apply(this, arguments);
  };
}();

var startBot = exports.startBot = function startBot() {
  var settings = (0, _settings.getSettings)(__dirname + '/../settings.json');

  sendToot(settings).then(function (r) {
    return console.log('Published: ', r.data.content);
  }).catch(function (e) {
    return console.log('Error: ', e);
  });

  setInterval(function () {
    sendToot(settings).then(function (r) {
      return console.log('Published: ', r.data.content);
    }).catch(function (e) {
      return console.log('Error: ', e);
    });
  }, settings.timeBetweenToots * 60000);
};

exports.default = startBot;