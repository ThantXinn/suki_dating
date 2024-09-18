import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log(user)
    if (!user || user === null || !user.id) {
        throw new Error("Something went wrong... try again");
    }

    let dbUser = await prisma.user.findUnique(
        {
            where: {
                id: user.id
            }
        }
    )
    if (!dbUser) {
        dbUser = await prisma.user.create(
            {
                data: {
                    id: user.id,
                    email: user.email ?? "",
                    firstname: user.given_name ?? "",
                    lastname: user.family_name ?? "",
                    image: user.picture ?? ""
                }
            }
        )
        return NextResponse.redirect("http://localhost:3000/create")
    } else
        return NextResponse.redirect("http://localhost:3000")
}