'use strict';

var nabu_blog = require('../nabu-blog.js');

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

console.log(process.cwd());

var nabu = require('../../nabu/lib/nabu');


nabu._files = [ './index.html.jade',
    './sample.md',
    './styles.css',
    './_layouts/default.jade',
    './_layouts/post.jade',
    './test/fixtures/_posts/2012-12-1-sample1.md',
    './test/fixtures/_posts/2013-01-12-sample2.md',
    './images/anchor-porter.jpg' ];
  
nabu.site.renderer = 'jade';
nabu.site.layouts = { post: './_layouts/post.jade' };

exports['nabu'] = {
  setUp: function(done) {
    done();
  },
  'parse': function(test) {
    test.expect(5); // There should be two blog posts to test
    
    nabu.md = function(string) { test.ok(string, "A string of markdown to parse"); return "Markdowned!"; };

    nabu_blog.parse(nabu, function(err, nabu){
      test.ok(nabu.site.posts, "There shold be a nabu posts object");
      test.equal(nabu.site.posts.length, 2, "There shold be a nabu posts object");
      test.equal(nabu.site.posts[0].content, "Markdowned!", "The markdown was parsed");

      // test.ok((nabu.site.length > 0), "There shold be at least 1 page");
      test.done();
    });
    
  },
  tearDown: function(done) {
    done();
  }
};
