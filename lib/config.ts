interface Config{
    databaseUrl: string,
    apibaseUrl: string
    nextpublicbaseUrl: string
}

export const config: Config = {
    databaseUrl: process.env.DATABASE_URL!,
    apibaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
    nextpublicbaseUrl: process.env.NEXT_PUBLIC_BASE_URL!    
}