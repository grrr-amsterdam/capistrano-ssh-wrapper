#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const sshwrap   = require('ssh-wrapper')
const config    = require('./config.js')

var wrapper = module.exports = {

    /**
     * Throws an error if configuration was not found.
     * @return Promise
     */
    exec: function(target, command) {
        var ssh_config = config.findSshConfig(target)
        if (!ssh_config) {
            return Promise.reject('No Capistrano SSH config was found.')
        }

        return sshwrap.exec(ssh_config, command)
    }

};
