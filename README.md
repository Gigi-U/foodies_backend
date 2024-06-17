# foodies_backend

## Creación de proyecto:
- npm init -y
- npm install express  ( crea la carpeta node_modules que ay que agregar al .gitignore para que no se suba al github) 
- npm install -D nodemon (se instala solo en ambiente de desarrollo) 

agrego dentro de package.json, en Scripts: 
    "start":"node index.js",
    "dev":"nodemon index.js"
## como ejecutar el proyecto

3 formas ->
1) node index.js
2) npm run dev  -> usar este

## deploy en vercel 
una vez que deployamos necesitamos agregar un archivo vercel.json:
{
    "version":2,
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercer/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest":"/"
        }
    ]
}