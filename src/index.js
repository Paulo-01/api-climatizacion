
//Definir protocolo http
var http = require('http');

//Definir las dependencias
//Se configura MongoDB de forma Local
//const { conexion } = require("../basedatos/conexion");  //es la importacion del archivo /basedatos/conexion.js

const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const File = require('./models/file');

//instancia de express
const app = express();

//Middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//Conectar a la Base de Datos - Conexion Local de MongoDB
//conexion();

//valida primero que si un proveedor hosting o de la nube le da un puerto (process.env.PORT)
//o de lo contrario utiliza el puerto 3000
const port = process.env.PORT || 3000;

//Esta conexion es para MongoDB Atlas Data|Cloud
const url = "mongodb+srv://pcca24:8sH8kFdxf1XKX8ze@cluster0.vnqhjif.mongodb.net/test?retryWrites=true&w=majority"
//const url = "mongodb://atlas-sql-64de387613055d5cca12facb-9quw3.a.query.mongodb.net/test?ssl=true&authSource=admin"


//confugurar cors; y se crea un middleware con "cors()"
app.use(cors());

mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, 'public')));

//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
app.use(bodyParser.urlencoded({ extended: false }));
//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json());

//Activar el CORS para permitir peticiones AJAX y HTTP desde el frontend.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB - Fuera Temporalmente
mongoose.connect(url, { useNewUrlParser: true }).then(() => {

    console.log('Conexión con la BD Atlas realizada con éxito!!!');

    app.listen(port, () => {
        //console.log('servidor ejecutándose en http://localhost:' + port);
        console.log('servidor ejecutándose para proyecto SubirImagen ') + port;
    });

});

//PASO 2 POST method route -----------------------------------------------
//Especificamos la dirección par recibir los datos del cliente ('/api/save')
//request: datos recibidos del cliente
//response: respuesta que enviamos al cliente

app.post('/api/save', (req, res) => {
    console.log('respuesta recibida');
    const data = req.body;
    console.log(data);

    //Se declara el Esquema en variable file
    var file = new File();

    //Asignamos los valores:
    file.title = data.title;
    file.description = data.description;
    file.image = data.image;

    file.save().then((fileStored) => {
        console.log('fileStored: ', fileStored);

        if (!fileStored) {
            return res.status(404).send({
                status: 'error',
                message: 'El post no se ha guardado !!!'
            });
        }

        // Devolver una respuesta 
        
        return res.status(200).send({
            status: 'success',
            fileStored
        });
    });
});

//Subida de imágenes - se guarda en la carpeta del proyecto "/public/images"
app.post('/api/saveImage', (req, res) => {
    const file = req.files.myFile;
    const fileName = req.files.myFile.name;
    const path = __dirname + '/public/images/' + fileName;
    console.log(path);

    file.mv(path, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
        return res.status(200).send({ status: 'success', path: 'public/images/' + fileName });
    });
});


//// -----CONSULTA A LA BDD------------------------------------------------

//GET method route
//recibimos la consulta desde el cliente y devolvemos los datos:
app.get('/api/files', (req, res) => {

    var query = File.find({});

    query.sort('-date').exec().then((imagenEncontrada) => {

        if (!imagenEncontrada) {
            return res.status(500).send({
                status: "error",
                message: "Error al extraer los datos"
            });
        }

        //Si no existen artículos:
        if (!imagenEncontrada) {
            return res.status(404).send({
                status: "error",
                message: "No hay posts para mostrar"
            });
        }

        return res.status(200).send({
            status: "success",
            imagenEncontrada
        });
    });
});

/**  
//Configuracion a MongoDB de forma Local
app.listen(port, () => {
    console.log('servidor ejecutándose en http://localhost:' + port);
})
*/

