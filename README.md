#Fileserve

##Description
Node server for sharing files in local network. Secured by basic authorization. 

##Prerequisites

- Node.js 

##Installation

`npm install -g fileserve`

## Run

`fileserve --username yourusername --password yourpassword  --port 9999 --filepath  /path/to/file/directory` 

##Options

| Parameter        | Type           | Default  |
| ------------- |:-------------:| -----:|
| username      | String| kangaroo|
| password     | String      |   elephant |
| port | Number      |    3000 |
| filepath | String      |    package directory |

## Technologies
- Node.js
- ES6 with babel compilation
- Mocha testing