'use strict';

const assert = require('assert');

const R = require('ramda');

const Identity = require('../Identity');
const {Cons, Nil} = require('../List');
const {Just, Nothing} = require('../Maybe');
const ZipList = require('../ZipList');
const {ap, lift, lift2, map} = require('../api');

const eq = (actual, expected) => {
  assert.strictEqual(R.toString(actual), R.toString(expected));
};

//    inc :: Number -> Number
const inc = x => x + 1;

//    add :: Number -> Number -> Number
const add = x => y => x + y;

//    liftedInc :: Functor f => f Number -> f Number
const liftedInc = lift(inc);

//    liftedAdd :: Apply f => f Number -> f Number -> f Number
const liftedAdd = lift2(add);

describe('Identity', () => {

  it('show (Identity [1,2,3])',
     () => { eq(String(Identity([1, 2, 3])), 'Identity([1, 2, 3])'); });

  it('(+ 1) <$> Identity 42',
     () => { eq(map(inc, Identity(42)), Identity(43)); });

  it('Identity (+ 1) <*> Identity 42',
     () => { eq(ap(Identity(R.inc), Identity(42)), Identity(43)); });

  it('liftA (+ 1) (Identity 42)',
     () => { eq(liftedInc(Identity(42)), Identity(43)); });

  it('liftA2 (+) (Identity 40) (Identity 2)',
     () => { eq(liftedAdd(Identity(40), Identity(2)), Identity(42)); });

});

describe('Maybe', () => {

  it('show Nothing',
     () => { eq(String(Nothing), 'Nothing'); });

  it('show (Just [1,2,3])',
     () => { eq(String(Just([1, 2, 3])), 'Just([1, 2, 3])'); });

  it('(+ 1) <$> Nothing',
     () => { eq(map(inc, Nothing), Nothing); });

  it('(+ 1) <$> Just 42',
     () => { eq(map(inc, Just(42)), Just(43)); });

  it('Nothing <*> Nothing',
     () => { eq(ap(Nothing, Nothing), Nothing); });

  it('Nothing <*> Just 42',
     () => { eq(ap(Nothing, Just(42)), Nothing); });

  it('Just (+ 1) <*> Nothing',
     () => { eq(ap(Just(inc), Nothing), Nothing); });

  it('Just (+ 1) <*> Just 42',
     () => { eq(ap(Just(inc), Just(42)), Just(43)); });

  it('liftA (+ 1) Nothing',
     () => { eq(liftedInc(Nothing), Nothing); });

  it('liftA (+ 1) (Just 42)',
     () => { eq(liftedInc(Just(42)), Just(43)); });

  it('liftA2 (+) Nothing Nothing',
     () => { eq(liftedAdd(Nothing, Nothing), Nothing); });

  it('liftA2 (+) Nothing (Just 2)',
     () => { eq(liftedAdd(Nothing, Just(2)), Nothing); });

  it('liftA2 (+) (Just 40) Nothing',
     () => { eq(liftedAdd(Just(40), Nothing), Nothing); });

  it('liftA2 (+) (Just 40) (Just 2)',
     () => { eq(liftedAdd(Just(40), Just(2)), Just(42)); });

});

describe('List', () => {

  it('show []',
     () => { eq(String(Nil), 'Nil'); });

  it('show [1,2,3]',
     () => { eq(String(Cons(1, Cons(2, Cons(3, Nil)))), 'Cons(1, Cons(2, Cons(3, Nil)))'); });

  it('(+ 1) <$> []',
     () => { eq(map(inc, Nil), Nil); });

  it('(+ 1) <$> [1,2,3]',
     () => { eq(map(inc, Cons(1, Cons(2, Cons(3, Nil)))), Cons(2, Cons(3, Cons(4, Nil)))); });

  it('[] <*> []',
     () => { eq(ap(Nil, Nil), Nil); });

  it('[] <*> [1]',
     () => { eq(ap(Nil, Cons(1, Nil)), Nil); });

  it('[(+ 1)] <*> []',
     () => { eq(ap(Cons(inc, Nil), Nil), Nil); });

  it('[(+ 1),sqrt] <*> [1,25,100]',
     () => { eq(ap(Cons(inc, Cons(Math.sqrt, Nil)), Cons(1, Cons(25, Cons(100, Nil)))),
                Cons(2, Cons(26, Cons(101, Cons(1, Cons(5, Cons(10, Nil))))))); });

  it('liftA (+ 1) []',
     () => { eq(liftedInc(Nil), Nil); });

  it('liftA (+ 1) [1,2,3]',
     () => { eq(liftedInc(Cons(1, Cons(2, Cons(3, Nil)))), Cons(2, Cons(3, Cons(4, Nil)))); });

  it('liftA2 (+) [10,20] [1,2,3]',
     () => { eq(liftedAdd(Cons(10, Cons(20, Nil)), Cons(1, Cons(2, Cons(3, Nil)))),
                Cons(11, Cons(12, Cons(13, Cons(21, Cons(22, Cons(23, Nil))))))); });

});

describe('ZipList', () => {

  it('show (ZipList [])',
     () => { eq(String(ZipList(Nil)), 'ZipList(Nil)'); });

  it('show (ZipList [1,2,3])',
     () => { eq(String(ZipList(Cons(1, Cons(2, Cons(3, Nil))))), 'ZipList(Cons(1, Cons(2, Cons(3, Nil))))'); });

  it('(+ 1) <$> ZipList []',
     () => { eq(map(inc, ZipList(Nil)), ZipList(Nil)); });

  it('(+ 1) <$> ZipList [1,2,3]',
     () => { eq(map(inc, ZipList(Cons(1, Cons(2, Cons(3, Nil))))), ZipList(Cons(2, Cons(3, Cons(4, Nil))))); });

  it('ZipList [] <*> ZipList []',
     () => { eq(ap(ZipList(Nil), ZipList(Nil)), ZipList(Nil)); });

  it('ZipList [] <*> ZipList [1]',
     () => { eq(ap(ZipList(Nil), ZipList(Cons(1, Nil))), ZipList(Nil)); });

  it('ZipList [(+ 1)] <*> ZipList []',
     () => { eq(ap(ZipList(Cons(inc, Nil)), ZipList(Nil)), ZipList(Nil)); });

  it('ZipList [(+ 1),sqrt] <*> ZipList [1]',
     () => { eq(ap(ZipList(Cons(inc, Cons(Math.sqrt, Nil))), ZipList(Cons(1, Nil))),
                ZipList(Cons(2, Nil))); });

  it('ZipList [(+ 1),sqrt] <*> ZipList [1,25]',
     () => { eq(ap(ZipList(Cons(inc, Cons(Math.sqrt, Nil))), ZipList(Cons(1, Cons(25, Nil)))),
                ZipList(Cons(2, Cons(5, Nil)))); });

  it('ZipList [(+ 1),sqrt] <*> ZipList [1,25,100]',
     () => { eq(ap(ZipList(Cons(inc, Cons(Math.sqrt, Nil))), ZipList(Cons(1, Cons(25, Cons(100, Nil))))),
                ZipList(Cons(2, Cons(5, Nil)))); });

  it('liftA (+ 1) (ZipList [])',
     () => { eq(liftedInc(ZipList(Nil)), ZipList(Nil)); });

  it('liftA (+ 1) (ZipList [1,2,3])',
     () => { eq(liftedInc(ZipList(Cons(1, Cons(2, Cons(3, Nil))))), ZipList(Cons(2, Cons(3, Cons(4, Nil))))); });

  it('liftA2 (+) (ZipList [10,20]) (ZipList [1,2,3])',
     () => { eq(liftedAdd(ZipList(Cons(10, Cons(20, Nil))), ZipList(Cons(1, Cons(2, Cons(3, Nil))))),
                ZipList(Cons(11, Cons(22, Nil)))); });

});
