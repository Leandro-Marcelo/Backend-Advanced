FROM node 

ENV NODE_ENV="docker"

# específicamos el lugar de trabajo
WORKDIR /app

# . significa directorio actual, y el directorio actual irá respecto a donde esta ubicado el Dockerfile
# tambien se lee: copiamos del directorio actual hacia el directorio actual de la imagen
COPY package*.json .

# ejecutamos un comando
# run me permite correr cosas cuando estoy construyendo la imagen
# por cada instrucción un run
RUN npm install

# copiamos el directorio actual hacia el directorio actual de la imagen (obviamente que ignorando los archivos que estan en dockerignore)
COPY /src .

# exponemos el port de nuestra aplicación, para que nosotros podamos conectarnos hacía esa aplicación
EXPOSE 4000

# finalizamos nuestro dockerfile con un comando, siempre debe haber un comando y se pone en un arreglo, es como la mejor práctica, si se pone de otra forma a veces hay conflicto
#Este comando se va a utilizar cuando el contenedor se este creando
# command va a ser el comando que se ejecute cuando yo inicie el contenedor
CMD [ "node", "index.js" ]