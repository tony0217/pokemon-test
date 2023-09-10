# Waco Test Pokemon

<p align="center">
  <img src="https://wacohub.com/wp-content/uploads/2023/08/Logo-Waco.svg" alt="Imagen" width="300" />
</p>


Este es un proyecto de NestJS con una estructura modular organizada para facilitar el desarrollo y mantenimiento de tu aplicación. Sigue los siguientes pasos para comenzar:

## Paso 1: Clona el Repositorio

```bash
git clone https://github.com/tony0217/waco-test.git
cd waco-test
```
## Paso 2: Instala las Dependencias
Asegúrate de tener Node.js y npm (o yarn) instalados en tu máquina. Luego, ejecuta el siguiente comando para instalar las dependencias:

```
npm install
# o
yarn install
```

## Paso 3: Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

## Paso 4: Configuración

Dentro de la carpeta src/config, encontrarás archivos de configuración para diferentes entornos (desarrollo, producción, etc.). Ajusta estos archivos según tus necesidades.
copia el .env.example esas son las variables de entornos a configurar , si es para desarrollo debe ser env.dev, para prod env.prod
MONGODB_HOST= 
APP_PORT= 
POKE_API=
JWT_SECRET=

## 🏗️ Estructura del Proyecto
La estructura del proyecto es la siguiente:
```
src/
│
├── config/
│   ├── env.config.ts
│   ├── enviroments.ts
│   └── ...
│
├── core/
│   ├── ...
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── ...
│   │
│   ├── pokemon/
│   │   ├── pokemon.controller.ts
│   │   ├── pokemon.service.ts
│   │   ├── pokemon.module.ts
│   │   └── ...
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.module.ts
│   │   └── ...
│   │
│   └── ...
│
├── main.ts
└── ...


```

## Paso 5: Inicia la Aplicación
Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```
npm run start:dev
# o
yarn start:dev
```

## Stack usado
* NodeJS  <p align="center"> <img src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" alt="Imagen" width="100" /></p>
* MongoDB
* NestJS

# Notas
Mirar los endpoint:
```
cargar el archivo backend-waco.postman_collection.json en postman 
```
