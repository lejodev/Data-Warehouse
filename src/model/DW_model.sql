DROP DATABASE IF EXISTS DataWarehouse;
CREATE DATABASE DataWarehouse;
USE DataWarehouse;

CREATE TABLE User (
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    lastName VARCHAR(100),
    email VARCHAR(100),
    profile ENUM("admin", "basic"),
    password VARCHAR(50),
    PRIMARY KEY (id)
) ENGINE = INNODB;

INSERT INTO USER(name, lastName, email, profile, password) VALUES 
('Freddy', 'Elliot', 'Freddo@fakemail.com', 0, 'fakePASSWORD'),
('Ellen', 'Dennis', 'Ellen@fakemail.com', 0, 'fakePASSWORD'),
('Danielle', 'Maxime', 'DMaxime92@fakemail.com', 1, 'fakePASSWORD'),
('Pablo', 'Evans', 'PEvans@fakemail.com', 0, 'fakePASSWORD'),
('Kurt', 'Armstrong', 'KAMS@fakemail.com', 1, 'fakePASSWORD'),
('Christian', 'Henriks', 'CHHenriks@fakemail.com', 1, 'fakePASSWORD')