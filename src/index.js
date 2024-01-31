const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/categoria'));
app.use(require('./routes/producto'));
app.use(require('./routes/usuario'));  
app.use(require('./routes/rol')); 
app.use(require('./routes/asignar_rol'));
app.use(require('./routes/bodega'));
app.use(require('./routes/repartidor')); 
app.use(require('./routes/asignar_repartidor'));
app.use(require('./routes/orden'));

app.listen(3000);
console.log('Server on port 3000');