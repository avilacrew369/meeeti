import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar, text, timestamp } from  "drizzle-orm/pg-core";

export const communities = pgTable('communities', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    creteBy: text('creted_by').notNull()
   
});
