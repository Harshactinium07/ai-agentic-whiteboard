import {NextRequest, NextResponse} from "next/server"
import {currentUser} from "@clerk/nextjs/server"
import { db,users } from "@/db"
import { eq } from "drizzle-orm"
export async function POST(req:NextRequest) {
    const user = await currentUser()
    
    // if user already exits??
    if(user) {
        const userData = await db.select().from(users)
            //@ts-ignore
            .where(eq(user.primaryEmailAddress?.emailAddress, user.email))

            if(userData.length > 0) {
                return NextResponse.json(userData[0]);
            }else{
                const result = await db.insert(users).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress ?? "",
                }).returning()
                return NextResponse.json(result[0]);
            }
    }
    return NextResponse.json({error: "User not found"}, {status: 404})
    //if user does not exist, create a new user in the database
}