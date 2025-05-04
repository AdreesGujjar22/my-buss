const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.route');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger-output.json')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send("App is Working...");
})
app.use('/api', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app;
