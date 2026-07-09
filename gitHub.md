## CHULETA GIT PARA FULLSTACK 
##### CONFIGURACIÓN INICIAL (solo una vez)

#### Configurar nombre de usuario y email (OBLIGATORIO para hacer commits)

```language
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```


#### Ver configuración actual

```language
git config --list
```

### 🆕 CREAR O CLONAR UN REPOSITORIO

#### Clonar un repositorio existente (lo más común en prácticas)

```language
git clone https://github.com/usuario/nombre-repo.git
```


#### Entrar a la carpeta del proyecto

```language
cd nombre-repo
```


### Crear repositorio nuevo desde cero (si empiezas tú)

```language
git init
```

### 📝 FLUJO BÁSICO DE TRABAJO (LO MÁS IMPORTANTE)

#### 1. VER estado de los archivos (SIEMPRE haz esto primero)

```language
git status
```


#### 2. AÑADIR archivos al "área de preparación" (staging)

```language
git add nombre-archivo      // Añadir un archivo específico
git add .                   // Añadir TODOS los archivos modificados
git add src/                // Añadir toda una carpeta
```


#### 3. GUARDAR los cambios (hacer commit)

```language
git commit -m "Mensaje descriptivo de lo que cambiaste"
```


#### 4. SUBIR los cambios a GitHub (push)

```language
git push origin main / develop         # Si usas "main" como rama principal
git push origin master       # Si usas "master" (más antiguo)
```

### 📥 TRAER CAMBIOS DE OTROS (IMPORTANTE)

#### TRAER los últimos cambios de GitHub (SIN hacer merge automático)

```language
git fetch
```


#### TRAER + UNIR (pull) - Lo más común

```language

git pull origin main         // Trae y fusiona los cambios
```


#### Si hay conflictos, Git te avisará y tendrás que resolverlos manualmente
🌿 RAMAS (BRANCHES) - Para trabajar en equipo

#### VER todas las ramas

```language
git branch
```


#### CREAR una nueva rama

```language
git branch nombre-rama
```


#### CAMBIAR a otra rama

```language
git checkout nombre-rama
```


#### CREAR Y CAMBIAR a nueva rama en un solo comando

```language
git checkout -b nombre-rama
```


#### UNIR una rama a la actual (ej: fusionar feature a main)

```language
git checkout main           // Primero ve a la rama principal
git merge nombre-rama       // Luego fusiona
```


#### SUBIR una rama nueva a GitHub

```language
git push origin nombre-rama
```

## 🔍 INFORMACIÓN Y EXPLORACIÓN

#### VER el historial de commits

```language
git log
```


#### VER historial más resumido y bonito

```language
git log --oneline --graph --all
```


#### VER qué cambió en un archivo

```language
git diff nombre-archivo
```


#### VER diferencia entre lo que tienes y lo que hay en GitHub

```language
git fetch
git status                   // Te mostrará si estás atrasado o adelantado
```

🔄 DESHACER COSAS (¡Socorro!)

#### Deshacer cambios NO añadidos (descartar en archivo)

```language
git checkout -- nombre-archivo
```


#### Quitar archivo del área de staging (pero mantener cambios)

```language
git reset HEAD nombre-archivo
```


#### Deshacer el último commit (PERO manteniendo cambios)

```language
git reset --soft HEAD~1
```


#### Deshacer el último commit (ELIMINANDO cambios) - ¡CUIDADO!

```language
git reset --hard HEAD~1
```

## 📋 FLUJO RECOMENDADO PARA CADA DÍA

#### 1. Antes de empezar a trabajar, SIEMPRE traer cambios

```language
git pull origin main
```


#### 2. Hacer tus cambios, guardar archivos

#### 3. Ver qué cambió

```language
git status
```


#### 4. Añadir los cambios

```language
git add .
```


#### 5. Hacer commit con mensaje claro

```language
git commit -m "Descripción de lo que hice"
```


#### 6. Subir a GitHub

```language
git push origin main
```


# 💡 CONSEJOS IMPORTANTES

1. 1_ SIEMPRE haz git status antes de cualquier cosa.
2. 2_ Haz commits pequeños y frecuentes con mensajes descriptivos.
3. 3- NUNCA trabajes directamente en main, o develop si son varios compañeros o varias tareas. Mejor creen ramas.
7. 4_ Antes de hacer push, SIEMPRE haz pull primero.
10. 5_ Los mensajes de commit en español o inglés, pero descriptivos.
 
##### EJEMPLO DE BUEN MENSAJE DE COMMIT
❌ Mal: git commit -m "cambios"
✅ Bien: git commit -m "Añade formulario de registro y validación"

### 🆘 SI TE EQUIVOCAS...

#### Si hiciste push y quieres revertir (sin perder el historial)

```language
git revert HEAD              // Crea un commit que deshace el último
```


#### Si todo está mal y quieres volver a como estaba en GitHub

```language
git fetch origin
git reset --hard origin/main
```

## 🆕 COMANDOS EXTRA ÚTILES

## VER en qué rama estás (siempre útil)

```language
git branch --show-current
```


### GUARDAR cambios temporalmente (stash) - ¡Salvavidas!

```language
git stash                    // Guarda cambios sin commitear
git stash pop                // Recupera los cambios guardados
git stash list               // Ver todos los stashes
```


### VER los cambios antes de hacer add

```language
git diff                     # Muestra cambios en archivos no añadidos
git diff --staged            # Muestra cambios que YA están en staging
```


### CREAR un tag (versión) - útil para entregas

```language
git tag -a v1.0 -m "Versión 1.0 - Entrega Sprint 1"
git push origin v1.0         // Subir el tag a GitHub
```


### VER el historial de una persona específica

```language
git log --author="Nombre"
```

## 🏷️ RENOMBRAR O ELIMINAR

###  RENOMBRAR un archivo (Git lo detecta mejor)

```language
git mv nombre-viejo nombre-nuevo
```


###  ELIMINAR un archivo (Git lo rastrea)

```language
git rm archivo-eliminar.js
```

## 🔀 TRABAJO COLABORATIVO AVANZADO

### ACTUALIZAR tu rama con los cambios de main (sin hacer merge)

```language
git rebase main              // Reorganiza tus commits encima de main
```


###  VER qué commits están en una rama pero no en otra

```language
git log main..feature        // Commits en feature que no están en main
```

## 🚨 RESOLVER CONFLICTOS (PASO A PASO)

### 1. Cuando hay conflicto, Git te lo dice:

```language
git status                   // Muestra los archivos en conflicto
```


### 2. Abre los archivos y busca esto:

```language
# <<<<<<< HEAD
# (tus cambios)
# =======
# (cambios de la otra persona)
# >>>>>>> nombre-rama
```


### 3. Edita manualmente, decide qué código conservar

### 4. Marca el conflicto como resuelto:

```language
git add archivo-resuelto.js
```


###  5. Finaliza el merge:

```language
git commit -m "Resuelve conflictos en archivo.js"
```


###  6. Si es un rebase, usa:

```language
git rebase --continue
```

## 📊 VER EL ESTADO DEL REPOSITORIO

###   VER de un vistazo todo el estado

```language
git status -s                # Formato corto
```


###  VER commits locales vs remotos

```language
git log --oneline origin/main..HEAD   // Commits que NO has subido
git log HEAD..origin/main             // Commits que NO has bajado
```

## 📋 FLUJO RECOMENDADO PARA PRÁCTICAS EN EQUIPO

###  🔄 AL EMPEZAR EL DÍA (SIEMPRE)

```language
git checkout develop          // O main, dependiendo
git pull origin develop       // Traer últimos cambios
```


###  🌿 CREAR RAMA PARA TU TAREA

```language
git checkout -b feature/login-form
```


###  💻 TRABAJAR EN TU CÓDIGO
####  ...hacer cambios, guardar...

###  ✅ COMMIT DE CAMBIOS (frecuentes)

```language
git add .
git commit -m "Añade validación de email en login"
```

### 📤 SUBIR TU RAMA (para que otros la vean)
git push origin feature/login-form

### 🔗 CREAR PULL REQUEST (en GitHub)
####  Ve a GitHub > New Pull Request > De feature/login-form a develop

####  🔄 CUANDO TE APRUEBEN EL PR (en GitHub)
####  Ya lo fusionan en develop y tú actualizas tu local:

```language
git checkout develop
git pull origin develop
git branch -d feature/login-form   # Eliminar rama local (ya no la necesitas)
```

### 🎯 CONSEJOS ESPECIALES PARA FULLSTACK

####  IGNORAR archivos (crear .gitignore)

```language
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".vscode/" >> .gitignore
```


### AÑADIR un .gitignore ya creado (recomendado para cada proyecto)
####  Crear un archivo .gitignore con contenido apropiado para tu stack
### 🗑️ LIMPIEZA DE REPOSITORIO

### ELIMINAR archivos que ya no están en el disco

```language
git add -A                   # Añade todas las eliminaciones también
```


### LIMPIAR ramas locales que ya no existen en remoto

```language
git remote prune origin      // Elimina referencias a ramas remotas eliminadas
```

🚨 ERRORES COMUNES Y SOLUCIONES
######   ERROR: "Please enter a commit message"
######   Solución: Presiona 'i' (insertar), escribe mensaje, ESC, :wq (enter)

######   ERROR: "Your branch is ahead of origin/main"
  
```language
// Solución: 
git push origin main  (sube tus commits)
```


######  ERROR: "Merge conflict in archivo.js"
######  Solución: Ve a la sección de resolución de conflictos arriba

######  ERROR: "fatal: refusing to merge unrelated histories"

```language
 // Solución: 
 git pull origin main --allow-unrelated-histories
```

###  📝 GUÍA DE BUENAS PRÁCTICAS ADICIONALES
######  Commits atómicos: Cada commit debe hacer UNA cosa

######  Mensajes en imperativo: "Añade", "Corrige", "Elimina"

######  No subas archivos de configuración local (.env, node_modules)

######  Haz PR (Pull Requests) pequeños para facilitar revisiones

######  Comunica cambios grandes antes de hacer push a main

## 🎨 FORMATO VISUAL MEJORADO

### Hacer un alias para ver historial bonito

```language
git config --global alias.lg "log --graph --abbrev-commit --pretty=format:\"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset\"

```


###  Después usar:

```language
git lg
```

