Node.js Express Hexagonal Architecture

Descripción

Este proyecto es una implementación de una aplicación backend utilizando Node.js, Express, y una arquitectura hexagonal (también conocida como DDD - Domain-Driven Design). La arquitectura está diseñada para ser altamente modular y flexible, separando las responsabilidades en capas bien definidas: Dominio, Aplicación, e Infraestructura.

El proyecto incluye:

TypeScript para tipado estático y mantenimiento.

Zod para validaciones robustas.

Drizzle ORM como ORM ligero para interactuar con PostgreSQL.

Testing: pruebas unitarias y de extremo a extremo (e2e).

Tecnologías utilizadas

Lenguaje

TypeScript: Proporciona seguridad en el tipado y un desarrollo más fiable.

Frameworks y Librerías

Node.js y Express: Para la gestión de rutas y controladores.

Zod: Validación de datos en diferentes capas.

Drizzle ORM: ORM ligero y tipado para manejar la base de datos PostgreSQL.

Base de Datos

PostgreSQL: Base de datos relacional.

Testing

Jest: Para pruebas unitarias.

Supertest: Para pruebas de extremo a extremo (e2e).

Arquitectura

Hexagonal Architecture (DDD): Divide el proyecto en tres capas principales:

Dominio: Contiene las reglas de negocio y entidades fundamentales.

Aplicación: Contiene los casos de uso y coordinadores de lógica entre dominio e infraestructura.

Infraestructura: Contiene la lógica específica de tecnologías como controladores, bases de datos y validaciones externas.


Estructura del proyecto

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
├── shared/                # Utilidades comunes, errores , helpers, validaciones
│   ├── errros/        
│   ├── infra/         
│   └── validators/ 
│    └── schema/
├── main.ts              # Punto de entrada principal de la aplicación    
├── tests/               # Pruebas unitarias, de integración y de extremo a extremo
└── package.json         # Dependencias y scripts del proyecto
