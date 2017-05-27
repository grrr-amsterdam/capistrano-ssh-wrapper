#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const sshwrap   = require('ssh-wrapper')
const config    = require('capistrano-config')

var wrapper = module.exports = {

    /**
     * Executes a shell command over SSH, using local Capistrano configuration.
     * @param   String  target  Target environment name
     * @param   String  command Command to execute
     * @return  Promise
     */
    exec: function(target, command) {
        if (!target) {
            return Promise.reject('No target environment name given.')
        }

        if (!command) {
            return Promise.reject('No command given to execute.')
        }

        var ssh_config = config.getConfig(target)
        if (!ssh_config) {
            return Promise.reject('No Capistrano SSH config was found.')
        }

        return sshwrap.exec(ssh_config, 'cd ' + ssh_config.dir + ' && ' + command)
    },


    /**
     * Returns the content of a file over SSH, using local Capistrano configuration.
     * @param   String  target  Target environment name
     * @param   String  path    Path to file, absolute or relative to the Capistrano path
     * @return Promise
     */
    getFile: function(target, path) {
        return wrapper.exec(target, 'cat ' + path)
    }

};
