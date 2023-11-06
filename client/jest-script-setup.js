
const {TextEncoder, TextDecoder} = require('util');
const crypto = require('crypto');

Object.assign(global, { TextDecoder, TextEncoder });
const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        if(value === undefined){
          return;
        }
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();
  
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
  });

// mock window.crypto
Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: (arr) => crypto.randomBytes(arr.length),
        subtle: {
          digest: (a, b) => crypto.createHash(a).update(b).digest()
        }
    },
});
