#!/usr/bin/env node

var program = require('commander');

const vallox = require('../index');
const WebSocket = require('ws');

program
    .command('set')
    .option('-k, --key [key]', 'Key', vallox.VlxDevConstants.A_CYC_HOME_SPEED_SETTING)
    .option('-v, --value [value]', 'Value')
    .option('-w, --websocket [value]', 'Websocket', 'ws://kwl:80/')
    .action(function(program) {
        if (!program.key) {
            console.error('No key given');
            process.exit(1);
        }
        if (!program.value) {
            console.error('No value given');
            process.exit(1);
        }
        console.log(program.key + ': ' + program.value);
        var ws = new WebSocket(program.websocket);
        ws.on('open', function open() {
            vallox.setValue(ws, program.key, program.value);
            console.log('Done');
            process.exit(0);
        });
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp()
}
