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
    map: f => ZipList(list.map(f)),

    // ap :: ZipList (a -> b) ~> ZipList a -> ZipList b
    ap: zipList => {
      const list2 = zipList.value;
      if (list.isCons && list2.isCons) {
        const head = list.head(list2.head);
        const tail = ZipList(list.tail).ap(ZipList(list2.tail)).value;
        return ZipList(List.Cons(head, tail));
      } else {
        return ZipList(List.Nil);
      }
    },
  };
};

module.exports = ZipList;
