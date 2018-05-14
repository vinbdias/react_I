/*
SQLyog Community v13.0.1 (64 bit)
MySQL - 5.7.19 : Database - cdc_react
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cdc_react` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cdc_react`;

/*Table structure for table `autor` */

DROP TABLE IF EXISTS `autor`;

CREATE TABLE `autor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

/*Data for the table `autor` */

insert  into `autor`(`id`,`email`,`nome`,`senha`) values 
(1,'alots@gmail.com','alberto','123456'),
(2,'gabriel@gmail.com','gabriel','654321'),
(3,'joao@gmail.com','joao','78910'),
(4,'flavio@gmail.com','flavio','159753'),
(5,'viniciusbdias@gmail.com','vinicius','159753'),
(6,'henrique@gmail.com','henrique','jkhwejkrfwe'),
(7,'italo@gmail.com','italo','dsfsfg'),
(8,'rogerio@gmail.com','rogerio','jkdsfhfjksd'),
(9,'vitor@gmail.com','vitor','jkhdsjkfsd'),
(10,'gustavo@gmail.com','gustavo','gsgsdgsd'),
(11,'toni@gmail.com','antonio','gsdgsdg'),
(12,'rafa@gmail.com','rafael','asdasdasd'),
(13,'tiago@gmail.com','tiago','fdssfsfsd'),
(14,'ric@gmail.com','ricardo','fksdfsdsd'),
(15,'vicente@gmail.com','vicente','vfdssdfdsf'),
(16,'vicente@gmail.com','vicente','vfdssdfdsf'),
(17,'carlos@gmail.com','carlos','sfsdfsdf'),
(18,'fabio@gmail.com','fabio','fjksdhfsdjhfjksd'),
(19,'tulio@gmail.com','tulio','fjksdhfsdjhfjksd'),
(20,'regina@gmail.com','regina','fdsfsdfsdfdsf'),
(21,'and@gmail.com','andre','fdsfsdfsd'),
(22,'vagner@gmail.com','vagner','sdfsdfsdf'),
(23,'uli@gmail.com','ulisses','rtyrtytry'),
(24,'adalb@gmail.com','adalberto','jkhjksfsd'),
(25,'diego@gmail.com','diego','jhdkfsdfsd'),
(26,'danilo@gmail.com','danilo','yhfghfgh'),
(27,'edu@gmail.com','eduardo','kljfdsklfs'),
(28,'julio@gmail.com','julio','kljsdfsd'),
(29,'otv@gmail.com','otavio','fdsfsdfsd'),
(30,'suzy@gmail.com','suzana','sdfdsfsdfsdf'),
(31,'sabrina@gmail.com','sabrina','fdserwter'),
(32,'carla@gmail.com','carla','dsfsdfsd'),
(33,'aug@gmail.com','augusto','jkhsdfqw'),
(34,'paulo@caelum.com.br','paulo','dsfsddgds');

/*Table structure for table `livro` */

DROP TABLE IF EXISTS `livro`;

CREATE TABLE `livro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preco` decimal(19,2) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_jiba630fqnramd9goavw4xor0` (`autor_id`),
  CONSTRAINT `FK_jiba630fqnramd9goavw4xor0` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `livro` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
