/**
 * Start a fleet drone process in the ./drone/ directory
 */
var fs = require('fs')
var assert = require('assert')
var spawn = require('child_process').spawn
var path = require('path')
var should = require('should');
var inspect = require('eyespect').inspector();
var startDrone = function startDrone(data) {
  var config = data.config
  var droneDir = path.join(__dirname, 'drone')
  assert.ok(fs.existsSync(droneDir, 'drone dir does not exist on disk: ' + droneDir))
  var fleetConfig = config.get('fleet')
  should.exist(fleetConfig, 'fleet missing from config')
  var secret = fleetConfig.secret
  var host = fleetConfig.host
  var port = fleetConfig.port
  var hub = [host, port].join(':')
  process.chdir(droneDir)
  var cmd = 'fleet-drone'
  var args = ['--hub', hub, '--secret', secret, '--name', 'drone1']
  // pipe all stdio to the parent process
  var opts = {}
  var child = spawn(cmd, args, opts)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stdout.on('data', function (data) {
    inspect('drone stdout')
    console.log(data)
  })
  child.on('error', function (err) {
    inspect(err, 'fleet drone error')
    should.not.exist(err, 'error running fleet drone: ' + JSON.stringify(err, null, ' '))
  })
  return child
}
module.exports = startDrone
