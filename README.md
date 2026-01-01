# App Report

Este proyecto está enfocado en la generación de reportes Excel en base a fechas y su posterior descarga cuando estén listos.

## Tecnologías Utilizadas

<p align="left">
  <a href="https://vuejs.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" /> </a>
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /> </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> </a>
  <a href="https://sass-lang.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="Sass" /> </a>
  <a href="https://router.vuejs.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue Router" /> </a>
  <a href="https://axios-http.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" /> </a>
  <a href="https://www.npmjs.com/package/vue3-toastify" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Vue3--Toastify-42b883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue3-Toastify" /> </a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /> </a>
</p>

## Ejecución Local

Para ejecutar el proyecto de forma local, asegúrate de tener Node.js instalado (versión 20 o superior recomendada).

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Correr el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible usualmente en `http://localhost:5173`.

3.  **Construir para producción (opcional):**

    ```bash
    npm run build
    ```

## Ejecución con Docker Compose

Si prefieres usar Docker para ejecutar la aplicación:

1.  **Construir y levantar el contenedor:**

    ```bash
    docker-compose up -d --build
    ```

2.  **Ver logs (opcional):**

    ```bash
    docker-compose logs -f
    ```

3.  **Detener los contenedores:**

    ```bash
    docker-compose down
    ```

4.  **Acceso y Uso:**

    *   La aplicación estará disponible en: `http://localhost:5173`
    *   **Nota Importante:** El sistema cuenta con un login para acceder. Dado que no hay un formulario de registro público, necesitarás crear un usuario inicial.
    *   Utiliza **Postman** para crear un usuario a través de la API del backend.
    *   Una vez creado el usuario, podrás utilizar esas credenciales en la pantalla de login para ingresar al sistema y generar tus reportes.


(**Nota:** Para el proyecto en producción recargar la web para refrescar la lista y poder descargar)


**Url en local:** http://127.0.0.1:8000/
**Url en producción:** http://161.132.45.52:8000/