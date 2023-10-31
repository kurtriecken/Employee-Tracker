INSERT INTO department (name)
VALUES ("Exobiology Division"),
    ("Resource Acquisition Bureau"),
    ("Ministry of Coffee"),
    ("Anomaly Analysis Unit");

INSERT INTO role (title, salary, department_id)
VALUES ("Astrobiologist", 300000, 1),
    ("Xenobiologist", 200000, 1),
    ("Planetary Ecologist", 250000, 1),
    ("Resource Procurment", 125000, 2),
    ("Mining Engineer", 75000, 2),
    ("Environmental Compliance", 127000, 2),
    ("Coffee Quality Inspector", 180000, 3),
    ("Barista Trainee", 60000, 3),
    ("Coffee Marketing", 76000, 3),
    ("Anomaly Investigator", 175000, 4),
    ("Data Anomalies Analyst", 150000, 4),
    ("Paranormal Researcher", 225000, 4);
    
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alice", "Johnson", 1),
    ("Mark", "Anderson", 2),
    ("Emily", "Parker", 4),
    ("James", "McGee", 5),
    ("Skippy", "Davis", 6),
    ("Michael", "Turner", 7),
    ("Olivia", "Benson", 8),
    ("Daniel", "Reed", 10),
    ("Sophia", "Carter", 12),
    ("William", "Foster", 11);