'use strict';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

//IMPORTANT! Change directories to the fixtures dir
process.chdir('./test/fixtures');

var nabu_blog = require('../nabu-blog.js');

var nabu = require('../../nabu');
var generator;

exports['nabu'] = {
  setUp: function(done) {
    generator = nabu();
    generator._files = [ './index.html.jade',
        './sample.md',
        './styles.css',
        './_layouts/default.jade',
        './_layouts/post.jade',
        './_posts/2012-12-1-sample1.md',
        './_posts/2013-01-12-sample2.md',
        './images/anchor-porter.jpg' ];
    generator.site.layouts = { post: './_layouts/post.jade' };
    done();
  },
  'parse': function(test) {
    test.expect(5); // There should be two blog posts to test
    
    generator.md = function(string) { test.ok(string, "A string of markdown to parse"); return "Markdowned!"; };

    nabu_blog(generator, function(err, result){
      test.ok(result.site.posts, "There shold be a nabu posts object");
      test.equal(result.site.posts.length, 2, "There shold be a nabu posts object");
      test.equal(result.site.posts[0].content, "Markdowned!", "The markdown was parsed");
      test.done();
    });
    
  },
  tearDown: function(done) {
    done();
  }
};
