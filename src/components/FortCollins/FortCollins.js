import React, {useState} from "react";
import Button from "react-bootstrap/Button";

export const FortCollins = () => {
    const [businesses, setBusinesses] = useState([]);
    
    const callYelpAPI = async () => {
        console.log("callYelpAPI");
        try {
            const response = await fetch(
                'https://api.yelp.com/v3/businesses/search?location=fort%20collins&sort_by=best_match&limit=20',
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer xxx'
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setBusinesses(data.businesses);
                console.log(businesses);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <h1>Fort Collins</h1>
            <Button onClick={callYelpAPI}>Call Yelp API</Button>
        </div>
    );
}

export default FortCollins;
