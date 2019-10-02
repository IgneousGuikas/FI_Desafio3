-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: FIDesafio3
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `logData`
--

DROP TABLE IF EXISTS `logData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logData` (
  `dataID` int(11) NOT NULL AUTO_INCREMENT,
  `machineID` int(11) NOT NULL,
  `spindle_speed` int(11) DEFAULT NULL,
  `feed_rate` int(11) DEFAULT NULL,
  `axis_name_1` varchar(30) DEFAULT NULL,
  `axis_position_1` int(11) DEFAULT NULL,
  `axis_dec_1` int(11) DEFAULT NULL,
  `axis_name_2` varchar(30) DEFAULT NULL,
  `axis_position_2` int(11) DEFAULT NULL,
  `axis_dec_2` int(11) DEFAULT NULL,
  `axis_name_3` varchar(30) DEFAULT NULL,
  `axis_position_3` int(11) DEFAULT NULL,
  `axis_dec_3` int(11) DEFAULT NULL,
  `axis_name_4` varchar(30) DEFAULT NULL,
  `axis_position_4` int(11) DEFAULT NULL,
  `axis_dec_4` int(11) DEFAULT NULL,
  `axis_name_5` varchar(30) DEFAULT NULL,
  `axis_position_5` int(11) DEFAULT NULL,
  `axis_dec_5` int(11) DEFAULT NULL,
  PRIMARY KEY (`dataID`),
  KEY `machineID` (`machineID`),
  CONSTRAINT `logData_ibfk_1` FOREIGN KEY (`machineID`) REFERENCES `logMachines` (`machineID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logData`
--

LOCK TABLES `logData` WRITE;
/*!40000 ALTER TABLE `logData` DISABLE KEYS */;
/*!40000 ALTER TABLE `logData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logMachines`
--

DROP TABLE IF EXISTS `logMachines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logMachines` (
  `machineID` int(11) NOT NULL AUTO_INCREMENT,
  `IP` varchar(15) NOT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `fabricante` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`machineID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logMachines`
--

LOCK TABLES `logMachines` WRITE;
/*!40000 ALTER TABLE `logMachines` DISABLE KEYS */;
/*!40000 ALTER TABLE `logMachines` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-02 21:35:41
