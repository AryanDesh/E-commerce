import { Migration } from '@mikro-orm/migrations';

export class Migration20241104145645 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "vendor" ("id" text not null, "business_name" text not null, "contact_info" text not null, "tax_details" text null, "is_approved" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_pkey" primary key ("id"));');

    this.addSql('create table if not exists "vendor-admin" ("id" text not null, "first_name" text null, "last_name" text null, "email" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor-admin_pkey" primary key ("id"));');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor-admin_email_unique" ON "vendor-admin" (email) WHERE deleted_at IS NULL;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "vendor" cascade;');

    this.addSql('drop table if exists "vendor-admin" cascade;');
  }

}
