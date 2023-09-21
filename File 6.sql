USE proyectofinal;

create table contacto(
idContacto int unsigned not null auto_increment,
nombre varchar(150) not null,
email varchar(150) not null,
primary key (idContacto)
);

create table sugerencias(
idSugerencia int unsigned not null auto_increment,
sugerencia varchar(100) not null,
descripcion varchar(200) not null,
primary key (idSugerencia)
);

SELECT * from proyectofinal.contacto;

SELECT * from proyectofinal.sugerencias;

DROP table sugerencias
