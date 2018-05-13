const { spawn } = require('child_process')

// the spawned process
let discover;

function onData(data) {

}

function onError(data) {

}

function onClose(code) {

}

let events = {
    'newHost': () => {}
}

module.exports = {
    start = () => {
        discover = spawn('netdiscover', [])

        discover.stdout.on('data', onData);
        discover.stderr.on('data', onError);
        discover.on('close', onClose);
    },
    on: (eventName, funct) => {
        if (events.hasOwnProperty(eventName)){
            events[eventName] = funct
        } else {
            throw new Error(`No event with the name: ${eventName} found`)
        }
    }
}