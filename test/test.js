const nd = require('../src/netdiscover.js')

// nd.scan({
//     interface: 'wlp2s0',
//     range: '192.168.1.0/24'
// }).then((h) => {
//     console.log(h)
// })

nd.on('newHost', (h) => {
    console.log(h)
})
nd.start({
    interface: 'wlp2s0',
    range: '192.168.1.0/24'
})

setInterval(() => {}, 5000)