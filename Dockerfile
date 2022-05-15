# no quiero empezar desde 0, quiero que mi imagen base sea la de node js
FROM node 

# variables de entorno, key = value
# ¿Las variables de entorno no deberían ir en un archivo separado? No, habrá ocasiones donde solamente necesitemos variables de entorno para el contenedor de docker, entonces lo pondríamos aquí, tambien se puede poner en un archivo separado pero ya variables para la aplicación no, es decir, en lugar de ponerlo en el package.json, como en el script o cosas asi, ya lo agrego directamente al contenedor, para que defina esa variable de entorno y lo ocupe desde ahí.
ENV NODE_ENV="docker"

# Es la carpeta donde nosotros vamos a estar trabajando dentro del contenedor, si recordamos un poquito, Docker le asigna 3 cosas a los contenedores, un hostname para que a partir de ahí podamos conectarnos desde otro lugar dentro del mismo docker, una IP y un espacio de disco (Disk) para que pueda guardar sus propios archivos. Entonces lo que nosotros tendrémos dentro del contenedor es un espacio donde nosotros vamos a poder a trabajar con los archivos, lo que conocemos como un file system, un sistema de archivos, por lo tanto, yo voy a poder indicarle al file system que en lugar de trabajar desde el home o la raíz de mi contenedor, que trabaje desde /app, de esta forma estoy trabajando desde una carpeta específica para la aplicación por si necesito igual configurar varias cosas.
WORKDIR /app

# Otra cosa que nosotros tambien agregamos son las copias de archivos, va a ser algo bastante común, una vez ya definimos el directorio de trabajo, vamos a empezar a copiar los archivos que nosotros necesitemos, aquí es donde viene lo que nosotros conocemos como la caché de Docker, pero la razón por la cual nosotros ponemos algo así, es para que nosotros podamos pasarle primero todos los (package*.json .) y una vez ya hicimos eso, podamos instalar todas las dependencias y todas las configuraciones que nosotros vayamos aplicar dentro de nuestro proyecto. ¿Por qué hacemos eso? porque existe algo que se conoce como la caché de Docker, es decir, si yo en muchas de las ocasiones no voy a estar cambiando las dependencias, entonces lo que va hacer Docker es detectar que archivos han cambiado, que configuraciones son como necesarias y a partir de ahí si Docker detecta que ya tiene las mismas configuraciones, nada mas va a configurar lo nuevo, las nuevas configuraciones, no va a configurar lo que ya tiene. Si en algun momento nosotros no cambiamos la librería o cambiamos las dependencias y todo el proyecto sigue con esa misma estructura y solamente cambiamos el código, algunas funcionalidad del código o algo así, Docker no va a tener que instalar todas las dependencias sino como ya sabe que eso es lo mismo, simplemente lo que haría es saltarse esa parte y pasar y cambiar lo necesario, no va a tener que volver a instalar todas las dependencias y volver hacer toda esa configuración sino ya directamente sabe que eso esta como estaba anteriormente y lo omite y pasa al paso donde si hay cosas nuevas que configurando denuevo. Entonces esa es la razón por la cual nosotros hacemos las copias de los packages json de forma separada, en lugar de copiar todos los archivos, primero hacemos la copía del los packages json, luego nosotros instalamos todas las dependencias y ya luego nosotros copiamos todos los archivos necesarios.

# . significa directorio actual (y el directorio actual irá respecto a donde se encuentre el Dockerfile), si nosotros en la terminal ponemos ./ significa la carpeta actual, en el caso de Docker cuando nosotros le ponemos un punto le estamos dando la instrucción de que copie los package json hacia el directorio de trabajo actual, es decir, va a copiar los packages json hacía el /app, otra forma de hacerlo es poner: Docker package*.json /app/ 
# tambien se lee: copiamos del directorio actual hacia el directorio actual de la imagen
COPY package*.json .

# ahora tocaría hacer la instalación de dependencias, para eso vamos a necesitar un comando, para ejecutar comandos hay dos formas, tenemos CMD que es la forma ya de ejecutar el comando final de nuestro contenedor, el comando que se va a ejecutar cuando inicie nuestro contenedor o vamos a tener el comando de RUN, en este caso nosotros queremos utilizar RUN porque despues de ese comando queremos ejecutar otras cosas dentro del Dockerfile. 

# ¿Para qué sirve el package-lock, es importante? Ahí es donde se registran las configuraciones completas de las dependencias, por ejemplo, en el package.json simplemente se configura el nombre y la versión, pero en package-lock se configura todo el cual va relacionado directamente con el node_modules.

# Se recomienda que por cada instrucción un RUN
RUN npm install

#El Docker ignore en muchas ocasiones es como pesado de procesar digamos porque va a tener que ir buscando entre todos los archivos e ir ignorando los archivos que no se necesitan y todo, entonces en muchas ocasiones verán que no se agrega un Docker ignore, sino lo que se hace es simplemente tener una carpeta que nosotros lo denominamos como el src y eso es bastante común. En vez de tener que ignorar algunos archivos, mejor solamente pasamos los archivos que vamos a necesitar y eso lo ponemos dentro de una carpeta que es src

#COPY . . lo que estamos diciendo acá es: copia todo el directorio actual (obviamente que ignorando los archivos que estan en el .dockerignore) al directorio de trabajo del contenedor (el cual es /app) 

COPY /src . 

# Una vez ya tenemos la copia de los archivos, vamos a poder exponer un puerto, para que nosotros podamos conectarnos hacía esa aplicación.
EXPOSE 4000

# Una vez ya expusimos el puerto, finalizamos nuestro dockerfile con un comando, siempre debe de haber un comando y se pone en un arreglo, es como la mejor práctica, si se pone de otra forma a veces hay conflictos. La forma de ejecutar un comando utilizando RUN y CMD es distinta, esto porque el CMD es el comando que se va a utilizar cuando el contenedor se este creando, esa es la diferencia principal entre RUN y CMD, RUN me permite correr cosas cuando se este construyendo la imagen y CMD va a ser el comando que se ejecute cuando yo inicie el contenedor.

# ¿Podríamos utilizar nodemon ahí en el comando? Si pero tendríamos que instalarlo 
# ¿Aquí no debería ir el npm start? Si, pero aún no he configurado el script
CMD [ "node", "index.js" ] 