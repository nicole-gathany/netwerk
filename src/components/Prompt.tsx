import React, {useState, useEffect} from "react";
import { getRandomPrompts, NetworkingPrompt } from "../services/appwrite";




const Prompt: React.FC = () => {

    const [prompts, setPrompts] = useState<NetworkingPrompt[]>([]);
    const [promptIndex, setPromptIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  

    useEffect(() => {
        const fetchedPrompts = async () => {
            try{
                const fetchedPrompts = await getRandomPrompts(3);
                setPrompts(fetchedPrompts);
            } catch(err){ //calling it "err" because we already have error as a state
                console.error(err, " is error")
                setError("Failed to fetch prompts")
            } finally {
                setLoading(false);
            }
        }
        fetchedPrompts();
    }, [])

    const changePrompt = () => {
        if (promptIndex < prompts.length-1) {
            setPromptIndex(prev => prev + 1) 
        } else {
            setPromptIndex(0)
        }
    }

    const prompt = prompts[promptIndex]

    const promptContent = prompt && prompt.observation && prompt.question ? (
        <div key={promptIndex}>
            <p><strong>Search:</strong> {prompt.observation}</p>
            <p><strong>Conversation starter:</strong> {prompt.question}</p>
        </div>
    ) : (
        <div>No prompts available.</div> // Display a fallback message if prompt data is empty
    );
   

  
     const loadingContent = <div><h4>loading content...</h4></div>

     const errorContent = <div><h4>There was an error loading content</h4></div>


    return (<div>
        <h2>Prompt</h2>
        {!loading && !error && promptContent}
        {loading && loadingContent}
        {error && errorContent}

        {promptIndex<3 && <button onClick={changePrompt}>Next Prompt</button> }
    </div>)

}

export default Prompt;