const { Storage } = require("@google-cloud/storage");
const { Readable } = require("stream");
const { bucketName } = require("../config");
const uuid = require("uuid");
const path = require("path");

const storage = new Storage({
    // takes it from the root of the project
    keyFilename: "credentials-gcloud.json",
});

/* // reference to the file on the cloud storage
const file = storage.bucket(bucketName).file("img.jpg"); 

consumes the ReadableStream to create a WritableStream in the reference given by cloud storage
originalFile.pipe(file.createWriteStream()); */

// En google drive puedo tener muchos archivos con el mismo nombre, pero en el caso de cloud storage no puedo tener archivos con el mismo nombre (recuerda que en tu cloud storage van a estar todos los archivos de todos tus usuarios) entonces necesitaríamos una forma de identificar esos archivos o de diferenciarlo de todos los demas, a lo mejor crear carpetas dentro del mismo bucket para cada uno de los usuarios y si sube un archivo que a lo mejor ya tiene que se reemplace el original (obviamente avisandole que se va a reemplazar sino alto pedo) podríamos manejarlo de esa forma, otra alternativa es que cada archivo tenga un nombre único pero eso quizas sea un poco incomodo para los usuarios tipo que suban un archivo y que su archivo se renombre a otra cosa (porque otro usuario ya subió un archivo con ese nombre, por lo tanto, la solución que voy a optar es que al momento de subir el archivo lo voy a subir con cierto nombre utilizando un uuid (Universally Unique Identifier, el cual se basa en la fecha, se basa en la direccion mac de ese dispositivo, se basa en valores de control digamos como pseudo aleatorios para que no se de la posibilidad de que un uuid se creó en el mismo momento, etc) (en Node ya tenemos disponible la funcionalidad de uuid, con el modulo de crypto me parece, pero normalmente se instala la librería de uuid para tener diferentes versiones y todo) para que no se repita y al momento de mostrarlo en la interface lo voy a mostrar con el nombre que el usuario estableció originalmente. Entonces en la base de datos tendríamos fileKey para identificar cada archivo en cloud storage y fileName para mostrarlo en la interface.
const uploadFiles = (files) => {
    files.forEach((file) => {
        const ext = path.extname(file.originalname);
        // also you can use uuid.v5() to generate a unique file name
        // the difference is that uuid.v5() is a 128-bit hash, while uuid.v4() is a random 128-bit hash. Ok GitHub Copilot
        // uuid.v4 is more commonly
        const fileName = uuid.v4() + ext;
        const cloudFile = storage.bucket(bucketName).file(fileName); // reference to the file on the cloud storage
        // Hay un método que es from que nos permite tomar un iterable, donde un buffer es un iterable porque podemos procesar cada chunk que se encuentra en el buffer como si fuera una especie de array para obtener nuestro archivo en formato ReadableStream
        const fileStream = Readable.from(file.buffer);

        // consumes the ReadableStream to create a WritableStream in the reference given by cloud storage
        fileStream
            .pipe(cloudFile.createWriteStream())
            .on("finish", () => {
                console.log("Upload finish");
            })
            .on("error", (err) => {
                console.log(err);
            });
    });
};

module.exports = uploadFiles;
