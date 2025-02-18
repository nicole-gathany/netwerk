import React, { useState, useEffect } from 'react';
import { createNetworkingContact, getRandomPrompts, NetworkingPrompt } from '../services/appwrite';

type FormData = {

    "event-name": string;
    "name": string;
    "company": string;
    "position": string;
    "spark": string;
    "met-through-prompt": boolean, 
    "prompt-id":  string,           // ID of the prompt
    "badge-earned": string,        // ID of badge earned through this interaction
    
}


const NetworkingForm: React.FC = () => {

    const [surveyItem, setSurveyItem] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        "event-name": "",
        "name": "",
        "company": "",
        "position": "",
        "spark": "",
        "met-through-prompt": false, 
        "prompt-id":  "",           // ID of the prompt
        "badge-earned": "",        // ID of badge earned through this interaction
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prompts, setPrompts] = useState<NetworkingPrompt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const determineBadge = (promptId: string): string => {
        const badgeMapping: Record<string, string> = {
            "appwrite-id-1": "Connector Badge",
            "appwrite-id-2": "Conversation Starter Badge",
            "appwrite-id-3": "Network Builder Badge",
        };
    
        return badgeMapping[promptId] || "Default Badge 🚀";
    };

    useEffect(() => {
        const fetchPrompts = async () => {
        try {
            const retrievedPrompts = await getRandomPrompts(); // Fetch from Appwrite
            setPrompts(retrievedPrompts); // Store prompts in state
        } catch (error) {
            console.error("Error fetching prompts:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchPrompts();
}, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData, " is formData")
      
        
        const newContact = {
            ...formData,
            "date-added": new Date(),
            "follow-up": false,
            "linkedin-added": false,
            "bluesky-added": false,
            "twitter-added": false,
            "second-follow-up": null,
            "third-follow-up": null,
        };

        

        

        try {
             // Handle success
            const response = await createNetworkingContact(newContact);
            console.log('Contact created:', response);
            setIsSubmitted(true);
           
        } catch (error) {
            // Handle error
            console.log(error, "because it did not work")
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setSurveyItem(prev => prev + 1)
    }

    const goBack = (e: React.FormEvent) => {
        e.preventDefault();
        setSurveyItem(prev => prev - 1)
    }

    const renderSurveyItem = () => {
        switch(surveyItem) {
            case 1: 
            return (
                <form onSubmit={handleNextStep} >
                     {/* contact name */}
                    <label htmlFor="name">Who did you meet? (name)</label>
                    <input 
                        type="text" 
                        value={formData["name"]}
                        onChange={(e) => setFormData({...formData, "name": e.target.value})}
                        name="name" 
                        id="name"
                        required
                    />
                    <br></br>
                    <button type="submit">Next</button>
                </form>
               
            )
            case 2: 
            return (
                <form onSubmit={handleNextStep}>

                    {/* event name */}
                <label htmlFor="event-name">Where did you meet them? </label>
                <input 
                    type="text" 
                    value={formData["event-name"]}
                    onChange={(e) => setFormData({...formData, "event-name": e.target.value})}
                    name="event-name" 
                    id="event-name" 
                    placeholder="Render ATL"
                    />
                    <br></br>
                    <button onClick={goBack}>Back</button><button type="submit">Next</button>
                    
                </form>
            )

            case 3: 
            return (
                <form onSubmit={handleNextStep}>

                   {/* company */}
                 <label htmlFor="company">What company do they work for?</label>
                    <input 
                        type="text" 
                        value={formData["company"]}
                        onChange={(e) => setFormData({...formData, "company": e.target.value})}
                        name="company" 
                        id="company"
                        required
                    />
                    <br></br>
                    <button onClick={goBack}>Back</button><button type="submit">Next</button>
                    
                </form>
            )

            case 4: 
            return (
                <form onSubmit={handleNextStep}>
                    <label htmlFor="position">What do they do there?</label>
                    <input 
                        type="text" 
                        value={formData["position"]}
                        onChange={(e) => setFormData({...formData, "position": e.target.value})}
                        name="position" 
                        id="position"
                        required
                        />
                        <br></br>
                    <button onClick={goBack}>Back</button><button type="submit">Next</button>
                    
                </form>
            )
            case 5: 
            return (
                <form onSubmit={handleNextStep}>
                    <label htmlFor="spark">What did you all talk about?</label>
                <input 
                    type="text" 
                    value={formData["spark"]}
                    onChange={(e) => setFormData({...formData, "spark": e.target.value})}
                    name="spark" 
                    id="spark"
                    required
                />
                 {/* submit button here */}
                 <br></br>
                 <button onClick={goBack}>Back</button><button type="submit">Next</button>
                    {/* <button onClick={goBack}>Back</button><button type="submit">Submit</button> */}
                    
                </form>
            )

            case 6:
            return (
                <form onSubmit={handleSubmit}>
                    <label>Select a networking prompt:</label>
                        <br />
            
                        {loading ? (
                <p>Loading prompts...</p>
                    ) : (
                <select
                    value={formData["prompt-id"] || ""}
                    onChange={(e) => {
                        const selectedPromptId = e.target.value;
                        // const selectedPrompt = prompts.find(prompt => prompt.$id === selectedPromptId);
                        const badge = determineBadge(selectedPromptId);

                        const metThrough = selectedPromptId === "None" ? false : true;

                        setFormData({
                            ...formData,
                            "met-through-prompt": metThrough,
                            "prompt-id": selectedPromptId,
                            "badge-earned": badge,
                        });
                    }}
                >
                    <option value="" disabled>Select a prompt</option>
                    {prompts.map((prompt) => (
                        <option key={prompt.$id} value={prompt.$id}>
                            {prompt.observation} {/* Adjust this based on your Appwrite structure */}
                        </option>
                    ))}
                    <option key={0}>None</option>
                </select>
            )}
            
            <br />
            {formData["badge-earned"] && <p>Badge Earned: {formData["badge-earned"]}</p>}

            <button onClick={goBack}>Back</button>
            <button type="submit">Submit</button>
        </form>
    );

        }
    }

    const successMessage = 
     <div>
        <h2>
            Success!
        </h2>
        <p>You have added {formData["name"]} to your network</p>

        <h3>What next?</h3>
        <p>Add them on social media</p>
        <a href="https://www.linkedin.com/">LinkedIn</a>
        <br></br>
        <a href="https://bsky.app/">Bluesky</a>
        <br></br>
        <a href="https://x.com/home">Twitter</a>
    </div>

    return (
        <div>
            <h1>Networking Form</h1>

            {!isSubmitted && renderSurveyItem()}
            {isSubmitted && successMessage}
                
           
        </div>
    );
};

export default NetworkingForm;