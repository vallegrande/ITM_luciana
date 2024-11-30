create table calendarie(
IDCAL int  auto_increment,
NAMECAL varchar(100),
DESCCAL varchar(500),
DATECAL date,
PRIMARY KEY (IDCAL)
);
insert into calendarie (NAMECAL, DESCCAL, DATECAL) VALUES ("Día internacional de la educación", "descripción", (STR_TO_DATE('24/01/2024', '%d/%m/%Y')));
insert into calendarie (NAMECAL, DESCCAL, DATECAL) VALUES ("Día mundial de los docentes", "descripción", (STR_TO_DATE('05/10/2024', '%d/%m/%Y')));
insert into calendarie (NAMECAL, DESCCAL, DATECAL) VALUES ("Día internacional alfabetización", "descripción", (STR_TO_DATE('08/09/2024', '%d/%m/%Y')));
insert into calendarie (NAMECAL, DESCCAL, DATECAL) VALUES ("Día internacional de la juventud", "descripción", (STR_TO_DATE('12/08/2024', '%d/%m/%Y')));

select * from calendarie; 

select NAMECAL, DESCCAL, DATE_FORMAT(DATECAL, '%d/%M/%Y') AS DATECAL from calendarie where DATECAL;
