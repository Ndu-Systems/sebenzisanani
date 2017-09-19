-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2017 at 02:18 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sebenza`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell` varchar(20) NOT NULL,
  `identity` varchar(25) NOT NULL,
  `title` varchar(20) NOT NULL,
  `jobCatergory` text NOT NULL,
  `jobTitle` text NOT NULL,
  `jobDescription` text NOT NULL,
  `expirience` decimal(10,0) NOT NULL,
  `cv` text NOT NULL,
  `city` varchar(50) NOT NULL,
  `Password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `name`, `surname`, `email`, `cell`, `identity`, `title`, `jobCatergory`, `jobTitle`, `jobDescription`, `expirience`, `cv`, `city`, `Password`) VALUES
(2, 'freedom', 'Magwaza2', 'freedom.khanyile1@gmail.com', '74500059', '92071254554455', 'mr', 'IT', 'Developer', '.Net Developer and angilar', '2', '', 'Ranburg', '240792'),
(7, 'Ndumiso', 'Mthembu', 'mrnnmthembu@gmail.com', '0842584646', '646464646', 'Mr', 'IT', 'DEV', 'DEVLOPER', '3', 'http://localhost:8080/sebenzagit/website/Api/uploads/1505819021Ndumiso Mthembu CV.pdf\r\n', 'JOZI', 'pass');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contactperson` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `surbub` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `status` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `contactperson`, `email`, `tel`, `province`, `city`, `surbub`, `address`, `status`, `password`) VALUES
(2, 'Ndu Systems', 'Freedom', 'info@ndu-system.net', '0842529472', 'Gauteng', 'Sandton', 'Revonia', '22 Revonia road', 'Active', 'pass'),
(3, 'google', 'Frade', 'info@google.com', '0842529472', 'Gauteng', 'Sandton', 'Revonia', '22 Revonia road', 'New', 'pass'),
(4, 'Nedbank', 'John Mnise', 'info@Nedbank.co.za', '0842529472', 'Gauteng', 'Sandton', 'Revonia', '22 Revonia road', 'New', 'pass');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `cell`, `type`, `status`, `date`) VALUES
(1, 'Ndumiso', 'ndu@mail.com', '131132', 'Candidate', 'New', 'Tuesday 19th of September 2017 01:40:34 PM'),
(2, 'ds', 'fds@ew', '435', 'Candidate', 'New', 'Tuesday 19th of September 2017 01:41:23 PM'),
(3, 'fdg', 'das@ewwd', '32435', 'Candidate', 'New', 'Tuesday 19th of September 2017 01:54:14 PM'),
(4, 'test', 'dsa@wqd', '43535', 'Candidate', 'New', 'Tuesday 19th of September 2017 02:10:04 PM'),
(5, 'John', 'ndu@mail.com', '0845654545', 'Candidate', 'New', 'Tuesday 19th of September 2017 02:11:17 PM');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `tittle` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `course_trainer`
--

CREATE TABLE `course_trainer` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `trainter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(10) NOT NULL,
  `catergorty` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `expirience` decimal(10,0) NOT NULL,
  `comment` text NOT NULL,
  `componeyId` int(10) NOT NULL,
  `positions` int(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `location` text NOT NULL,
  `componeyName` varchar(150) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `catergorty`, `description`, `expirience`, `comment`, `componeyId`, `positions`, `status`, `location`, `componeyName`, `date`) VALUES
(3, 'Information Technology', 'Call Center Agent', '3', 'updated comment', 2, 3, 'Closed', 'Ranburg CBD', 'Multichoice SA', '18-09-2017'),
(4, 'Information Technology', 'C# developer', '3', 'mvc is the advantage', 2, 3, 'Open', '', '', '18-09-2017'),
(5, 'Information Technology', 'Call Center Agent', '3', 'updated comment', 2, 3, 'Open', '', '', '18-09-2017'),
(6, 'Sales', 'Call Center Agent', '3', 'updated comment closef nicely', 2, 3, 'Closed', '', '', '18-09-2017'),
(7, 'Information Technology', 'Java developer', '1', 'updated comment', 2, 1, 'Open', '', '', '18-09-2017'),
(10, 'Information Technology', 'Test', '1', 'Test need', 2, 1, 'Open', '', 'Ndu Systems', '18-09-2017'),
(11, 'Information Technology', 'Test', '1', 'Test need', 2, 1, 'Open', '', 'Ndu Systems', '18-09-2017'),
(12, 'Information Technology', 'dsf', '2', 'fsfsf', 2, 2, 'Open', '270 Marshall St, City and Suburban, Johannesburg, 2094', 'Ndu Systems', '18-09-2017'),
(13, 'Information Technology', 'Delphi dev', '2', 'We need him', 4, 2, 'Open', 'Durban', 'Nedbank', '18-09-2017'),
(14, 'Information Technology', 'tester', '3', 'test', 4, 4, 'Open', 'joizi', 'Nedbank', '18-09-2017');

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

CREATE TABLE `listing` (
  `id` int(10) NOT NULL,
  `candidateId` int(10) NOT NULL,
  `jobId` int(10) NOT NULL,
  `date` varchar(150) NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listing`
--

INSERT INTO `listing` (`id`, `candidateId`, `jobId`, `date`, `status`) VALUES
(5, 7, 3, 'Tuesday 19th of September 2017 12:03:45 PM', 'New'),
(6, 7, 4, 'Tuesday 19th of September 2017 12:04:01 PM', 'New'),
(7, 7, 6, 'Tuesday 19th of September 2017 12:04:08 PM', 'New'),
(8, 7, 13, 'Tuesday 19th of September 2017 01:02:53 PM', 'New'),
(9, 7, 10, 'Tuesday 19th of September 2017 01:18:48 PM', 'New');

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `datecreated` varchar(150) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `cell`, `role`, `datecreated`, `password`) VALUES
(1, 'Admin', 'Admin', 'Admin@mail.com', '0215445', 'Admin', '2017/09/09 1:33', 'pass');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_trainer`
--
ALTER TABLE `course_trainer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing`
--
ALTER TABLE `listing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `course_trainer`
--
ALTER TABLE `course_trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `listing`
--
ALTER TABLE `listing`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
