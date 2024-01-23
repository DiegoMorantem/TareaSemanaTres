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

select * from producto;