# foodies_backend

## instalar los node_modules
```shell
npm install
```
## correr la aplicación:
```shell
npm run dev
```
## RAMAS GIT

Tenemos rama main (es la que conecta con VERCEL) y rama develop(es la rama sobre la cual vamos a trabajar)

1) clonar el repositorio:
```shell
git clone git@github.com:Gigi-U/foodies_backend.git
```
2) una vez clonado me posiciono sobre la carpeta y abro GITBASH (o desde el VSC)
me aseguro de estar posicionado en main o master (a veces aparece asi)

3) voy a traerme las ramas creadas:
```shell
git branch -r
```
4) moverme rama develop
```shell
git checkout develop
```

5) crear mi propia rama 
    a) estar posicionado en develop siempre
    b) creo mi rama:

```shell
git checkout -b nombre-de-la-nueva-rama
```

6) antes de empezar a trabajar me aseguro que lo voy a hacer en mi rama.

7) una vez que termine, antes de pushear lo mio SIEMPRE PULLEAR
```shell
git pull origin nombre-de-mi-rama
```
8) para pushear SIEMPRE pusheo a mi rama. desde github se hace el merge a develop, y puego se hace el merge a main





## Repaso creación de proyecto:
- npm init -y
- npm install express  ( crea la carpeta node_modules que ay que agregar al .gitignore para que no se suba al github) 
- npm install -D nodemon (se instala solo en ambiente de desarrollo) 

agrego dentro de package.json, en Scripts: 
    "start":"node index.js",
    "dev":"nodemon index.js"
## como ejecutar el proyecto

2 formas ->
1) node index.js
2) npm run dev  -> usar este

## deploy en vercel 
para realizar el deploy necesitamos crear un archivo vercel.json
