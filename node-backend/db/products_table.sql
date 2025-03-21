-- db/products_table.sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    quantity VARCHAR(100),
    brand VARCHAR(100),
    model VARCHAR(100),
    type VARCHAR(100) NOT NULL,
    images JSON,
    image VARCHAR(255),
    offers JSON,
    installation_available BOOLEAN DEFAULT FALSE,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);