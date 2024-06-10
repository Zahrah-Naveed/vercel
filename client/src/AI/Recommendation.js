import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './Recommendation.css'; 

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/recommend/${query}`);
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                // Filter results to match the query
                const filteredResults = response.data.filter(item => 
                    item.question.toLowerCase().includes(query.toLowerCase())
                );

                if (filteredResults.length > 0) {
                    setRecommendations(filteredResults.map(item => ({
                        question: item.question,
                        answer: item.answer
                    })));
                    setNoResults(false);
                } else {
                    // No matching results
                    setRecommendations([]);
                    setNoResults(true);
                }
                setSearchInitiated(true);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
        console.log("Searching for:", query);
    };

    return (
        <div className='dashboard'>
            <main>
                <SearchBar onSearch={handleSearch} />
                {!searchInitiated && (
                    <section className='recomm-start'>
                        <div className='recomm-info'>
                            <h2> Welcome </h2>
                            <p className='ask-away'> Ask away your traveling questions. </p>
                            <p className='help'> We are here to help. </p>
                        </div>
                    </section>
                )}
                {searchInitiated && (
                    <div className='content'>
                        {noResults ? (
                            <div className='no-results'>
                                <p className='ask-away'>Couldn't find matching result</p>
                            </div>
                        ) : (
                            <div className='scrollable-content'>
                                <div className='recommendation-list'>
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className='recommendation-item'>
                                            <h3>Question {index + 1}: {rec.question}</h3>
                                            <p>Answer: {rec.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Recommendation;
