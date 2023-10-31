CREATE TABLE price_plans (
    ID SERIAL PRIMARY KEY,
    plan_name VARCHAR(15) NOT NULL,
    sms_price DECIMAL(5, 2) NOT NULL,
    call_price DECIMAL(5, 2) NOT NULL
);

CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    userName varchar(20) NOT NULL,
    planId int,
    FOREIGN KEY (planId) REFERENCES price_plans(ID)
);

CREATE TABLE user_usage (
    usageID SERIAL PRIMARY KEY,
    usage VARCHAR(230) NOT NULL,
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(userID) 
);

INSERT INTO price_plans (plan_name, sms_price, call_price) VALUES
  ('Plan A', 0.30, 1.20),
  ('Plan B', 0.55, 1.50 ),
  ('Plan C', 1.10, 2.50);










