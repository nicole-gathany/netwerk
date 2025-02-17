import React, { useState } from 'react';
import { createNetworkingContact } from '../services/appwrite';

type FormData = {

    "event-name": string;
    "name": string;
    "company": string;
    "position": string;
    "spark": string;
}


const NetworkingForm: React.FC = () => {

    const [surveyItem, setSurveyItem] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        "event-name": "",
        "name": "",
        "company": "",
        "position": "",
        "spark": "",
    })
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

      
        
        const newContact = {
            ...formData,
            "date-added": new Date(),
            "follow-up": false,
            "linkedin-added": false,
            "bluesky-added": false,
            "twitter-added": false,
            "second-follow-up": null,
            "third-follow-up": null
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
                  
                    <button onClick={goBack}>Back</button><button type="submit">Next</button>
                    
                </form>
            )
            case 5: 
            return (
                <form onSubmit={handleSubmit}>
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
                  
                    <button onClick={goBack}>Back</button><button type="submit">Submit</button>
                    
                </form>
            )
        }
    }

    const successMessage = 
     <div>
        <h1>
            Success!
        </h1>
        <p>You have added {formData["name"]} to your network</p>

        <h3>What next?</h3>
        <p>Add them on social media</p>
        <a href="https://www.linkedin.com/">LinkedIn</a>
        <a href="https://bsky.app/">Bluesky</a>
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