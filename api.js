'use strict';

const R = require('ramda');

// map :: Functor f => (a -> b) -> f a -> f b
const map = R.curry((f, functor) => functor.map(f));

// ap :: Apply f => f (a -> b) -> f a -> f b
const ap = R.curry((applyF, applyX) => applyF.ap(applyX));

// lift :: Functor f => (a -> b) -> f a -> f b
const lift = map;

// lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
const lift2 = R.curry((f, applyA, applyB) => ap(map(f, applyA), applyB));

module.exports = {ap: ap, lift: lift, lift2: lift2, map: map};
