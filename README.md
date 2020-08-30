# Travel App
In this application, you can plan your trips and travels by adding the list of your desired cities to visit on a certain date.

## Running Project
Once you clone project, you will need to install all the packages:
- `cd` into your new folder
- `npm install`

Setup your .env file (refer to `.env.example`):
- Create your `.env` file in the root directory of the project
- Set the values for `PORT`, `GEONAMES_API_USERNAME`, `WEATHER_BIT_API_KEY` and `PIXABAY_API_KEY`

After that, run the following commands to start the servers:
- Open a terminal and run: `npm run build-dev` or `npm run build` to start the frontend server
- Open another terminal and run: `npm start` to start the backend server

Now, you can easily visit the website on the port you specified in `.env` file: `http://localhost:[PORT]` and you can start testing it out.

Please note that service workers run in production build only. Since the webpack `WorkboxPlugin` plugin is imported in production mode. To test this, run the webpack build in production mode using the following command: `npm run build`
 
## Unit Tests
You can run unit tests using the following command:
- `npm run test`

## Production Environment
The application deployed using Heroku. You visit the page by clicking [here](https://ammalomari-travel-app.herokuapp.com/).