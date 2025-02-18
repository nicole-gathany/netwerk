import { Client, Databases, ID, Models, Query } from "appwrite";

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
    "met-through-prompt": boolean | null;  
    "prompt-id": string | null;           // ID of the prompt
    "badge-earned": string | null;        // ID of badge earned through this interaction

}

export type NetworkingPrompt = {
    $id: string
    "observation": string
    "question": string
    "category": string
    "difficulty": number
    "active": boolean
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

export const getRandomPrompts = async (count: number= 3): Promise<NetworkingPrompt[]> => {
    try 
    {
        console.log("starting fetching")
   
        const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROMPTS_COLLECTION_ID,
       [
        Query.equal("active", true),
        Query.limit(count)
       ]
    );
    return response.documents.map(doc => ({
        $id: doc.$id,
        observation: doc.observation,
        question: doc.question,
        category: doc.category,
        difficulty: doc.difficulty,
        active: doc.active
    }));
    } catch(error) {
        console.error('Error creating contact:', error);
        throw error;
    }
}
