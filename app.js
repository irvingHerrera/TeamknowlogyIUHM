// Requies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { API_VERSION, IP_SERVER, PORT_DB, PORT_SERVER } = require('./config/config');
const port = process.env.PORT || PORT_SERVER;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// inicializar variables
const app = express();

// Load routings
const emailRoutes = require('./routes/sendEmail');
const mutationRoutes = require('./routes/mutation');

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

  // config body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router Basic
app.use(`/api/${API_VERSION}`, emailRoutes);
app.use(`/api/${API_VERSION}`, mutationRoutes);
 console.log(process.env.MONGO_URL);
 
// Connection DB and Server


mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URL || `mongodb://${IP_SERVER}:${PORT_DB}/dbTest`, 
{useNewUrlParser: true, useUnifiedTopology: true}, (err, rest) => {
    if(err) {
        throw err;
    } else {
        console.log('conection success');
        app.listen(port, () => {
          console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
    }
});