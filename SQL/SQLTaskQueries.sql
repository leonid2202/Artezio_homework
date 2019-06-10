-- Task 1
CREATE DATABASE IF NOT EXISTS WorkersDB;
USE WorkersDB;

CREATE TABLE IF NOT EXISTS positions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(30) NOT NULL
);


CREATE TABLE IF NOT EXISTS workers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INT UNSIGNED NOT NULL,
    salary BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (position_id)
        REFERENCES positions (id)
);

INSERT INTO positions (id, position_name)
VALUES (null, 'Python Senior'),
       (null, 'JavaScript Middle'),
       (null, 'Java Junior');

INSERT INTO workers (id, first_name, last_name, position_id, salary)
VALUES (null, 'William', 'Young', 3, 25000),
       (null, 'Robin', 'Harmon', 3, 24000),
       (null, 'Kathleen', 'Peters', 2, 29999),
       (null, 'Jared', 'Byrd', 2, 80000),
       (null, 'Charles', 'Washington', 1, 300000);

-- Task 2
SELECT workers.first_name, workers.last_name, positions.position_name, workers.salary
  FROM workers
       INNER JOIN positions 
       ON positions.id = workers.position_id
 WHERE salary < 30000;

SELECT workers.first_name, workers.last_name, positions.position_name, workers.salary
  FROM workers
       INNER JOIN positions 
       ON positions.id = workers.position_id
 WHERE salary < 30000 
   AND position_name = 'JavaScript Middle';

-- Task 3*
CREATE TABLE IF NOT EXISTS superior_subordinate_Rel (
    superior_id INT UNSIGNED NOT NULL,
    subordinate_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (superior_id)
        REFERENCES workers (id),
    FOREIGN KEY (subordinate_id)
        REFERENCES workers (id)
);

INSERT INTO superior_subordinate_rel (superior_id, subordinate_id)
VALUES (5, 1),
       (5, 2),
       (5, 3),
       (4, 1);

SELECT workers.first_name, workers.last_name, positions.position_name, workers.salary
  FROM workers 
       INNER JOIN positions 
       ON positions.id = workers.position_id
 WHERE workers.id IN 
       (SELECT superior_subordinate_rel.subordinate_id 
          FROM superior_subordinate_rel 
         WHERE superior_id = 5);
