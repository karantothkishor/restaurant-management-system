drop table if exists Waiter;
drop table if exists Chef;
drop table if exists Delivery_manager;
drop table if exists Table_Manager;
drop table if exists Table_cart;
drop table if exists Cart;
drop table if exists Ingredients;
drop table if exists Add_items;
/* drop table if exists Validity; */
drop view if exists Pincode;
drop table if exists Secondary;
drop table if exists Inventory;
drop table if exists Table_info;
drop table if exists Order_items;
drop view if exists Cust_Category;
drop table if exists Order_info;
drop table if exists Dish;
drop table if exists Cust_Coups;
drop table if exists Customer;
drop table if exists Delivery_Man;
drop table if exists "session";
/* drop table if exists Pincode; */
drop trigger if exists delete_coupon_trigger on Coupon;
drop function if exists delete_coupon;
drop table if exists Coupon;
drop extension if exists pgcrypto;

/* --Pincode information
CREATE TABLE Pincode (
   Zip VARCHAR(6) NOT NULL,
   Primary key(Zip)
); */

CREATE EXTENSION pgcrypto;

--Table Manager information
CREATE TABLE Table_Manager (
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Salary INT NOT NULL,
   Passcode TEXT NOT NULL,
   Primary key(Username)
);

--Delivery Manager information
CREATE TABLE Delivery_manager (
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Salary INT NOT NULL,
   Passcode TEXT NOT NULL,
   Primary key(Username)
);

--Chef information
CREATE TABLE Chef (
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Salary INT NOT NULL,
   Passcode TEXT NOT NULL,
   Role TEXT CHECK(Role='regular' or Role='head'),
   Primary key(Username)
);

--Coupon information
CREATE TABLE Coupon (
   CouponID INT NOT NULL,
   Expiry_date DATE NOT NULL,
   User_category TEXT CHECK(User_category='Beginner' or User_category='VIP' or User_category='Premium') NOT NULL,
   Discount FLOAT NOT NULL,
   Min_bill FLOAT NOT NULL,
   Max_discount FLOAT NOT NULL,
   Primary key(CouponID)
);

CREATE SEQUENCE coupon_id
START 1
INCREMENT 1
NO MAXVALUE
MINVALUE 1
OWNED BY Coupon.CouponID;

--Inventory information
CREATE TABLE Inventory (
   ItemID INT NOT NULL,
   Name TEXT NOT NULL,
   Quantity INT NOT NULL,
   Primary key(ItemID)
);

CREATE SEQUENCE item_id
START 1
INCREMENT 1
NO MAXVALUE
MINVALUE 1
OWNED BY Inventory.ItemID;

--Dish information
CREATE TABLE Dish (
   DishID INT NOT NULL,
   Name TEXT NOT NULL,
   Price FLOAT NOT NULL,
   Available TEXT CHECK(Available='Yes' or Available='No'),
   Non_Veg TEXT CHECK(Non_Veg='Yes' or Non_Veg='No'),
   Category  TEXT CHECK(Category='Starters' or Category='Main Course' or Category='Desserts' or Category='Beverages'),
   --Rating INT NOT NULL,
   Primary key(DishID)
);

CREATE SEQUENCE dish_id
START 1
INCREMENT 1
NO MAXVALUE
MINVALUE 1
OWNED BY Dish.DishID;

CREATE TABLE Add_items (
   ItemID INT NOT NULL,
   Today DATE NOT NULL,
   Quantity INT NOT NULL,
   Primary key(ItemID, Today),
   Foreign key(ItemID) references Inventory ON DELETE CASCADE
);

CREATE TABLE Ingredients (
   ItemID INT NOT NULL,
   DishID INT NOT NULL,
   Quantity INT NOT NULL,
   Primary key(ItemID, DishID),
   Foreign key(DishID) references Dish ON DELETE CASCADE,
   Foreign key(ItemID) references Inventory ON DELETE CASCADE
);

--Delivery man information
CREATE TABLE Delivery_Man (
   Available TEXT CHECK(Available='Yes' or Available='No'),
   primary_Zip VARCHAR(6) NOT NULL,
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Salary INT NOT NULL,
   Passcode TEXT NOT NULL,
   Primary key(Username)
   /* Foreign key(primary_Zip) references Pincode ON DELETE SET NULL */
);

--Customer information
CREATE TABLE Customer (
   Address TEXT NOT NULL,
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Passcode TEXT NOT NULL,
   Zip VARCHAR(6) NOT NULL,
   Primary key(Username)
   /* Foreign key(Zip) references Pincode ON DELETE SET NULL */
);

CREATE TABLE Cust_Coups (
   CouponID INT NOT NULL,
   Username VARCHAR(20) NOT NULL,
   Primary key(Username, CouponID),
   foreign key (Username) references Customer ON DELETE CASCADE,
   foreign key (CouponID) references Coupon ON DELETE CASCADE
);

--Order information
CREATE TABLE Order_info (
   OrderID INT NOT NULL,
   DeliveryID VARCHAR(20),
   CustomerID VARCHAR(20) NOT NULL,
   Mode TEXT NOT NULL,
   Status TEXT CHECK(Status='Received' or Status='Cooked' or Status='Out for delivery' or Status='Delivered'),
   Time TIMESTAMP NOT NULL,
   Primary key(OrderID),
   Foreign key(DeliveryID) references Delivery_Man ON DELETE SET NULL,
   Foreign key(CustomerID) references Customer ON DELETE CASCADE
);

create view Cust_Category AS
WITH new_table(CustomerID, num_orders) AS (SELECT CustomerID, COUNT(OrderID) FROM Order_info GROUP BY CustomerID)
SELECT CustomerID, CASE WHEN num_orders<3 THEN 'Beginner' WHEN num_orders<7 THEN 'VIP' ELSE 'Premium' END as category FROM new_table;


CREATE TABLE Order_items (
   OrderID INT NOT NULL,
   DishID INT NOT NULL,
   Quantity INT NOT NULL,
   Primary key(OrderID, DishID),
   Foreign key(OrderID) references Order_info ON DELETE CASCADE,
   Foreign key(DishID) references Dish ON DELETE CASCADE
);

CREATE TABLE Cart (
   CustomerID VARCHAR(20) NOT NULL,
   DishID INT NOT NULL,
   Quantity INT NOT NULL,
   Primary key(CustomerID, DishID),
   Foreign key(CustomerID) references Customer ON DELETE CASCADE,
   Foreign key(DishID) references Dish ON DELETE CASCADE
);


--Table information
CREATE TABLE Table_info (
   TableID INT NOT NULL,
   Status TEXT CHECK(Status='Free' or Status='Not free'),
   Primary key(TableID)
);

CREATE SEQUENCE table_id
START 1
INCREMENT 1
NO MAXVALUE
MINVALUE 1
OWNED BY Table_info.TableID;

CREATE TABLE Table_cart (
   TableID INT NOT NULL,
   DishID INT NOT NULL,
   CartQuantity INT NOT NULL,
   OrderQuantity INT NOT NULL,
   CookedQuantity INT NOT NULL,
   Primary key(TableID, DishID),
   Foreign key(TableID) references Table_info ON DELETE CASCADE,
   Foreign key(DishID) references Dish ON DELETE CASCADE
);

CREATE TABLE Secondary (
   DeliveryID VARCHAR(20) NOT NULL,
   Zip VARCHAR(6) NOT NULL,
   Primary key(DeliveryID, Zip),
   Foreign key(DeliveryID) references Delivery_Man ON DELETE CASCADE
);

CREATE TABLE Waiter (
   /* Available TEXT CHECK(Available='Yes' or Available='No'), */
   Username VARCHAR(20) NOT NULL,
   /* TableID INT, */
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Salary INT NOT NULL,
   Passcode TEXT NOT NULL,
   Primary key(Username)
   -- Foreign key(TableID) references Table_info
);

create view Pincode AS
select primary_Zip from Delivery_Man union select Zip from Secondary;

CREATE FUNCTION delete_coupon() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM Coupon WHERE Expiry_date < now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER delete_coupon_trigger
    AFTER INSERT ON Coupon
    EXECUTE PROCEDURE delete_coupon();

CREATE SEQUENCE order_id
START 1
INCREMENT 1
NO MAXVALUE
MINVALUE 1
OWNED BY Order_info.OrderID;

ALTER TABLE Coupon ALTER CouponID SET DEFAULT NEXTVAL('coupon_id');
ALTER TABLE Dish ALTER DishID SET DEFAULT NEXTVAL('dish_id');
ALTER TABLE Inventory ALTER ItemID SET DEFAULT NEXTVAL('item_id');
ALTER TABLE Table_info ALTER TableID SET DEFAULT NEXTVAL('table_id');
ALTER TABLE Order_info ALTER OrderID SET DEFAULT NEXTVAL('order_id');


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


CREATE TABLE owner (
   Username VARCHAR(20) NOT NULL,
   Name TEXT NOT NULL,
   Contact CHAR(10) NOT NULL,
   Passcode TEXT NOT NULL,
   Primary key(Username)
);

