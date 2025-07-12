# Backend - Arquitectura Hexagonal

Este proyecto implementa una arquitectura hexagonal (también conocida como arquitectura de puertos y adaptadores) para el manejo de usuarios.

## Estructura del Proyecto

```
src/
├── Domain/                    # Capa de Dominio (Núcleo de Negocio)
│   ├── entities/             # Entidades de negocio
│   │   └── user/             # Entidad Usuario y sus value objects
│   └── repositories/         # Interfaces de repositorios
├── application/              # Capa de Aplicación
│   ├── services/             # Servicios de aplicación
│   └── useCases/             # Casos de uso
├── infrastructure/           # Capa de Infraestructura
│   ├── database/             # Implementaciones de base de datos
│   │   ├── models/           # Modelos de Mongoose
│   │   └── mongooseUserRepository.ts
│   ├── web/                  # Adaptadores web
│   │   ├── controllers/      # Controladores
│   │   └── routes/           # Rutas de Express
│   └── di/                   # Inyección de dependencias
└── config/                   # Configuración
```

## Arquitectura Hexagonal

### 1. Dominio (Core)
- **Entidades**: Representan los conceptos del negocio (User)
- **Value Objects**: Objetos inmutables que representan valores (UserName, UserEmail, etc.)
- **Repositorios**: Interfaces que definen contratos para el acceso a datos

### 2. Aplicación
- **Servicios**: Orquestan la lógica de negocio
- **Casos de Uso**: Implementan operaciones específicas del negocio

### 3. Infraestructura
- **Adaptadores de Entrada**: Controladores y rutas web
- **Adaptadores de Salida**: Repositorios de base de datos
- **Inyección de Dependencias**: Contenedor que gestiona las dependencias

## Principios Aplicados

1. **Inversión de Dependencias**: El dominio no depende de la infraestructura
2. **Separación de Responsabilidades**: Cada capa tiene una responsabilidad específica
3. **Inyección de Dependencias**: Las dependencias se inyectan, no se crean
4. **Value Objects**: Objetos inmutables para representar valores del dominio

## Correcciones Implementadas

### Problemas Identificados y Solucionados:

1. **Inyección de Dependencias Incorrecta**
   - ❌ Antes: El controlador creaba directamente las instancias
   - ✅ Ahora: Se usa un contenedor de dependencias

2. **Falta de Configuración de Base de Datos**
   - ❌ Antes: No había conexión a MongoDB
   - ✅ Ahora: Configuración completa con manejo de errores

3. **Rutas No Conectadas**
   - ❌ Antes: Las rutas no estaban registradas en el servidor
   - ✅ Ahora: Rutas correctamente conectadas y organizadas

4. **Problemas en el Repositorio**
   - ❌ Antes: Falta de ID en creación y problemas de tipos
   - ✅ Ahora: Manejo correcto de IDs y tipos

5. **Falta de Casos de Uso**
   - ❌ Antes: No había separación clara entre servicios y casos de uso
   - ✅ Ahora: Casos de uso implementados para operaciones específicas

6. **Problemas de Importación**
   - ❌ Antes: Rutas de importación inconsistentes
   - ✅ Ahora: Rutas corregidas y consistentes

## Cómo Ejecutar

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Crear archivo `.env` con:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cancha
   NODE_ENV=development
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## Endpoints Disponibles

- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## Beneficios de la Arquitectura Hexagonal

1. **Testabilidad**: Fácil de testear cada capa independientemente
2. **Mantenibilidad**: Cambios en una capa no afectan otras
3. **Flexibilidad**: Fácil cambiar implementaciones (ej: base de datos)
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Independencia**: El dominio no depende de frameworks externos 