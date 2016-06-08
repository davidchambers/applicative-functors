'use strict';

const R = require('ramda');

const List = require('./List');

//    ZipList :: List a -> ZipList a
const ZipList = function ZipList(list) {
  return {
    value: list,
    toString: R.always(`ZipList(${list})`),

    // equals :: ZipList a ~> ZipList a -> Boolean
    equals: zipList => R.equals(zipList.value, list),

    // map :: ZipList a ~> (a -> b) -> ZipList b
    map: f => TK,

    // ap :: ZipList (a -> b) ~> ZipList a -> ZipList b
    ap: zipList => TK,
  };
};

module.exports = ZipList;
