import React, {useState, useEffect} from "react";
import { showContacts, NetworkingContact } from "../services/appwrite";




const ShowContacts: React.FC = () => {

    


    const [contacts, setContacts] = useState<NetworkingContact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
  
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          const data = await showContacts(); // Fetch all contacts
          setContacts(data);
          setLoading(false); // Set loading to false once data is fetched
        } catch (err) {
        console.log(err, " is error")
          setError("Error fetching contacts");
          setLoading(false);
        }
      };
  
      fetchContacts();
    }, []); // Empty dependency array to run only once on mount
  
    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h2>All Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts available</p>
        ) : (
          <ul>
            {contacts.map((contact, index) => (
              <li key={index}>
                <div><strong>Name:</strong> {contact.name}</div>
                <div><strong>Event:</strong> {contact["event-name"]}</div>
                <div><strong>Company:</strong> {contact.company}</div>
                <div><strong>Position:</strong> {contact.position}</div>
                <div><strong>Spark:</strong> {contact["spark"]}</div>
                <div><strong>Follow-up:</strong> {contact["follow-up"] ? "Yes" : "No"}</div>
                <div><strong>LinkedIn Added:</strong> {contact["linkedin-added"] ? "Yes" : "No"}</div>
                <div><strong>Twitter Added:</strong> {contact["twitter-added"] ? "Yes" : "No"}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
   
   

    
   

  
     

}

export default ShowContacts;
