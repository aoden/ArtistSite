CREATE TABLE image
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type TINYINT NOT NULL,
    description LONGTEXT,
    likes INT DEFAULT 0,
    buy INT DEFAULT 0,
    user_email VARCHAR(255),
    portfolio_id INT,
    data LONGBLOB NOT NULL,
    sketchfab_id INT NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users (email),
    FOREIGN KEY (portfolio_id) REFERENCES portfolios (id)
);
CREATE TABLE portfolios
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL,
    description LONGTEXT
);
CREATE TABLE tokens
(
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    token VARCHAR(256) NOT NULL,
    date BIGINT,
    FOREIGN KEY (email) REFERENCES users (email)
);
CREATE TABLE users
(
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    password VARCHAR(256) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(255),
    description VARCHAR(255),
    avt_data LONGBLOB,
    api_token VARCHAR(256)
);
