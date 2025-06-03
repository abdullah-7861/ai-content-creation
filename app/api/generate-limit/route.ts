
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MAX_FREE_COUNTS } from "@/constant";
import { eq, sql } from "drizzle-orm";
import { UserGenerationLimit } from "@/utils/schema";
import { count } from "console";
import { Ingrid_Darling } from "next/font/google";

export const increaseGenerationLimit = async () => {
  const { userId } = auth();
  console.log("user ID", userId);
  if (!userId) {
    return;
  }

  const userGenLimit = await db
    .select()
    .from(UserGenerationLimit)
    .where(eq(UserGenerationLimit.userId, userId))
    .limit(1);
  // console.log("userGenLimit", userGenLimit);

  if (userGenLimit.length > 0) {
    // console.log("inside if", userGenLimit);
    await db
      .update(UserGenerationLimit)
      .set({ count: sql`${UserGenerationLimit.count} + 1` })
      .where(eq(UserGenerationLimit.userId, userId));
  } else {
    console.log("inside if blcok");
    await db.insert(UserGenerationLimit).values({
      userId: userId,
      count: 1,
    });
  }
};

export const CheckGenerationLimit = async () => {
  const { userId } = auth();
  console.log("user id ", userId)
  {/*@ts-ignore */}
  const userGenLimit = await db.select().from(UserGenerationLimit).where(eq(UserGenerationLimit.userId, userId)).limit(1);
  console.log("usergenLimit", userGenLimit);

  if (!(userGenLimit.length > 0)  || userGenLimit[0].count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getGenLimit = async ()=>{
  const { userId } = auth();
  if(!userId){
    return 0;
  }
 {/*@ts-ignore */}
 const userGenLimit = await db.select().from(UserGenerationLimit).where(eq(UserGenerationLimit.userId, userId)).limit(1);

if(!(userGenLimit.length > 0)){
  return 0
}

return userGenLimit[0].count

}
