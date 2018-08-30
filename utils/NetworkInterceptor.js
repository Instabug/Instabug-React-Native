/*Configuration for intercepting the fetch request
*/

attach(global);
var interceptorObject;

function attach(env) {
  env.fetch = (function (fetch) {
    return function (...args) {
      return interceptor(fetch, ...args);
    };
  })(env.fetch);
}

function interceptor(fetch, ...args) {
  let promise = Promise.resolve(args);

  // Register request interceptors
  if (interceptorObject.request || interceptorObject.requestError) {
    promise = promise.then(args => interceptorObject.request(...args), interceptorObject.requestError);
  }

  // Register fetch call
  promise = promise.then(args => fetch(...args));

  // Register response interceptors
  if (interceptorObject.response || interceptorObject.responseError) {
    promise = promise.then(interceptorObject.response, interceptorObject.responseError);
  }

  return promise;
}

module.exports = {
  register: function (interceptor) {
    interceptorObject = interceptor;
    return () => {
      interceptorObject = null;
    };
  }
};