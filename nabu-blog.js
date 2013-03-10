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

var contentFolder = '_posts';

/**
 * parse and individual file
 * @param  {string}   sourcePath path to source
 * @param  {Function} callback  
 */
var parseFile = function(post, callback){
  post.date = moment(post.date);
  post.slug = _.slugify(post.title);
  
  //TODO: Actually obey permalink setting
  post.permalink = post.slug + '/';
  
  callback(null, post);
};

exports.parse = function(nabu, callback) {
  var posts = nabu.files.findInFolder(nabu._files, contentFolder);

  this.steps = function(post, callback){
    nabu.parse(post, function(err, post){
      parseFile(post, callback);
    });
  };

  async.map(posts, this.steps, function(err, results){
    nabu.site.posts = results.reverse();
    callback(err, nabu);
  });
};