'use strict';

const R = require('ramda');

// Nothing :: Maybe a
const Nothing = {
  isNothing: true,      // isNothing :: Boolean
  isJust: false,        // isJust :: Boolean

  // toString :: Maybe a ~> String
  toString: R.always('Nothing'),

  // equals :: Maybe a ~> a -> Boolean
  equals: maybe => maybe.isNothing,

  // map :: Maybe a ~> (a -> b) -> Maybe b
  map: f => TK,

  // ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap: maybe => TK,
};

// Just :: a -> Maybe a
const Just = function Just(x) {
  return {
    value: x,
    isNothing: false,   // isNothing :: Boolean
    isJust: true,       // isJust :: Boolean

    // toString :: Maybe a ~> String
    toString: R.always(`Just(${R.toString(x)})`),

    // equals :: Maybe a ~> Maybe a -> Boolean
    equals: maybe => maybe.isJust && R.equals(maybe.value, x),

    // map :: Maybe a ~> (a -> b) -> Maybe b
    map: f => TK,

    // ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
    ap: maybe => TK,
  };
};

module.exports = {Just: Just, Nothing: Nothing};
