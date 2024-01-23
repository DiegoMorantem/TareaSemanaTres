const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/categoria'));
app.use(require('./routes/producto'));
app.use(require('./routes/usuario'));  // Agrega las rutas de usuario
app.use(require('./routes/rol'));      // Agrega las rutas de rol

app.listen(3000);
console.log('Server on port 3000');