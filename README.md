# SSH Wrapper
[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/capistrano-ssh-wrapper.svg)](https://greenkeeper.io/)


# Methods
## `.exec(string target, string command)`
Executes a command over SSH.
Expects a target name of the environment.
It will look for `[environment name].rb` for a Capistrano configuration in your local path.

It will then execute a one-off `command` over SSH.

Returns a Promise containing the stdout output, or stderr in case of an error.

For now, it expects you to authenticate with a private key in `~/.ssh/id_rsa`.

## `.getFile(string target, string path)`
Returns the content of a file over SSH.
Expects a target name of the environment.
It will look for `[environment name].rb` for a Capistrano configuration in your local path.

Returns a Promise containing the stdout output, or stderr in case of an error.

For now, it expects you to authenticate with a private key in `~/.ssh/id_rsa`.
