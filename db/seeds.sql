INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fred", "Johnson", 3, 4),
    ("John", "Fredson", 1, 3),
    ("Frohn", "Jedson", 2, 3),
    ("Pickles", "McGee", 4, 4);

INSERT INTO department (name)
VALUES ("Exobiology Division"),
    ("Resource Acquisition Bureau"),
    ("Ministry of Coffee"),
    ("Anomaly Analysis Unit");

INSERT INTO role (title, salary, department_id)
VALUES ("Maestro", "300000", 1),
    ("Minion", "45000", 2),
    ("Trainee", "55000", 1),
    ("Engineer", "125000", 3),
    ("Maven", "200000", 4);