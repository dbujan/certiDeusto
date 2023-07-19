# certiDeusto
Undergraduate final year project


#DATABASE CREATION SQL QUERIES

CREATE DATABASE `tfg` 

-- tfg.competencia definition

CREATE TABLE `competencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `esco_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 


-- tfg.genero definition

CREATE TABLE `genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_spanish` varchar(255) DEFAULT NULL,
  `name_english` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 


-- tfg.pais definition

CREATE TABLE `pais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_spanish` varchar(255) DEFAULT NULL,
  `name_english` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

-- tfg.secretaria definition

CREATE TABLE `secretaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

-- tfg.users_role definition

CREATE TABLE `users_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

-- tfg.alumno definition

CREATE TABLE `alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname1` varchar(255) DEFAULT NULL,
  `surname2` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `dni` varchar(100) DEFAULT NULL,
  `born_date` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pais` int DEFAULT NULL,
  `id_genero` int DEFAULT NULL,
  `registered` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pais` (`id_pais`),
  KEY `id_genero` (`id_genero`),
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`),
  CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id`)
) 


-- tfg.facultad definition

CREATE TABLE `facultad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pais` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pais` (`id_pais`),
  CONSTRAINT `facultad_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`)
)


-- tfg.profesor definition

CREATE TABLE `profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname1` varchar(255) DEFAULT NULL,
  `surname2` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `dni` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pais` int DEFAULT NULL,
  `id_genero` int DEFAULT NULL,
  `registered` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pais` (`id_pais`),
  KEY `id_genero` (`id_genero`),
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`),
  CONSTRAINT `profesor_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id`)
) 


-- tfg.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `id_role` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `users_role` (`id`)
) 


-- tfg.asignatura definition

CREATE TABLE `asignatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ects` int DEFAULT NULL,
  `num_places` int DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `semester` int DEFAULT NULL,
  `id_facultad` int DEFAULT NULL,
  `graded` tinyint(1) DEFAULT NULL,
  `issued` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_facultad` (`id_facultad`),
  CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id`)
) 


-- tfg.asignatura_competencia definition

CREATE TABLE `asignatura_competencia` (
  `id_asignatura` int NOT NULL,
  `id_competencia` int NOT NULL,
  PRIMARY KEY (`id_asignatura`,`id_competencia`),
  KEY `asignatura_competencia_ibfk_2` (`id_competencia`),
  CONSTRAINT `asignatura_competencia_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `asignatura_competencia_ibfk_2` FOREIGN KEY (`id_competencia`) REFERENCES `competencia` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) 

-- tfg.credential definition

CREATE TABLE `credential` (
  `asset_id` varchar(255) NOT NULL,
  `id_alumno` int NOT NULL,
  `id_asignatura` int NOT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `credential_ibfk_1` (`id_alumno`),
  KEY `credential_ibfk_2` (`id_asignatura`),
  CONSTRAINT `credential_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id`),
  CONSTRAINT `credential_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) 


-- tfg.profesor_asignatura definition

CREATE TABLE `profesor_asignatura` (
  `id_profesor` int NOT NULL,
  `id_asignatura` int NOT NULL,
  PRIMARY KEY (`id_profesor`,`id_asignatura`),
  KEY `profesor_asignatura_ibfk_2` (`id_asignatura`),
  CONSTRAINT `profesor_asignatura_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`),
  CONSTRAINT `profesor_asignatura_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) 

-- tfg.alumno_asignatura definition

CREATE TABLE `alumno_asignatura` (
  `id_alumno` int NOT NULL,
  `id_asignatura` int NOT NULL,
  `grade` decimal(9,2) DEFAULT NULL,
  PRIMARY KEY (`id_alumno`,`id_asignatura`),
  KEY `alumno_asignatura_ibfk_2` (`id_asignatura`),
  CONSTRAINT `alumno_asignatura_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id`),
  CONSTRAINT `alumno_asignatura_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) 
