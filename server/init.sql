CREATE TABLE "user" (
  "username" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "password" text NOT NULL,
  "phone" text NOT NULL,
  "email" text UNIQUE NOT NULL
);

CREATE TABLE "admin" (
  "username" text PRIMARY KEY NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_username" text,
  "unique_code" text,
  "service_type" text NOT NULL,
  "pickup_address" text,
  "dropoff_address_id" integer,
  "device" text,
  "device_brand" text,
  "problem_type" text,
  "problem_desc" text,
  "datetime" timestamp NOT NULL,
  "order_status" text NOT NULL,
  "admin_username" text,
  "total_price" integer
);

CREATE TABLE "orders_history" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "order_id" integer NOT NULL,
  "technician_id" integer,
  "datetime" timestamp NOT NULL,
  "status" text NOT NULL,
  "description" text
);

CREATE TABLE "technician" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" text,
  "phone" text
);

CREATE TABLE "store" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "address" text,
  "phone" text
);

CREATE TABLE "blobs" (
  "id" integer,
  "filename" text PRIMARY KEY NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("user_username") REFERENCES "user" ("username");

ALTER TABLE "blobs" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("dropoff_address_id") REFERENCES "store" ("id");

ALTER TABLE "orders_history" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "orders_history" ADD FOREIGN KEY ("technician_id") REFERENCES "technician" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("admin_username") REFERENCES "admin" ("username");