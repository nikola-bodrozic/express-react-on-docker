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
- GET <http://localhost:3008/api/v1/users> gets users
- POST <http://localhost:3008/api/v1/users/> send user id

## React

Development build <http://localhost:3000>

Production build is running on <http://localhost> and is generated after `docker compose up` 

