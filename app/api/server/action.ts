"use server"

import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { type_HobbiesIntrestsValues } from "@/type";
import { redirect } from "next/navigation";

export async function CreateSukiUser(formData: FormData) {
    const userId = formData.get("userId") as string;
    const userNickName = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const dd = formData.get("day") as string;
    const mm = formData.get("month") as string;
    const yyyy = formData.get("year") as string;
    const gender = formData.get("gender") as string;
    const nationality = formData.get("nationality") as string;
    const overeighteen = Boolean(formData.get("checkbox1"));
    const acceptrules = Boolean(formData.get("checkbox2"));
    //console.log(userNickName,email,dd,mm,yyyy,gender,overeighteen,acceptrules)
    await prisma.user.update({
        where: {
            id: userId,
            email:email,
        }, data: {
            nickname: userNickName,
            bdday: Number(dd),
            bdmonth: Number(mm),
            bdyear: Number(yyyy),
            gender: gender,
            nationality: nationality,
            overeightenn: overeighteen,
            acceptrules: acceptrules
        }
    })
    return redirect(`${config.nextpublicbaseUrl}/onboarding/profile-setup`)
}

export async function CreateSukiUserIntro(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const userProfileId = formData.get("userProfileId") as string;
    //console.log(title, content, userProfileId)
    const isSukiUserIntroExit = await prisma.sukiUserIntro.findFirst({
        where: {
            userProfileId: userProfileId
        }
    })
    if (!isSukiUserIntroExit)
    {
        await prisma.sukiUserIntro.create({
            data: {
                userProfileId: userProfileId,
                title: title,
                content: content
            }
        })
        return redirect(`${config.nextpublicbaseUrl}/onboarding/my-tag`)
    } else {
        return redirect(`${config.nextpublicbaseUrl}/onboarding/my-tag`)
    }
}

export async function UpdateSukiUserIntro(formData: FormData) {
    
    const sukiUserProfileId = formData.get("sukiUserProfileId") as string;
    const title  = formData.get("title") as string;
    const content = formData.get("content") as string;

    //console.log(sukiUserProfileId, title, content)
    
    const isSukiUserIntroExit = await prisma.sukiUserIntro.findFirst({
        where: {
            userProfileId:sukiUserProfileId
        }
    })
    const isSukiUserPreferencesExit = await prisma.sukiUserPreferences.findFirst({
        where: {
            sukiUserProfileId: sukiUserProfileId
        },
        select: {
            userHobbies: true,
            userIntrests: true,
            userValues: true
        }
    })

    if (isSukiUserIntroExit && isSukiUserPreferencesExit) {
        await prisma.sukiUserIntro.updateMany({
            where: {
                userProfileId: sukiUserProfileId
            },
            data: {
                title: title,
                content:content
            }
        })
        if (!isSukiUserPreferencesExit) {
            return redirect(`${config.nextpublicbaseUrl}/onboarding/my-tag`)
        } else {
            return redirect(`${config.nextpublicbaseUrl}/onboarding/preview`)
        }
    } else {
        if (!isSukiUserIntroExit)
        {
            await prisma.sukiUserIntro.create({
                data: {
                    userProfileId:sukiUserProfileId,
                    title: title,
                    content: content
                }
            })
        } else {
            await prisma.sukiUserIntro.updateMany({
            where: {
                userProfileId: sukiUserProfileId
            },
            data: {
                title: title,
                content:content
            }
        })
        }
        return redirect(`${config.nextpublicbaseUrl}/onboarding/my-tag`)
    }
}

export async function CreateUserHobsIntsVals(formData: type_HobbiesIntrestsValues,sukiUserProfileId: string) {
    const { userHobbies, userIntrests, userValues } = formData;
    if(sukiUserProfileId!=="")
        {
            //console.log(sukiUserProfileId,userHobbies,userIntrests,userValues)
            const isSukiUserPreferencesExit = await prisma.sukiUserPreferences.findFirst({
                where: {
                    sukiUserProfileId: sukiUserProfileId
                }
            })
            //console.log(isSukiUserPreferencesExit)
            if (!isSukiUserPreferencesExit) {
                await prisma.sukiUserPreferences.create({
                    data: {
                        sukiUserProfileId: sukiUserProfileId,
                        userHobbies: userHobbies,
                        userIntrests: userIntrests,
                        userValues: userValues
                    }
                })
            }
            else {
                await prisma.sukiUserPreferences.updateMany({
                    where: {
                        sukiUserProfileId: sukiUserProfileId
                    },
                    data: {
                        userHobbies: userHobbies,
                        userIntrests: userIntrests,
                        userValues: userValues
                    }
                })
            }
        //console.log("hi")
            await prisma.sukiUserProfile.update({
                where: {
                        id:sukiUserProfileId
                },
                data: {
                    isSetupComplete: true,
                    isIdentified:true,
                }
                })
            return redirect(`${config.nextpublicbaseUrl}/onboarding/preview`)
    }
    else {
        redirect(`${config.nextpublicbaseUrl}/error/user-not-found`)
    }
}
