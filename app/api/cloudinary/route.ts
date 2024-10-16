import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {
    const reqBody = await req.json();
    const { public_id } = await reqBody;
    const res = await cloudinary.v2.uploader.destroy(public_id);

    return NextResponse.json({message:"ok"},{status:200})
}
