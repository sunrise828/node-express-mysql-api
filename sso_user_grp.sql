/*
SQLyog Enterprise - MySQL GUI v8.12 
MySQL - 5.5.5-10.1.32-MariaDB : Database - yj_usrdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`yj_usrdb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `yj_usrdb`;

/*Data for the table `sso_user_grp` */

insert  into `sso_user_grp`(`sso_grp_id`,`sso_grp_name`) values ('AD','Admin'),('AP',' Admin Job Reviewer'),('EM','Employer'),('EP','Employee job posted'),('JS','Job Seeker');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
