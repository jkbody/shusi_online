create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    open_id varchar(200) not null,
    title varchar(100) not null,
    images varchar(200),
    alt varchar(200) not null,
    publisher varchar(200) not null,
    summary varchar(1000) not null,
    price varchar(100),
    ret float,
    tags varchar(300),
    author varchar(200) not null
);
create table collects(
    id int not null auto_increment primary key,
    open_id varchar(200) not null,
    book_id varchar(200) not null
);
create table Orders(
    id int not null auto_increment primary key,
    open_id varchar(200) not null,
    orders varchar(2000) not null,
    Money decimal(10,2) not null,
    pay varchar(20) not null,
    CreatTime  datetime null default current_timestamp
);
