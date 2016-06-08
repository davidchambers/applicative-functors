'use strict';

const R = require('ramda');

//    concat :: List a -> List a -> List a
const concat = R.curry(function concat(list1, list2) {
  return list1.isNil ? list2 :
         list2.isNil ? list1 :
       /* otherwise */ Cons(list1.head, concat(list1.tail, list2));
});

// Nil :: List a
const Nil = {
  isNil: true,
  isCons: false,

  // toString :: List a ~> String
  toString: R.always('Nil'),

  // equals :: List a ~> a -> Boolean
  equals: list => list.isNil,

  // map :: List a ~> (a -> b) -> List b
  map: f => Nil,

  // ap :: List (a -> b) ~> List a -> List b
  ap: list => Nil,
};

// Cons :: (a, List a) -> List a
const Cons = function Cons(head, tail) {
  return {
    head: head,         // head :: a
    tail: tail,         // tail :: List a
    isNil: false,
    isCons: true,

    // toString :: List a ~> String
    toString: R.always(`Cons(${R.toString(head)}, ${tail})`),

    // equals :: List a ~> List a -> Boolean
    equals: list => list.isCons &&
                    R.equals(list.head, head) &&
                    R.equals(list.tail, tail),

    // map :: List a ~> (a -> b) -> List b
    map: f => Cons(f(head), tail.map(f)),

    // ap :: List (a -> b) ~> List a -> List b
    ap: list => concat(list.map(head), tail.ap(list)),
  };
};

module.exports = {Cons: Cons, Nil: Nil};
