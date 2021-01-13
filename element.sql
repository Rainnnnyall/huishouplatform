CREATE DATABASE element  CHARACTER SET utf8 COLLATE utf8_general_ci; 
USE element;

CREATE TABLE administration(
id INT PRIMARY KEY AUTO_INCREMENT,
account VARCHAR(50),
NAME VARCHAR(20),
email VARCHAR(100),
ptime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
endtime VARCHAR(100),
isuse BOOLEAN
);
SELECT * FROM administration;

INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('test','张三','11411@qq.com','2021-01-04 11:11:11',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('aaa','李四','vfrw@qq.com','2012-01-21 12:12:12',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('vvv','王二','5432@qq.com','2011-04-08 09:45:11',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('rrr','麻子','12221@qq.com','2019-07-31 12:56:34',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('trrt','张杰','22222q.com','2021-09-14 18:31:71',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('ewewq','谢娜','42134@qq.com','2001-09-04 11:09:09',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('fffff','李琦','4531789@qq.com','2021-05-04 01:01:01',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('terefe','啊啊啊','0853@qq.com','2020-07-04 11:48:31',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('tvfrrbb','呃呃而','75631@qq.com','2022-01-04 18:51:11',TRUE);
INSERT INTO administration(account,NAME,email,endtime,isuse) VALUES ('tbbbbt','的发热','085232@qq.com','2021-01-04 11:11:11',TRUE);

DROP TABLE administration;