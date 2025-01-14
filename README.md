# Node.js Express Hexagonal Architecture

## Descripción

Este proyecto es una implementación de una aplicación backend utilizando Node.js, Express, y una arquitectura hexagonal (también conocida como DDD - Domain-Driven Design). La arquitectura está diseñada para ser altamente modular y flexible, separando las responsabilidades en capas bien definidas: Dominio, Aplicación e Infraestructura.

## Tecnologías utilizadas

### Lenguaje
- **TypeScript**: Proporciona seguridad en el tipado y un desarrollo más fiable.

### Frameworks y Librerías
- **Node.js y Express**: Para la gestión de rutas y controladores.
- **Zod**: Validación de datos en diferentes capas.
- **Drizzle ORM**: ORM ligero y tipado para manejar la base de datos PostgreSQL.

### Base de Datos
- **PostgreSQL**: Base de datos relacional.

### Testing
- **Jest**: Para pruebas unitarias.
- **Supertest**: Para pruebas de extremo a extremo (e2e).

## Arquitectura

Este proyecto sigue los principios de la **Hexagonal Architecture (DDD)**, dividiendo el proyecto en tres capas principales:

- **Dominio**: Contiene las reglas de negocio y entidades fundamentales.
- **Aplicación**: Contiene los casos de uso y coordinadores de lógica entre dominio e infraestructura.
- **Infraestructura**: Contiene la lógica específica de tecnologías como controladores, bases de datos y validaciones externas.

## Estructura del proyecto

```plaintext
src/lib
├── app/                   # Casos de uso y lógica de aplicación
├── domain/                # Entidades, agregados y lógica de negocio
├── infra/                 # Rutas, Controladores y Repositorios
│   ├── DrizzlePostgresUser 
│            ├──drizzle.config.ts         
│            ├── DrizzlePostgresUserRepo.ts
│            ├── schema.ts 
│   ├──ExpressUserController.ts         
│   └──ExpressUserRouter.ts
│   └──InMemoryUserRepo.ts
├── shared/               # Utilidades comunes, errores , helpers, validaciones
│   ├── errros/        
│   ├── infra/         
│   └── validators/ 
│    └── schema/
├── main.ts              # Punto de entrada principal de la aplicación    
├── tests/               # Pruebas unitarias, de integración y de extremo a extremo
└── package.json         # Dependencias y scripts del proyecto
```

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nodejs-express-hexagonal-arq
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno en un archivo `.env` basado en el ejemplo proporcionado (`.env.example`).

4. Crear la base de datos y aplicar las migraciones:
   ```bash
   npm run db:migrate
   ```

## Scripts

- **Iniciar la aplicación**: `npm start`
- **Modo desarrollo**: `npm run dev`
- **Ejecutar pruebas**: `npm test`
- **Ejecutar pruebas e2e**: `npm run test:e2e`

## Contribuir

1. Crea un fork del proyecto.
2. Crea una rama para tu feature o fix:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz tus cambios y commitea:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Haz push a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un pull request en el repositorio original.

---
