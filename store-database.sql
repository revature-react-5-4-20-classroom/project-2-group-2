CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(25) NOT NULL,
    price dec(,2) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES CATEGORIES,
    avg_rating FLOAT NOT NULL,
    img_path VARCHAR(25) NOT NULL,
)

CREATE TABLE Reviews(
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users
    rating INTEGER NOT NULL,
    content VARCHAR(500),
    item_id INTEGER NOT NULL REFERENCES(Items)
)

CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    address VARCHAR(50) NOT NULL,
    *role VARCHAR(25) NOT NULL
)

CREATE TABLE Orders(
    order_id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES Items,
    user_id INTEGER NOT NULL REFERENCES Users,
    store_id INTEGER REFERENCES Stores,
    date_created DATE NOT NULL,
    notes VARCHAR(500),
)

CREATE TABLE Categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(25) UNIQUE NOT NULL
)

CREATE TABLE Stores(
    store_id SERIAL PRIMARY KEY,
    store_address VARCHAR(25) UNIQUE NOT NULL
)