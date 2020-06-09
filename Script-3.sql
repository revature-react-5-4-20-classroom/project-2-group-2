CREATE TABLE project2_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(25) NOT NULL,
    price dec(2) NOT NULL,
    description VARCHAR,
    category_id INTEGER NOT NULL REFERENCES project2_Categories,
    avg_rating FLOAT NOT NULL,
    img_path VARCHAR(25) NOT NULL
);

CREATE TABLE project2_Reviews(
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES project2_Users,
    rating INTEGER NOT NULL,
    content VARCHAR(500),
    item_id INTEGER NOT NULL REFERENCES project2_Items
);

CREATE TABLE project2_Users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    "password" VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    address_city VARCHAR(50) NOT NULL,
    address_state VARCHAR(50) NOT NULL,
    address_zipcode VARCHAR(50) NOT NULL
);

CREATE TABLE project2_Orders(
    order_id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES project2_Items,
    user_id INTEGER NOT NULL REFERENCES project2_Users,
    store_id INTEGER REFERENCES project2_Stores,
    date_created DATE NOT NULL,
    notes VARCHAR(500)
);

CREATE TABLE project2_Categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE project2_Stores(
    store_id SERIAL PRIMARY KEY,
    store_address VARCHAR(25) UNIQUE NOT NULL
);

SELECT * FROM project2_Categories;
SELECT * FROM project2_Stores;
SELECT * FROM project2_Users;
SELECT * FROM project2_Items;
SELECT * FROM project2_Orders;
SELECT * FROM project2_Reviews;
