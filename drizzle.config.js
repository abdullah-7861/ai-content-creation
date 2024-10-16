import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials:{
    url:'postgresql://Ai-Content-Creation_owner:SFPE1Wc8xCHi@ep-black-hall-a5zterxw.us-east-2.aws.neon.tech/Ai-Content-Creation?sslmode=require', 
  }
});