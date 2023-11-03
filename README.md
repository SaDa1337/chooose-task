

## Running apps in dev mode

### Prerequisites to run locally
.NET 7
npm 8+
nodejs 16+

### server
To run the server in dev mode:
1. Open a command prompt 
2. navigate to `/server` 
3. run `dotnet run --launch-profile https`

You should be presented with a message that the server is accepting traffic on https://localhost:7188

### client
To run the client in dev mode:
1. Open a command prompt 
2. navigate to `/client`
3. run `npm ci`
4. run `npm run start` 

A browser window with the application running on http://localhost:3000 should open.


## Running apps with docker

1. Open a command prompt 
2. run `docker-compose up --build`
3. Navigate in your browser to http://localhost:3001

