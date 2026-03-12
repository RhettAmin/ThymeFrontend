
class ThymeBackendConfig {
    private static instance: ThymeBackendConfig
    public readonly recipesBaseURL: string
    public readonly recipesEndpoint: string

    private constructor() {
        if (!process.env.NEXT_PUBLIC_THYME_BACKEND_URL) {
            throw new Error('NEXT_PUBLIC_THYME_BACKEND_URL is required')
        }
        
        this.recipesBaseURL = process.env.NEXT_PUBLIC_THYME_BACKEND_URL
        this.recipesEndpoint = process.env.NEXT_PUBLIC_THYME_RECIPES_ENDPOINT! 
    }

    public static getInstance(): ThymeBackendConfig {
        if (!ThymeBackendConfig.instance) {
            ThymeBackendConfig.instance = new ThymeBackendConfig()
        }
        return ThymeBackendConfig.instance
    }
}

export const ThymeConfig = ThymeBackendConfig.getInstance()