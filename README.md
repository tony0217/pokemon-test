# Waco Test Pokemon

<p align="center">
  <img src="https://wacohub.com/wp-content/uploads/2023/08/Logo-Waco.svg" alt="Imagen" width="300" />
</p>


Este es un proyecto de NestJS con una estructura modular organizada para facilitar el desarrollo y mantenimiento de tu aplicación. Sigue los siguientes pasos para comenzar:

## Paso 1: Clona el Repositorio

```bash
git clone https://tu-repositorio.com/tu-proyecto.git
cd tu-proyecto
```
## Paso 2: Instala las Dependencias
Asegúrate de tener Node.js y npm (o yarn) instalados en tu máquina. Luego, ejecuta el siguiente comando para instalar las dependencias:

```
npm install
# o
yarn install
```

## Paso 3: Configuración
```bash
Dentro de la carpeta src/config, encontrarás archivos de configuración para diferentes entornos (desarrollo, producción, etc.). Ajusta estos archivos según tus necesidades.

```
## 🏗️ Estructura del Proyecto
La estructura del proyecto es la siguiente:
```

```
src/
│
├── config/
│   ├── development.config.ts
│   ├── production.config.ts
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

```
## Paso 4: Inicia la Aplicación
Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:
```bash

```
npm run start:dev
# o
yarn start:dev
```

