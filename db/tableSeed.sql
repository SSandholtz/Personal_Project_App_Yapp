CREATE TABLE "account" (
	"acc_id" serial NOT NULL,
	"acc_email" varchar(250) NOT NULL,
	"acc_hash" varchar(500) NOT NULL,
	"company_name" varchar(250) unique NOT NULL,
	"company_logo" varchar(10000),
	CONSTRAINT account_pk PRIMARY KEY ("acc_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "app" (
	"app_id" serial NOT NULL,
	"app_owner" text NOT NULL,
	"app_name" varchar (500) NOT NULL,
	"app_download_link" varchar(500),
	"app_feedback" varchar(500),
	"app_logo" varchar(10000),
	"visibility" boolean,
	CONSTRAINT app_pk PRIMARY KEY ("app_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "analytics" (
	"analytics_id" serial NOT NULL,
	"date" TIMESTAMP NOT NULL,
	"clicked_id" integer NOT NULL,
	CONSTRAINT analytics_pk PRIMARY KEY ("analytics_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "app" ADD CONSTRAINT "app_fk0" FOREIGN KEY ("app_owner") REFERENCES "account"("company_name");

ALTER TABLE "analytics" ADD CONSTRAINT "analytics_fk0" FOREIGN KEY ("clicked_id") REFERENCES "app"("app_id");
