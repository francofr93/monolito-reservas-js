# Publicar el proyecto JavaScript en GitHub

Esta guía conecta la carpeta local `starter-project` con un repositorio remoto de GitHub. La carpeta no trae historial `.git`: cada equipo crea su repositorio y su historial.

## 1. Preparar el proyecto

Descomprime la carpeta, abre una terminal en `starter-project` y ejecuta:

```bash
npm ci
npm test
git init
git branch -M main
git status
```

`npm ci` instala las dependencias registradas en `package-lock.json`.

Si Git todavía no conoce tu identidad, define el nombre y correo para los commits de este proyecto:

```bash
git config user.name "Nombre Apellido"
git config user.email "correo-del-commit@example.com"
```

## 2. Crear un repositorio remoto vacío

En GitHub, crea un repositorio para el proyecto. Para evitar historiales divergentes, créalo sin README, licencia ni `.gitignore`: esos archivos ya existen localmente.

Copia la URL HTTPS del repositorio. Por ejemplo:

```text
https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
```

## 3. Guardar y subir el primer commit

Desde la terminal en `starter-project`:

```bash
git add .
git status
git commit -m "chore: inicia proyecto JavaScript"
git remote add origin https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
git remote -v
git push -u origin main
```

Reemplaza la URL de ejemplo por la URL real. No escribas contraseñas ni tokens dentro de la URL, el código o archivos del proyecto.

## 4. Invitar al equipo

La persona propietaria del repositorio invita a cada integrante desde la configuración de acceso del repositorio. Cada invitado debe aceptar la invitación antes de colaborar.

Cada integrante clona el mismo repositorio:

```bash
git clone https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
cd NOMBRE-DEL-REPOSITORIO
npm ci
```

## 5. Rutina de trabajo

Antes de editar, actualiza la rama principal:

```bash
git pull --rebase origin main
```

Después de un cambio:

```bash
git status
git add ARCHIVO-O-CARPETA
git commit -m "feat: completa flujo de reservas"
git push
```

Registra los cambios relevantes en `docs/bitacora.md`.

## 6. Revisión antes de subir

- `git status` muestra solo los archivos que esperas compartir.
- No se incluyen `.env`, contraseñas, claves, tokens ni datos personales reales.
- `node_modules/` está ignorado por `.gitignore`.
- `npm test` termina correctamente en el equipo.
- El README explica cómo instalar, ejecutar y probar el proyecto.

