import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";
import { config } from "./config";

export const isValidUser = (user: KindeUser<Record<string, any>>) => {
    if (!user)
    return redirect(`${config.nextpublicbaseUrl}/error/user-not-found`);
}

export const isValidSukiUser = (user: KindeUser<Record<string, any>>,sukiUserProfileId?: string) => {
    if (!user || !sukiUserProfileId)
    return redirect(`${config.nextpublicbaseUrl}/error/user-not-found`);
}