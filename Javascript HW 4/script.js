//Pattern singleton
var MyHTTPRequest = (function () {
  var instance;

  function init() {
    var method = "GET";

    return {
      setMethod(newMethod) {
        method = newMethod;
      },
      getMethod() {
        return method;
      },
      sendRequest(url, onLoad, onError, body) {
        //Creating new XMLHttpRequest object for each request so that 
        //multiple requests could be performed simultaneously
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (onLoad) {
          xhr.onload = () => {
            onLoad(xhr.response, xhr.status, xhr.statusText);
          }
        }
        if (onError) {
          xhr.onerror = () => {
            onError();
          }
        }

        if (typeof body === "object" && body !== null) {
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          xhr.send(JSON.stringify(body));
        }
        else {
          xhr.send();
        }
      },
    };
  };

  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();

//Patterns singleton and decorator
var MyLogger = (function() {
  var instance;

  function init() {
    var isLogging = true;

    return {
      toggleLogging() {
        isLogging = !isLogging;
      },
      isLogging() {
        return isLogging;
      },
      loggingWraper(func) {
        return function() {
          var res;
          if (isLogging) {
            var argString = Array.from(arguments).join(', ');
            console.log(`Called ${func.name}(${argString})`);
          }
          res = func.apply(this, arguments);
          if (isLogging) {
            console.log(`${func.name} returned: \n${res}`);
          }
          return res;
        }
      },
    };
  }
  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();


var mhr = MyHTTPRequest.getInstance();
var ml = MyLogger.getInstance();

var onLoad = function(response, status, statusText) {
  return `${status}: ${statusText} \n${response}`;
}
var onError = function() {
  return 'XMLHttpRequest transaction failed due to an error';
}

//Logging output of callback functions
onLoad = ml.loggingWraper(onLoad);
onError = ml.loggingWraper(onError);

mhr.sendRequest("https://reqres.in/api/users/2", onLoad, onError);
mhr.sendRequest("https://developer.mozilla.org/", onLoad, onError);

mhr.setMethod("POST");
mhr.sendRequest(
  "https://reqres.in/api/users", 
  onLoad, 
  onError, 
  {
    "name": "morpheus",
    "job": "leader"
  }
);


