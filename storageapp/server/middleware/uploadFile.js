// Teoricamente lo que hace multer es actuar como middleware, es similar al middleware de json donde los datos de la petición vienen en ReadableStream y a través del Content-Type (indica el tipo de dato que viene) sabe que tiene que ejecutar ese middleware para convertir el ReadableStream que viene de la petición del navegador a un objeto json para que nosotros podamos trabajar con esa información, en el caso de multer nosotros tenemos que enviar los archivos en FormData para que este middleware transforme esa data (que podrían ser archivos o un simple string) que viene de la petición para que lo convierta directamente como archivo y se guarde en nuestro servidor o simplemente dejarlo en un buffer o manejarlo de cierta estructura, es decir, nosotros podemos decirle que hacer con esa data.

const multer = require("multer");

// multer.diskStorage es una función que nos permite guardar los archivos en el disco (quizas en una carpeta que definamos etc), es decir, en el disco se guarda como un archivo normal y luego tendremos que leerlo si queremos subirlo luego a cloud storage por ejemplo, en el caso de memoryStorage se guarda en un buffer y ya está ahí para tomarlo directamente.

// Si nosotros vamos a procesar archivos muy grandes, hablamos de gigas o algo así no se recomienda utilizar multer, ahí lo que se recomendaría es procesar el archivo como un Stream. La idea de los Stream es que mientras se recibe lo vayamos procesando, que no lo almacenemos en algun lugar. En el caso de tener que almacenarlo, en este caso vamos almacenar cada chunk en un buffer, pero ese buffer ocupa espacio en la memoria ram, si nosotros trabajamos con archivos muy grandes, por ejemplo, digamos que estamos transfiriendo un archivo de 10 gb, pues tendríamos que tener 10 gb de memoria ram para almacenar ese archivo, al menos de forma temporal en lo que se procesa y lo trabajamos, entonces aquí lo que se recomienda es que si vamos a trabajar con archivos muy grandes que los procesemos directamente como Stream. Por mientras lo vamos hacer así para no procesar el archivo directamente en raw.
const storage = multer.memoryStorage();

// dentro de multer vamos a poder configurar cuantos archivos vamos a querer recibir, como se van a llamar los campos o como se deberían llamar los campos, cositas por ahí que se pueden configurar sabiendo mas de la librería.
const uploadFile = multer({
    //basicamente en la propiedad storage almacena la imagen/archivo
    storage,
});

module.exports = uploadFile;
