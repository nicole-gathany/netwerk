import React from 'react';
import { createNetworkingContact } from '../services/appwrite';

const NetworkingForm: React.FC = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newContact = {
            "event-name": "RenderATL",
            "date-added": new Date(),
            "name": "Regina George",
            "company": "Twitter",
            "position": "Public Relations Specialist",
            "spark": "She liked my bracelet that my mother wore in the 80's",
            "follow-up": true,
            "linkedin-added": true,
            "bluesky-added": false,
            "twitter-added": true,
            "second-follow-up": null,
            "third-follow-up": null
        };

        try {
            const response = await createNetworkingContact(newContact);
            console.log('Contact created:', response);
            // Handle success
        } catch (error) {
            // Handle error
            console.log(error, "because it did not work")
        }
    };

    return (
        <div>
            <h1>Networking Form</h1>
            <form id="networking-form">
                
                

               


                {/* contact name */}
                <label htmlFor="name">Who did you meet? (name)</label>
                <input type="text" name="name" id="name"/>

        
                 {/* date added */}
                 <label htmlFor="date">Date Added: </label>
                <input type="date" name="date" id="date"/>

                {/* event name */}
                <label htmlFor="event-name">Where did you meet them? </label>
                <input type="text" name="event-name" id="event-name" placeholder="Render ATL"/>

                 {/* company */}
                 <label htmlFor="company">What company do they work for?</label>
                <input type="text" name="company" id="company"/>

                <label htmlFor="position">What do they do there?</label>
                <input type="text" name="position" id="position"/>
                
                <label htmlFor="spark">What did you all talk about?</label>
                <input type="text" name="spark" id="spark"/>

                {/* submit button */}
                <button onClick={handleSubmit}>Submit</button>
               
               
            </form>
           
        </div>
    );
};

export default NetworkingForm;