"use server"

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function CreateSukiUser(formData: FormData) {
    const userId = formData.get("userId") as string;
    const userNickName = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const dd = formData.get("day") as string;
    const mm = formData.get("month") as string;
    const yyyy = formData.get("year") as string;
    const gender = formData.get("gender") as string;
    const overeighteen = Boolean(formData.get("checkbox1"));
    const acceptrules = Boolean(formData.get("checkbox2"));
    //console.log(userNickName,email,dd,mm,yyyy,gender,overeighteen,acceptrules)
    const updateUser = await prisma.user.update({
        where: {
            id: userId,
            email:email,
        }, data: {
            nickname: userNickName,
            bdday: Number(dd),
            bdmonth: Number(mm),
            bdyear: Number(yyyy),
            gender: gender,
            overeightenn: overeighteen,
            acceptrules: acceptrules
        }
    })
    return redirect(`/profile-setup/${userId}`)
}