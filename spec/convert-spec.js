var convert = require('../src/convert.js');

describe('convert', function() {

  describe('toObject', function() {

    it('should throw an exception if not passed a string', function() {

      var caught = null;
      try {
        convert.toObject({});
      } catch (e) {
        caught = e;
      }

      expect(caught).toBe('Error: toObject() requires a string input');
    });

    it('should convert INI to object removing spaces', function() {

      var o = convert.toObject('   key1=   value1\nkey2    = value2     ');
      expect(o).toEqual({
        key1: 'value1',
        key2: 'value2'
      });
    });

    it('should ignore comment lines', function() {

      var o = convert.toObject('  ;k1=v1\nk2=v2\n;k3=v3');
      expect(o).toEqual({
        k2: 'v2'
      });
    });

    it('should discard string wrappings', function() {

      var o = convert.toObject('a = " value for a " \n b="value for b"\nc="\nd=""');
      expect(o).toEqual({
        a: ' value for a ',
        b: 'value for b',
        c: '"',
        d: ''
      });
    });

    it('should convert "."s to path', function() {

      var o = convert.toObject('one.two.three=a\none.two.three=b');
      expect(o).toEqual({
        one: {
          two: {
            three: 'a',
            three: 'b'
          }
        }
      });
    });
  });
});
