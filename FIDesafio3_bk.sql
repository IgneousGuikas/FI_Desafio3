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
-- Table structure for table `logActivities`
--

DROP TABLE IF EXISTS `logActivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logActivities` (
  `ACTIVITYID` int(11) NOT NULL AUTO_INCREMENT,
  `MACHINEID` int(11) DEFAULT NULL,
  `DATE` varchar(255) DEFAULT NULL,
  `ACTIVITY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ACTIVITYID`),
  KEY `MACHINEID` (`MACHINEID`),
  CONSTRAINT `logActivities_ibfk_1` FOREIGN KEY (`MACHINEID`) REFERENCES `logMachines` (`MACHINEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logActivities`
--

LOCK TABLES `logActivities` WRITE;
/*!40000 ALTER TABLE `logActivities` DISABLE KEYS */;
/*!40000 ALTER TABLE `logActivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logDataAlarms`
--

DROP TABLE IF EXISTS `logDataAlarms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logDataAlarms` (
  `ALARMID` int(11) NOT NULL AUTO_INCREMENT,
  `MACHINEID` int(11) DEFAULT NULL,
  `DATE` varchar(255) DEFAULT NULL,
  `ALARM_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ALARMID`),
  KEY `MACHINEID` (`MACHINEID`),
  CONSTRAINT `logDataAlarms_ibfk_1` FOREIGN KEY (`MACHINEID`) REFERENCES `logMachines` (`MACHINEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logDataAlarms`
--

LOCK TABLES `logDataAlarms` WRITE;
/*!40000 ALTER TABLE `logDataAlarms` DISABLE KEYS */;
/*!40000 ALTER TABLE `logDataAlarms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logDataProcess`
--

DROP TABLE IF EXISTS `logDataProcess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logDataProcess` (
  `PROCESSID` int(11) NOT NULL AUTO_INCREMENT,
  `MACHINEID` int(11) DEFAULT NULL,
  `DATE` varchar(255) DEFAULT NULL,
  `MAIN_PROGRAM` int(11) DEFAULT NULL,
  `RUNNING_PROGRAM` int(11) DEFAULT NULL,
  `RUNNING_SEQUENCE` int(11) DEFAULT NULL,
  PRIMARY KEY (`PROCESSID`),
  KEY `MACHINEID` (`MACHINEID`),
  CONSTRAINT `logDataProcess_ibfk_1` FOREIGN KEY (`MACHINEID`) REFERENCES `logMachines` (`MACHINEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logDataProcess`
--

LOCK TABLES `logDataProcess` WRITE;
/*!40000 ALTER TABLE `logDataProcess` DISABLE KEYS */;
/*!40000 ALTER TABLE `logDataProcess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logMachines`
--

DROP TABLE IF EXISTS `logMachines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logMachines` (
  `MACHINEID` int(11) NOT NULL AUTO_INCREMENT,
  `IP` varchar(16) NOT NULL,
  `MAX_AXIS` varchar(3) DEFAULT NULL,
  `CNC_TYPE` varchar(3) DEFAULT NULL,
  `MT_TYPE` varchar(3) DEFAULT NULL,
  `SERIES` varchar(5) DEFAULT NULL,
  `VERSION` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`MACHINEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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

-- Dump completed on 2019-10-12  3:22:34
