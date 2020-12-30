const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const APIRoutes = require('./backend/routes/api.routes');
const FrontendRoutes = require('./backend/routes/frontend.routes');

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use('/api', APIRoutes.getRouter());
app.use('', FrontendRoutes.getRouter());

const port = 7800;
const server = app.listen(port, () => {
  console.log(`Go to http://localhost:${port}`);
});
