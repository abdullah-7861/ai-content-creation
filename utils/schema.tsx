import { pgTable, serial } from "drizzle-orm/pg-core";
import { text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  templateslug: varchar("templateSlug").notNull(),
  aiResponse: text("airesponse"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
});

export const ResumeTable = pgTable("ResumeTable", {
  resumeid: varchar("resumeid").primaryKey(),
  title: varchar("title").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
});
