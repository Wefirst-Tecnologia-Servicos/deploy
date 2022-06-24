const config = require("./config.json");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

const menuRoutes = require('./routes/menu');
const translationRoutes = require('./routes/dictionary');
const emailRoutes = require('./routes/email');
const exchangeRoutes = require('./routes/exchange');

const app = express();

app.use(cors((req, callback) => {
    var allowedOrigin = false;
    if (config.http.cors.allowedOrigins.indexOf("*") > -1) {
        allowedOrigin = true;
    } else {
        for (var i = 0; i < config.http.cors.allowedOrigins.length; i++) {
            if (config.http.cors.allowedOrigins[i] == req.header('Origin')) {
                allowedOrigin = true;
            }
        }
    }
    callback(null, { origin: allowedOrigin });
}));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", menuRoutes);
app.use("/", translationRoutes);
app.use("/", emailRoutes);
app.use("/", exchangeRoutes);

app.listen(config.http.port, config.http.host, () => {
    console.log(config.trace.displayMessage.replace("{port}", config.http.port));
});