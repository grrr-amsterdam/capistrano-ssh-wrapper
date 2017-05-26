#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const shell     = require('shelljs')
const fs        = require('fs')
const parser    = require('./parser.js')

module.exports = {
    
    findSshConfig: function(target) {
        var cmd = 'find . -name ' + target + '.rb'

        var paths = shell.exec(cmd, {silent:true}).stdout
        if (paths.length == 0) {
            return false
        }

        var path = paths.split("\n")[0]

        if (path) {
            content = fs.readFileSync(path, {encoding: 'utf-8'})
            config = parser.parseSshConfig(content)

            return config
        }

        return false
    },

}
