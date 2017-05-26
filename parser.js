#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

var parser = module.exports = {
    parseSshConfig: function(content) {
        var lines = content.split("\n")
        var config = {}

        for (l in lines) {
            var parsed = parser._parseSshConfigLine(lines[l])
            for (p in parsed) {
                config[p] = parsed[p]
            }
        }

        return config
    },

    _parseSshConfigLine: function(line) {
        if (line.startsWith('server')) {
            var parsed = parser._parseSshServerLine(line)
            if (!parsed) {
                parsed = parser._parseSshServerSeparateUserLine(line)
            }

            return parsed
        }

        if (line.startsWith('set :deploy_to')) {
            return parser._parseSshDeployLine(line)
        }
    },

    _parseSshServerLine: function(line) {
        var userhost = /server ['"]+(.*)@(.*)['"]+/g;
        var match = userhost.exec(line);

        if (!match || match.length < 2) {
            return
        }

        return {
            user: match[1],
            host: match[2]
        }
    },

    _parseSshServerSeparateUserLine: function(line) {
        var userhost = /server ['"]+(.*)['"]+user: ['"]+(.*)['"]/g;
        var match = userhost.exec(line);

        if (!match || match.length < 2) {
            return
        }

        return {
            host: match[1],
            user: match[2]
        }
    },

    _parseSshDeployLine: function(line) {
        var dir = /:deploy_to, ['"]+(.*)['"]+/g;
        var match = dir.exec(line);
        if (match.length < 1) {
            var e = 'Could not find SSH deploy dir config.'
            error.exit(e)
        }

        return {
            dir: match[1]
        }
    }
};

