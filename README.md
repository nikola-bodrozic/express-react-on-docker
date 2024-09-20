# Full Stack

Express server & React TypeScript on Docker. 

## Prepare

For prod environment you need to set public IP or domain in react/package.json

```
"build": "REACT_APP_NODE_IP=nnn.nnn.nnn.nnn:3008 react-scripts build",
```

and start docker stack

```sh
docker compose up
```

## Nodejs

Express server with API endpoints at 
- <http://localhost:3008/api/v1/users> gets users
- <http://localhost:3008/api/v1/users/:id> gets user

## React

Production build is running on <http://localhost> after `docker-compose up` 

It calls Nodejs service to get data from the API endpoints.

## Debug locally react app

- install `Debugger for Chrome` on Code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
