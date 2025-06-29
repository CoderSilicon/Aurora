import { currentUser } from "@clerk/nextjs/server"
import {  db } from "./prisma"

export const checkUser = async()=>{
    const user = await currentUser()

    if(!user) throw new Error("Unauthorized")

  try {
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    })

    if(loggedInUser) return loggedInUser

    const name = user.firstName + " " + user.lastName

    const newUser = await db.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: name
        }
    })
    
    return newUser
    
  } catch (error) {
    console.log("[CHECK_USER]", error)
    throw error
  }
}
