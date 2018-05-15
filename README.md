# netdiscover-node

A simple nodejs wrapper around the netdiscover tool

# Installation
First ensure `netdiscover` is installed on your system. Then install the nodejs netdiscover module.

# Usage
## One Time Scan
```javascript
const netdiscover = require('netdiscover-node')

netdiscover.scan(options).then((hosts) => {
  console.log(hosts)
  // [{ ip: '', mac: '', count: '', len: '', vendor: ''}, ...]
})
```

## Persistent Scan
```javascript
const netdiscover = require('netdiscover-node')

netdiscover.on('newHost', (host) => {
  console.log(host)
  // { ip: '', mac: '', count: '', len: '', vendor: ''}
})
netdiscover.start(options)
```

# Options
| Option  | CLI command | Data Type | About |
| ------- | ----------- | --------- | ----- |
| interface  | `-i` | string | Which device to scan |
| range | `-r` | string | A range of ip addresses to scan |
| passive | `-p` | boolean | Whether or not to scan in passive mode |
| fastmode | `-f` | boolean | Whether or not to scan in fast mode |

Read more about what these mean [here](https://github.com/alexxy/netdiscover) 
