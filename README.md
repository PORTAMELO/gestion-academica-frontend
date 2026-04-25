# INSTRUCCIONES DE DESPLIEGUE
## Pasos para ejecutar el proyecto

**1. Clonar el repositorio**
```bash
git clone <url-repositorio-frontend>
```
**2. Entrar a la carpeta**
```bash
cd gestion-academica-frontend
```
**3. Configurar la URL del backend en el archivo .env**
```
VITE_API_URL=http://<IP_DEL_BACKEND>:8080/api
```
**4. Levantar el contenedor**
```bash
docker compose up -d --build
```
**5. Abrir en el navegador**
```
http://localhost
```

## Frontend - Gestión Académica
Aplicación web desarrollada en React que consume la API REST de Gestión Académica.

### Tecnologías
- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- Docker + Nginx

### Requisitos previos
- Docker Desktop instalado y corriendo
- Backend de Gestión Académica corriendo

### Variables de entorno
Las variables están configuradas en el archivo `.env` en la raíz del proyecto:

| Variable       | Valor por defecto          | Descripción            |
|----------------|----------------------------|------------------------|
| VITE_API_URL   | http://localhost:8080/api  | URL del backend        |
| FRONTEND_PORT  | 80                         | Puerto del frontend    |