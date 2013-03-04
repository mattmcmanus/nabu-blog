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
 * process and individual file
 * @param  {string}   sourcePath path to source
 * @param  {Function} callback  
 */
var processFile = function(post, callback){
  if (post.date) {
    post.date = moment(post.date);
  }

  post.slug = _.slugify(post.title);
  //TODO: Actually obey permalink setting
  post.permalink = post.slug + '/';
  
  callback(null, post);
};

exports.processFiles = function(nabu, callback) {
  var posts = nabu.utils.findFilesInFolder(nabu.files, contentFolder);

  // Update file list
  nabu.files = nabu.utils.removePaths(nabu.files, posts);
  
  // Steps to go through to process the file
  this.steps = function(post, callback){
    async.waterfall([
      function(callback) { nabu.processFile(post, callback); },
      function(file, callback) { nabu.processMarkdownFile(file, callback); },
      function(file, callback) { processFile(file, callback); }
    ], 
    function(err, results) {
      callback(err, results);
    });
  };

  async.map(posts, this.steps, function(err, results){
    nabu.site.posts = results.reverse();
    callback(err, nabu);
  });
};