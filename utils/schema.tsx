import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  uniqueIndex,
  text,
} from "drizzle-orm/pg-core";

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
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  address: varchar("address"),
  jobTitle: varchar("jobTitle"),
  phone: varchar("phone"),
  email: varchar("email"),
  summary: varchar("summary"),
  themeColor: varchar("themeColor").default("#ff6666"),
});

export const ProfessionalExperienceTable = pgTable(
  "ProfessionalExperienceTable",
  {
    Experienceid: serial("experienceId").primaryKey(),
    resumeId: varchar("resumeId")
      .references(() => ResumeTable.resumeid, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    Positiontitle: varchar("positiontitle").notNull(),
    companyName: varchar("companyName").notNull(),
    city: varchar("city"),
    state: varchar("state"),
    startDate: varchar("startDate"),
    endtDate: varchar("endDate"),
    workSummary: varchar("workSummary"),
  }
);

export const EducationTable = pgTable("EducationTable", {
  educationid: serial("educationID").primaryKey(),
  resumeId: varchar("resumeId")
    .references(() => ResumeTable.resumeid, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  degree: varchar("degree").notNull(),
  universityName: varchar("universityName").notNull(),
  major: varchar("major"),
  startDate: varchar("startDate"),
  endtDate: varchar("endDate"),
  description: varchar("description"),
});

export const SkillTable = pgTable("SkillTable", {
  skillid: serial("skillID").primaryKey(),
  resumeId: varchar("resumeId")
    .references(() => ResumeTable.resumeid, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  name: varchar("name").notNull(),
  rating: integer("rating").notNull(),
});

export const UserGenerationLimit = pgTable(
  "UserGenerationLimit", // <-- Table name
  {
    id: serial("id").primaryKey(), // <-- serial type for auto-incrementing PK
    userId: varchar("userId", { length: 256 }).notNull(), // <-- varchar needs length
    count: integer("count").default(0).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
  },
  (table) => ({
    userIdIdx: uniqueIndex("user_generation_user_id_idx").on(table.userId),
  })
);

export const UserSubscription = pgTable(
  "UserSubscription", // <-- Table name
  {
    id: serial("id").primaryKey(), // <-- serial type for auto-incrementing PK
    userId: varchar("userId", { length: 256 }).notNull(), // <-- varchar needs length
    stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).unique().notNull(),
    stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).unique().notNull(),
    stripePriceId: varchar("stripePriceId", { length: 255 }).notNull(),
    stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd")
   }
  // (table) => ({
  //   userIdIdx: uniqueIndex("user_generation_user_id_idx").on(table.userId),
  // })
);

