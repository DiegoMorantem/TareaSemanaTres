-- Crear Base de datos
CREATE DATABASE tienda;

-- Crear la tabla "categoria"
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla "producto" con la relación a la tabla "categoria"
CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    categoria_id INTEGER REFERENCES categoria(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos en la tabla "categoria"
INSERT INTO categoria (nombre, descripcion) VALUES
    ('Electrónicos', 'Productos electrónicos de consumo'),
    ('Ropa', 'Ropa de moda'),
    ('Hogar', 'Productos para el hogar'),
    ('Deportes', 'Artículos deportivos'),
    ('Libros', 'Libros de diversas categorías');

-- Insertar datos en la tabla "producto" con referencias a la tabla "categoria"
INSERT INTO producto (nombre, descripcion, precio, categoria_id) VALUES
    ('Teléfono inteligente', 'Teléfono de última generación', 799.99, 1),
    ('Televisor LED', 'Televisor de alta definición', 549.99, 1),
    ('Camiseta de algodón', 'Camiseta casual', 19.99, 2),
    ('Sofá de cuero', 'Sofá cómodo para el salón', 899.99, 3),
    ('Balón de fútbol', 'Balón oficial para practicar deportes', 29.99, 4),
    ('Libro de ciencia ficción', 'Novela emocionante', 24.99, 5),
    ('Auriculares inalámbricos', 'Auriculares de alta calidad', 129.99, 1),
    ('Zapatillas deportivas', 'Zapatillas para correr', 79.99, 4),
    ('Manta suave', 'Manta acogedora para el hogar', 34.99, 3),
    ('Bicicleta de montaña', 'Bicicleta robusta para terrenos difíciles', 599.99, 4);

-- Crear la tabla usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla rol
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla intermedia usuario_rol
CREATE TABLE usuario_rol (
    usuario_id INTEGER REFERENCES usuario(id),
    rol_id INTEGER REFERENCES rol(id),
    PRIMARY KEY (usuario_id, rol_id)
);

-- Insertar datos en la tabla "rol"
INSERT INTO rol (nombre, descripcion) VALUES
    ('ADMIN', 'Administrador del Sistema'),
    ('USER', 'Usuario estandar'),
    ('Moderador', 'Moderador de contenido');

CREATE TABLE bodega (
  	id SERIAL PRIMARY KEY,
 	nombre VARCHAR(50) NOT NULL,
 	direccion VARCHAR(255) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE repartidor (
  	id SERIAL PRIMARY KEY,
  	nombres VARCHAR(100) NOT NULL,
  	apellidos VARCHAR(100) NOT NULL,
	nro_documento VARCHAR(15) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crea una nueva tabla de relación
CREATE TABLE bodega_repartidor (
  	bodega_id INT REFERENCES bodega(id),
  	repartidor_id INT REFERENCES repartidor(id),
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	PRIMARY KEY (bodega_id, repartidor_id)
);

CREATE TABLE cliente (
 	id SERIAL PRIMARY KEY,
  	nombres VARCHAR(100) NOT NULL,
  	apellidos VARCHAR(100) NOT NULL,
	nro_documento VARCHAR(15) NOT NULL,
	telefono VARCHAR(15) NOT NULL,
	direccion VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de orden con referencias a bodega_repartidor
CREATE TABLE orden (
  	id SERIAL PRIMARY KEY,
  	producto_id INT REFERENCES producto(id),
  	cantidad INT NOT NULL,
  	bodega_id INT REFERENCES bodega(id),
  	repartidor_id INT REFERENCES repartidor(id),
  	cliente_id INT REFERENCES cliente(id),
  	estado_entrega VARCHAR(50) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  	FOREIGN KEY (bodega_id, repartidor_id) REFERENCES bodega_repartidor(bodega_id, repartidor_id)
);

select * from repartidor;