DROP DATABASE IF EXISTS DataWarehouse;
CREATE DATABASE DataWarehouse;
USE DataWarehouse;
CREATE TABLE tbl_user (
    id INT(10) AUTO_INCREMENT,
    name VARCHAR(50),
    lastName VARCHAR(100),
    email VARCHAR(100) not null unique,
    profile ENUM("admin", "basic"),
    password VARCHAR(50),
    PRIMARY KEY (id)
);

create table tbl_region (
	id INT(10) not null auto_increment,
	name varchar(50) unique not null,
	primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table tbl_country (
	id INT(10) not null auto_increment,
	name varchar(50) unique not null,
	regionid int,
	primary key (id),
	foreign key (regionid) references tbl_region (id) on delete cascade
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table tbl_city (
	id INT(10) not null auto_increment,
	name varchar(50) unique not null,
	countryid int,
	primary key(id),
	foreign key (countryid) references tbl_country (id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table tbl_company (
	id INT(10) not null auto_increment,
	name varchar(50) unique not null,
	address varchar(50) not null,
	email varchar(50) not null,
	phone int(50) not null,
	city varchar(50) not null,
	primary key(id),
	foreign key (city) references tbl_city (name)
) ENGINE=InnoDB default CHARSET=latin1;

select * from tbl_region tr ;
select * from tbl_country tc ;
select * from tbl_city tc2 where countryid = 1;
select * from tbl_city where countryid = 2;

select tbl_region.name as region, tbl_country.name as country, tbl_city.name as city from tbl_region
	left join tbl_country 
		on tbl_region.id = tbl_country.regionid
	left join tbl_city
		on tbl_country.id = tbl_city.countryid;

select tbl_region.name as region, tbl_country.name as countr from tbl_region
	left join tbl_country 
		on tbl_region.id = tbl_country.regionid;
