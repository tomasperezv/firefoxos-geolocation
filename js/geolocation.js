var Geolocation = (function() {

  /**
   * @var {Array} _listener
   * @private
   */
  var _listeners = [];

  /**
   * @var {Object} _options
   * @private
   */
  var _options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
  };

  /**
   * @method _onPositionChange
   * @param {Object} position
   * @private
   */
  function _onPositionChange = function(position) {

    var i,
        listenersLength = _listeners.length,
        positionData = [position.coords.latitude, position.coords.longitude];

    for (i = 0; i < listenersLength; i++) {
      _listeners[i](positionData);
    }

  };

  /**
   * @method _onError
   * @private
   */
  function _onError = function(data) {
    // Do nothing
  };

  /**
   * @method _addListener
   * @private
   */
  function _addListener = function(callback) {
    _listeners.push(callback);
  };

  /**
   * @method _onError
   * @private
   */
  function geo_success(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  }

  var _wpid = navigator.geolocation.watchPosition(_onPositionChange, _onError, _options);

  return {
    watch: function(callback) {
      if (typeof callback === 'function') {
        _addListener(callback);
      }
    }
  };

})(window, document, undefined);
