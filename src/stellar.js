window.Stellar || (function(window, document, undefined) {
  var Stellar = {};
  Stellar = {
    init: function() {
      // initialize stellar
      return 'stellar';
    },
    log: function(value) {
      console.debug(value);
    }
  };

  window.Stellar = Stellar;
  return Stellar;
})(window,document)