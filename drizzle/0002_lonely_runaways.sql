ALTER TABLE "user" RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
