const mongoose = require("mongoose");

//Funcion asincrona, por si puede tardar la conexion a la BD y que pueda funcionar el try y catch (que recupera el error)
const conexion = async() => {
    try{
        //conexion a la BD
        await mongoose.connect("mongodb://localhost:27017/mi_imagen");  //La ruta se puede encontrar en la App MongoDB Compass y luego colocar el nombre de la coleccion

        //Parametros dentro de objeto, en el caso de fallo de conexion
        //useNewUrlParser: true
        //useUnifiedTopoLogy: true
        //useCreateIndex: true

        console.log("Conectado Ok a la BD mi_imagen !!");
        console.log("");
        console.log("");

    } catch{
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");  //Es una excepcion del Error
    }
}


module.exports = {
    conexion
}