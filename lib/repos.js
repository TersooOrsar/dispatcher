var async = require('async')
var fs = require('fs')
var path = require('fs')
var inspect = require('eyespect').inspector();
var getRepoNames = require('./getRepoNames')
var config = require('nconf')
module.exports = function (req, res) {
  getRepoNames(function (err, reply) {
    if (err) {
      req.session.error = 'Error getting repos, please try again later'
      return res.redirect('/ps')
    }
    res.render('repos', {title: 'Repos', repos: reply})
  })
}