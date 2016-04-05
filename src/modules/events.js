(function(window, document, Stellar, undefined) {
    Stellar.events = {
        listeners: {},
        bind: function(event_name, callback) {
            var event;
            event_name = event_name.split(',');
            for(var i=0; i<event_name.length; i++) {
                event = event_name[i].trim();
                if (this.listeners[event] === undefined) {
                    this.listeners[event] = {};
                    this.listeners[event].callbacks = [];
                }
                this.listeners[event].callbacks.push(callback);
            }
        },
        trigger: function(event, obj, args) {
            if (this.listeners[event] === undefined) {
                return;
            }
            var len = this.listeners[event].callbacks.length;
            for(var i=0;i<len;i++) {
                var callback = this.listeners[event].callbacks[i];
                callback.apply(obj, [args]);
            }
        },
        unbind: function(event) {
            if (!!event) { return; }
            delete this.listeners[event];
        }
    };
})(window, document, Stellar);
