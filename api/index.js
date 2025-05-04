// api/index.js
require('dotenv').config();
const app = require('../app');
const { sequelize } = require('../src/models');

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    console.log(`Swagger running on http://localhost:${PORT}/docs`);
  });
});
