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
    map: f => Identity(f(x)),

    // ap :: Identity (a -> b) ~> Identity a -> Identity b
    //
    // Note that it's possible to implement "ap" in terms of "map":
    //
    //   identity => identity.map(x)
    //
    ap: identity => Identity(x(identity.value)),
  };
};

module.exports = Identity;
