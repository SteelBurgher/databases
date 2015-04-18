DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
        
CREATE TABLE `Messages` (
  `messageID` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `messageText` MEDIUMTEXT NULL DEFAULT NULL,
  `userID` INTEGER NULL DEFAULT NULL,
  `roomID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`messageID`)
);

-- ---
-- Table 'Rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Rooms`;
        
CREATE TABLE `Rooms` (
  `roomID` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomName` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`roomID`)
);


-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
        
CREATE TABLE `Users` (
  `userID` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `userName` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`)
);

-- ---
-- Table 'Friendships'
-- 
-- ---

DROP TABLE IF EXISTS `Friendships`;
        
CREATE TABLE `Friendships` (
  `frienderID` INTEGER NULL DEFAULT NULL,
  `friendedID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`frienderID`, `friendedID`)
);

-- ---
-- Foreign Keys 
-- ---

-- ALTER TABLE `Messages` ADD FOREIGN KEY (userID) REFERENCES `Users` (`userID`);
-- ALTER TABLE `Messages` ADD FOREIGN KEY (roomID) REFERENCES `Rooms` (`roomID`);
-- ALTER TABLE `Friendships` ADD FOREIGN KEY (frienderID) REFERENCES `Users` (`userID`);
-- ALTER TABLE `Friendships` ADD FOREIGN KEY (friendedID) REFERENCES `Users` (`userID`);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/





-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MessagesRoomsLink` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Friendships` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`messageID`,`messageText`,`userID`) VALUES
-- ('','','');
-- INSERT INTO `Rooms` (`roomID`,`roomName`) VALUES
-- ('','');
-- INSERT INTO `MessagesRoomsLink` (`messageID`,`roomID`) VALUES
-- ('','');
-- INSERT INTO `Users` (`userID`,`userName`) VALUES
-- ('','');
-- INSERT INTO `Friendships` (`frienderID`,`friendedID`) VALUES
-- ('','');