/*!
 * Module dependencies.
 *
 * Chai is automatically included in the browser.
 */

if (!chai) {
  var chai = require('..');
}

var assert = chai.assert;

function err(fn, msg) {
  try {
    fn();
    throw new chai.AssertionError({ message: 'Expected an error' });
  } catch (err) {
    assert.equal(msg, err.message);
  }
}

suite('assert', function () {

  test('assert', function () {
    var foo = 'bar';
    assert(foo == 'bar', "expected foo to equal `bar`");

    err(function () {
      assert(foo == 'baz', "expected foo to equal `bar`");
    }, "expected foo to equal `bar`");
  });

  test('fail', function () {
    chai.expect(function () {
      assert.fail();
    }).to.throw(chai.AssertionError);
  });

  test('isTrue', function () {
    assert.isTrue(true);

    err(function() {
      assert.isTrue(false);
    }, "expected false to be true");

    err(function() {
      assert.isTrue(1);
    }, "expected 1 to be true");

    err(function() {
      assert.isTrue('test');
    }, "expected 'test' to be true");
  });

  test('ok', function () {
    assert.ok(true);
    assert.ok(1);
    assert.ok('test');

    err(function () {
      assert.ok(false);
    }, "expected false to be truthy");

    err(function () {
      assert.ok(0);
    }, "expected 0 to be truthy");

    err(function () {
      assert.ok('');
    }, "expected '' to be truthy");
  });

  test('isFalse', function () {
    assert.isFalse(false);

    err(function() {
      assert.isFalse(true);
    }, "expected true to be false");

    err(function() {
      assert.isFalse(0);
    }, "expected 0 to be false");
  });

  test('equal', function () {
    var foo;
    assert.equal(foo, undefined);
  });

  test('typeof / notTypeOf', function () {
    assert.typeOf('test', 'string');
    assert.typeOf(true, 'boolean');
    assert.typeOf(5, 'number');

    err(function () {
      assert.typeOf(5, 'string');
    }, "expected 5 to be a string");

  });

  test('notTypeOf', function () {
    assert.notTypeOf('test', 'number');

    err(function () {
      assert.notTypeOf(5, 'number');
    }, "expected 5 not to be a number");
  });

  test('instanceOf', function() {
    function Foo(){}
    assert.instanceOf(new Foo(), Foo);

    err(function () {
      assert.instanceOf(5, Foo);
    }, "expected 5 to be an instance of Foo");

    function CrashyObject() {};
    CrashyObject.prototype.inspect = function () {
      throw new Error("Arg's inspect() called even though the test passed");
    };
    assert.instanceOf(new CrashyObject(), CrashyObject);
  });

  test('notInstanceOf', function () {
    function Foo(){}
    assert.notInstanceOf(new Foo(), String);

    err(function () {
      assert.notInstanceOf(new Foo(), Foo);
    }, "expected {} to not be an instance of Foo");
  });

  test('isObject', function () {
    function Foo(){}
    assert.isObject({});
    assert.isObject(new Foo());

    err(function() {
      assert.isObject(true);
    }, "expected true to be an object");

    err(function() {
      assert.isObject(Foo);
    }, "expected [Function: Foo] to be an object");

    err(function() {
      assert.isObject('foo');
    }, "expected 'foo' to be an object");
  });

  test('isNotObject', function () {
    function Foo(){}
    assert.isNotObject(5);

    err(function() {
      assert.isNotObject({});
    }, "expected {} not to be an object");
  });

  test('notEqual', function() {
    assert.notEqual(3, 4);

    err(function () {
      assert.notEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  test('strictEqual', function() {
    assert.strictEqual('foo', 'foo');

    err(function () {
      assert.strictEqual('5', 5);
    }, "expected \'5\' to equal 5");
  });

  test('notStrictEqual', function() {
    assert.notStrictEqual(5, '5');

    err(function () {
      assert.notStrictEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  test('deepEqual', function() {
    assert.deepEqual({tea: 'chai'}, {tea: 'chai'});

    err(function () {
      assert.deepEqual({tea: 'chai'}, {tea: 'black'});
    }, "expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");
  });

  test('notDeepEqual', function() {
    assert.notDeepEqual({tea: 'jasmine'}, {tea: 'chai'});

    err(function () {
      assert.notDeepEqual({tea: 'chai'}, {tea: 'chai'});
    }, "expected { tea: \'chai\' } to not deeply equal { tea: \'chai\' }");
  });

  test('isNull', function() {
    assert.isNull(null);

    err(function () {
      assert.isNull(undefined);
    }, "expected undefined to equal null");
  });

  test('isNotNull', function() {
    assert.isNotNull(undefined);

    err(function () {
      assert.isNotNull(null);
    }, "expected null to not equal null");
  });

  test('isUndefined', function() {
    assert.isUndefined(undefined);

    err(function () {
      assert.isUndefined(null);
    }, "expected null to equal undefined");
  });

  test('isDefined', function() {
    assert.isDefined(null);

    err(function () {
      assert.isDefined(undefined);
    }, "expected undefined to not equal undefined");
  });

  test('isFunction', function() {
    var func = function() {};
    assert.isFunction(func);

    err(function () {
      assert.isFunction({});
    }, "expected {} to be a function");
  });

  test('isNotFunction', function () {
    assert.isNotFunction(5);

    err(function () {
      assert.isNotFunction(function () {});
    }, "expected [Function] not to be a function");
  });

  test('isArray', function() {
    assert.isArray([]);
    assert.isArray(new Array);

    err(function () {
      assert.isArray({});
    }, "expected {} to be an array");
  });

  test('isNotArray', function () {
    assert.isNotArray(3);

    err(function () {
      assert.isNotArray([]);
    }, "expected [] not to be an array");

    err(function () {
      assert.isNotArray(new Array);
    }, "expected [] not to be an array");
  });

  test('isString', function() {
    assert.isString('Foo');
    assert.isString(new String('foo'));

    err(function () {
      assert.isString(1);
    }, "expected 1 to be a string");
  });

  test('isNotString', function () {
    assert.isNotString(3);
    assert.isNotString([ 'hello' ]);

    err(function () {
      assert.isNotString('hello');
    }, "expected 'hello' not to be a string");
  });

  test('isNumber', function() {
    assert.isNumber(1);
    assert.isNumber(Number('3'));

    err(function () {
      assert.isNumber('1');
    }, "expected \'1\' to be a number");
  });

  test('isNotNumber', function () {
    assert.isNotNumber('hello');
    assert.isNotNumber([ 5 ]);

    err(function () {
      assert.isNotNumber(4);
    }, "expected 4 not to be a number");
  });

  test('isBoolean', function() {
    assert.isBoolean(true);
    assert.isBoolean(false);

    err(function () {
      assert.isBoolean('1');
    }, "expected \'1\' to be a boolean");
  });

  test('isNotBoolean', function () {
    assert.isNotBoolean('true');

    err(function () {
      assert.isNotBoolean(true);
    }, "expected true not to be a boolean");

    err(function () {
      assert.isNotBoolean(false);
    }, "expected false not to be a boolean");
  });

  test('include', function() {
    assert.include('foobar', 'bar');
    assert.include([ 1, 2, 3], 3);

    err(function () {
      assert.include('foobar', 'baz');
     }, "expected \'foobar\' to contain \'baz\'");
  });

  test('lengthOf', function() {
    assert.lengthOf([1,2,3], 3);
    assert.lengthOf('foobar', 6);

    err(function () {
      assert.lengthOf('foobar', 5);
     }, "expected 'foobar' to have a length of 5 but got 6");

    err(function () {
      assert.lengthOf(1, 5);
     }, "expected 1 to have a property \'length\'");
  });

  test('match', function () {
    assert.match('foobar', /^foo/);
    assert.notMatch('foobar', /^bar/);

    err(function () {
      assert.match('foobar', /^bar/i);
    }, "expected 'foobar' to match /^bar/i");

    err(function () {
      assert.notMatch('foobar', /^foo/i);
    }, "expected 'foobar' not to match /^foo/i");
  });

  test('property', function () {
    var obj = { foo: { bar: 'baz' } };
    var simpleObj = { foo: 'bar' };
    assert.property(obj, 'foo');
    assert.deepProperty(obj, 'foo.bar');
    assert.notProperty(obj, 'baz');
    assert.notProperty(obj, 'foo.bar');
    assert.notDeepProperty(obj, 'foo.baz');
    assert.deepPropertyVal(obj, 'foo.bar', 'baz');
    assert.deepPropertyNotVal(obj, 'foo.bar', 'flow');

    err(function () {
      assert.property(obj, 'baz');
    }, "expected { foo: { bar: 'baz' } } to have a property 'baz'");

    err(function () {
      assert.deepProperty(obj, 'foo.baz');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.baz'");

    err(function () {
      assert.notProperty(obj, 'foo');
    }, "expected { foo: { bar: 'baz' } } to not have property 'foo'");

    err(function () {
      assert.notDeepProperty(obj, 'foo.bar');
    }, "expected { foo: { bar: 'baz' } } to not have deep property 'foo.bar'");

    err(function () {
      assert.propertyVal(simpleObj, 'foo', 'ball');
    }, "expected { foo: 'bar' } to have a property 'foo' of 'ball', but got 'bar'");

    err(function () {
      assert.deepPropertyVal(obj, 'foo.bar', 'ball');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.bar' of 'ball', but got 'baz'");

    err(function () {
      assert.propertyNotVal(simpleObj, 'foo', 'bar');
    }, "expected { foo: 'bar' } to not have a property 'foo' of 'bar'");

    err(function () {
      assert.deepPropertyNotVal(obj, 'foo.bar', 'baz');
    }, "expected { foo: { bar: 'baz' } } to not have a deep property 'foo.bar' of 'baz'");
  });

  test('throws', function() {
    assert.throws(function() { throw new Error('foo'); });
    assert.throws(function() { throw new Error('bar'); }, 'foo');

    err(function () {
      assert.throws(function() {});
     }, "expected [Function] to throw an error");
  });

  test('doesNotThrow', function() {
    assert.doesNotThrow(function() { });
    assert.doesNotThrow(function() { }, 'foo');

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); });
     }, 'expected [Function] to not throw an error but [Error: foo] was thrown');
  });

  test('ifError', function() {
    assert.ifError(false);
    assert.ifError(null);
    assert.ifError(undefined);

    err(function () {
      assert.ifError('foo');
     }, "expected \'foo\' to be falsy");
  });

  test('operator', function() {
    assert.operator(1, '<', 2);
    assert.operator(2, '>', 1);
    assert.operator(1, '==', 1);
    assert.operator(1, '<=', 1);
    assert.operator(1, '>=', 1);
    assert.operator(1, '!=', 2);
    assert.operator(1, '!==', 2);

    err(function () {
      assert.operator(1, '=', 2);
     }, 'Invalid operator "="');

    err(function () {
      assert.operator(2, '<', 1);
     }, "expected 2 to be < 1");

    err(function () {
      assert.operator(1, '>', 2);
     }, "expected 1 to be > 2");

    err(function () {
      assert.operator(1, '==', 2);
     }, "expected 1 to be == 2");

    err(function () {
      assert.operator(2, '<=', 1);
     }, "expected 2 to be <= 1");

    err(function () {
      assert.operator(1, '>=', 2);
     }, "expected 1 to be >= 2");

    err(function () {
      assert.operator(1, '!=', 1);
     }, "expected 1 to be != 1");

    err(function () {
      assert.operator(1, '!==', '1');
     }, "expected 1 to be !== \'1\'");
  });

  test('closeTo', function(){
    assert.closeTo(1.5, 1.0, 0.5);
    assert.closeTo(10, 20, 20);
    assert.closeTo(-10, 20, 30);

    err(function(){
      assert.closeTo(2, 1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");

    err(function(){
      assert.closeTo(-10, 20, 29);
    }, "expected -10 to be close to 20 +/- 29");
  });
});
