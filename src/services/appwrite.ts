import { Client, Databases, ID, Models } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

interface NetworkingContact {
    "event-name": string;
    "date-added": Date;
    "name": string;
    "company": string;
    "position": string;
    "spark": string;
    "follow-up": boolean;
    "linkedin-added": boolean;
    "bluesky-added": boolean;
    "twitter-added": boolean;
    "second-follow-up": boolean | null;
    "third-follow-up": boolean | null;
}

export const createNetworkingContact = async (contactData: NetworkingContact): Promise<Models.Document> => {
    try {
        const response = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            ID.unique(),
            contactData
        );
        return response;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};
