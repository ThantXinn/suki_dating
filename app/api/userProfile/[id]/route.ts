import prisma from "@/lib/db";
import { MultiFormData } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{id:string}}) {
    const userId = params.id;
    try {
        if (userId) {
            const isUserProfileExit = await prisma.sukiUserProfile.findFirst({
                where: {
                    userId:userId
                }
            })
            return NextResponse.json({isUserProfileExit},{status:200})
        }
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req:NextRequest){
    const reqBody = await req.json();
    const {
        userId,
        jobCategory,
        offDayCategory,
        offDayActivityCategory,
        livingCategory,
        bodyHeightCategory,
        bodyTypeCategory,
        smokingCategory,
        personTypeCategory,
        incomeCategory,
        educationCategory}:MultiFormData = await reqBody;
    try {
        if (userId) {
            const isUserProfileExit = await prisma.sukiUserProfile.findFirst({
                where: {
                    userId:userId
                }
            })
            if (!isUserProfileExit) {
                const { firstInput, secondInput, thirdInput } = bodyHeightCategory;
                const userBodyHeight = (Number(firstInput) * 100) + (Number(secondInput) * 10) + (Number(thirdInput) * 1);
                const userProfile = await prisma.sukiUserProfile.create({
                    data: {
                        userId: userId,
                        jobCategory: jobCategory,
                        offDayCategory: offDayCategory,
                        offDayActivity: offDayActivityCategory,
                        livingCategory: livingCategory,
                        bodyHeightCategory: userBodyHeight,
                        bodyTypeCategory: bodyTypeCategory,
                        smokingCategory: smokingCategory,
                        personTypeCategory: personTypeCategory,
                        incomeCategory: incomeCategory,
                        educationCategory: educationCategory
                    }
                })
                return NextResponse.json({userProfile},{status:200})
            }
        }
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:"OK"},{status:200})
}

export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
    const userId = params.id;
    const reqBody = await req.json();
    const { sukiUserProfileId, secureUrl } = await reqBody;
    try {
        if (userId && sukiUserProfileId) {
            const updateSukiUserProfile = await prisma.sukiUserProfile.update({
                where: {
                    id:sukiUserProfileId,  
                    userId: userId
                },
                data: {
                    profilePhotoUrl: secureUrl
                }
            })
            //console.log(updateSukiUserProfile)
            return NextResponse.json({ updateSukiUserProfile });
        }
    } catch (error) {
        console.log(error)
    }
}
