import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Index = () => {
    const { id } = useParams();  
    const { eventData } = useSelector(state => state.user);
    const [fetchData, setFetchData] = useState(null);  

    useEffect(() => {
        if (eventData ) {
            const event = eventData.find(item => item.id === id);
            setFetchData(event);
        }
    }, []); 

    console.log(fetchData);  

    return (
        <div>
            
        </div>
    );
};

export default Index;
