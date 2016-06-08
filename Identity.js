'use strict';

const R = require('ramda');

// Identity :: a -> Identity a
const Identity = function Identity(x) {
  return {
    // value :: a
    value: x,

    // toString :: Identity a ~> String
    toString: R.always(`Identity(${R.toString(x)})`),

    // equals :: Identity a ~> Identity a -> Boolean
    equals: R.propEq('value', x),

    // map :: Identity a ~> (a -> b) -> Identity b
    map: f => TK,

    // ap :: Identity (a -> b) ~> Identity a -> Identity b
    ap: identity => TK,
  };
};

module.exports = Identity;
