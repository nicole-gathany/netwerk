/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_PROJECT_ID: string
    readonly VITE_APPWRITE_DATABASE_ID: string
    readonly VITE_APPWRITE_COLLECTION_ID: string
    readonly VITE_APPWRITE_PROMPTS_COLLECTION_ID: string
}