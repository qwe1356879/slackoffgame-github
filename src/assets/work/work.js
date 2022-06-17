var setTimer = function(fn, interval) {
    var recurse, ref;
    ref = {};
    ref["continue"] = true;
    (recurse = function() {
      if (ref["continue"]) {
        ref.timeout = setTimeout((function() {
          fn();
          recurse();
        }), interval);
      }
    })();
    return ref;
  }

var clearTimer = function(ref) {
    ref["continue"] = false;
    clearTimeout(ref.timeout);
  }



  
  export  {setTimer,clearTimer}