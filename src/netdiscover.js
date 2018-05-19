const { exec, spawn } = require('child_process')

// mapps the passed in options into their cli counterparts
const optionsMapper = {
    interface: '-i',
    range: '-r',
    passive: '-p',
    fastmode: '-f'
}

// the spawned process
let discover;

function parseLine(line){
    let parts = /([^ ]*) *([^ ]*) *([^ ]*) *([^ ]*) *(.*)/gmi.exec(line.trim())

    return {
        ip: parts[1],
        mac: parts[2],
        count: parts[3],
        len: parts[4],
        vendor: parts[5]
    }
    
}

function parseOptions(options) {
    let parsedOptions = Object.keys(options).map(key => {
        if (optionsMapper.hasOwnProperty(key)){
            if (typeof options[key] === 'boolean'){
                return optionsMapper[key]
            } else {
                return `${optionsMapper[key]} ${options[key]}`
            }
        } else {
            throw Error(`Unsupported option ${key}`)
        }
    })

    return parsedOptions.join(' ')
}

function onData(data) {
    events.newHost(parseLine(data.toString()))
}

function onError(data) {
   
}

function onClose(code) {

}

let events = {
    'newHost': () => {}
}
module.exports = {
    scan: (options) => {
        return new Promise((resolve, reject) => {
            console.log(parseOptions(options))
            exec(`netdiscover ${parseOptions(options)} -N -P`, (error, stdout, stderr) => {
                let parsedOutput = stdout.trim().split('\n')

                // remove last two lines which contain summaries and whitspace
                parsedOutput.pop()
                parsedOutput.pop()

                parsedOutput = parsedOutput.map(el => {
                    return parseLine(el)
                })

                resolve(parsedOutput)
            })
        })
    },
    start: async (options) => {
        let parsedOptions = parseOptions(options).split(' ')
        parsedOptions = parsedOptions.concat(['-N', '-L'])

        discover = spawn(`netdiscover`, parsedOptions)

        discover.stdout.on('data', onData);
        discover.stderr.on('data', (err) => {
             throw new Error(err)
        });
        discover.on('close', onClose);
    },
    stop: () => {
        if (discover){
            discover.kill()
            discover = null
        }
    },
    on: (eventName, funct) => {
        if (events.hasOwnProperty(eventName)){
            events[eventName] = funct
        } else {
            throw new Error(`No event with the name: ${eventName} found`)
        }
    }
}