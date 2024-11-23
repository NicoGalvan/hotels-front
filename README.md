# **Hotels-front - Vue 3 + Vite**

[![Netlify Status](https://api.netlify.com/api/v1/badges/016ae7e9-4683-4f97-9539-37a347947432/deploy-status)](https://app.netlify.com/sites/nicolas-soft/deploys)

**Demo en línea:** [https://nicolas-soft.netlify.app](https://nicolas-soft.netlify.app)

Este proyecto es una aplicación para gestionar **hoteles**, **tipos de habitaciones**, **acomodaciones**, y más, desarrollado con **Vue 3**, **Vite**, y **Tailwind CSS**.

---

## **📚 Descripción**

El proyecto permite gestionar entidades relacionadas con hoteles mediante una interfaz web rápida y moderna. Utiliza una API RESTful externa para las operaciones de backend. La aplicación está optimizada para un rendimiento rápido y una experiencia de usuario intuitiva.

---

## **🔗 Backend**

La aplicación se conecta a una API que puedes encontrar en el siguiente repositorio:  
[https://github.com/NicoGalvan/hotels-api/tree/main](https://github.com/NicoGalvan/hotels-api/tree/main)  

Puedes trabajar con la API en modo local siguiendo las instrucciones de su README, o utilizar la versión en línea configurando `axiosInstance` como se muestra a continuación:

```js
//src\services\axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hotels-api-production.up.railway.app/api/',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

## 🚀 Tecnologías utilizadas

- **Vue 3**: Framework progresivo para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápido para proyectos modernos.
- **Tailwind CSS**: Framework CSS para estilos rápidos y personalizables.

---

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## 📥 Clonar el repositorio

1. Abre tu terminal.
2. Navega a la carpeta donde deseas clonar el proyecto.
3. Ejecuta el siguiente comando:

```bash
git clone https://github.com/NicoGalvan/hotels-front.git
```

## Ingresa al directorio del proyecto:

```bash
cd hotels-front
```

---

## 📦 Instalación de dependencias
Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

---

▶️ Ejecutar el proyecto localmente
Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

```bash
npm run dev
```
Esto iniciará el proyecto y estará disponible en tu navegador en:
```bash
http://localhost:5173
```

![image](https://github.com/user-attachments/assets/eb623d92-299c-4815-ae4d-5e7f2c517cd1)

![image](https://github.com/user-attachments/assets/dd0fcef1-60e5-4ef5-a03a-fe3fd7d1199d)


