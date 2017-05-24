DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Person;

CREATE TABLE Person(
   Username TEXT PRIMARY KEY  NOT NULL,
   Password TEXT    NOT NULL,
   Email    TEXT NOT NULL
);

CREATE TABLE Review(
   id INT AUTO_INCREMENT,
   Username TEXT    NOT NULL,
   Pubname  TEXT NOT NULL,
   Date  	TEXT    NOT NULL,
   Text 	TEXT 	NOT NULL,
   FOREIGN KEY (Username) REFERENCES Person(Username),
   PRIMARY KEY(id)
);



