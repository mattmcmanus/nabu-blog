'use strict';
/*
 * nabu-pages
 * https://github.com/mattmcmanus/nabu-cli
 *
 * Copyright (c) 2013 Matt McManus
 * Licensed under the MIT license.
 */

// Modules
var path = require('path'),
    fs = require('fs'),
    async = require('async'),
    _ = require('underscore'),
    moment = require('moment');
    _.str = require('underscore.string');
    _.mixin(_.str.exports());

exports = module.exports = parse;

/**
 * parse and individual file
 * @param  {string}   sourcePath path to source
 * @param  {Function} callback  
 */
var parseFile = function(post, nabu, callback){
  post.date = moment(post.date);
  post.year = post.date.year();
  post.month = post.date.month()+1;
  post.day = post.date.date();
  
  //post.permalink = nabu.permalink(post);
  
  callback(null, post);
};

function parse(nabu, callback) {
  var posts = nabu.files.findInFolder(nabu._files, '_posts');

  async.map(posts, function (post, callback){
    nabu.parse(post, function(err, post){
      parseFile(post, nabu, callback);
    });
  }, function(err, results){
    nabu.site.posts = results.reverse();
    callback(err, nabu);
  });
}