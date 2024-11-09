import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        activity_level: '',
        meal_time: '',
        image: null,
    });
    const [nutritionInfo, setNutritionInfo] = useState(null);
    const [targets, setTargets] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [weeklySummary, setWeeklySummary] = useState([]);
    const [recommendations, setRecommendations] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:5000/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNutritionInfo(response.data.nutrition_info);
            setTargets(response.data.targets);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.response?.data?.error_message || "An error occurred");
        }
    };

    const fetchWeeklySummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/history');
            setWeeklySummary(response.data.weekly_summary);
        } catch (error) {
            console.error("Failed to fetch weekly summary:", error);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recommendations');
            setRecommendations(response.data.user_deficiencies);
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        }
    };

    useEffect(() => {
        fetchWeeklySummary();
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Nutrition Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input name="weight" placeholder="Weight" onChange={handleInputChange} />
                <input name="height" placeholder="Height" onChange={handleInputChange} />
                <input name="age" placeholder="Age" onChange={handleInputChange} />
                <select name="activity_level" onChange={handleInputChange}>
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly_active">Lightly Active</option>
                    <option value="moderately_active">Moderately Active</option>
                    <option value="very_active">Very Active</option>
                    <option value="extra_active">Extra Active</option>
                </select>
                <input name="meal_time" placeholder="Meal Time" onChange={handleInputChange} />
                <input type="file" name="image" onChange={handleImageUpload} />
                <button type="submit">Submit Meal</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {nutritionInfo && (
                <div>
                    <h2>Nutrition Info</h2>
                    {/* Render nutritionInfo here */}
                </div>
            )}
            {targets && (
                <div>
                    <h2>Targets</h2>
                    {/* Render targets here */}
                </div>
            )}
            <h2>Weekly Summary</h2>
            <ul>
                {weeklySummary.map((day) => (
                    <li key={day.date}>
                        {day.date}: {JSON.stringify(day.summary)}
                    </li>
                ))}
            </ul>
            <h2>Recommendations</h2>
            {recommendations && (
                <ul>
                    {Object.keys(recommendations).map((nutrient) => (
                        <li key={nutrient}>
                            {nutrient}: {recommendations[nutrient]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        activity_level: '',
        meal_time: '',
        image: null,
    });
    const [nutritionInfo, setNutritionInfo] = useState(null);
    const [targets, setTargets] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [weeklySummary, setWeeklySummary] = useState([]);
    const [recommendations, setRecommendations] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:5000/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNutritionInfo(response.data.nutrition_info);
            setTargets(response.data.targets);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.response?.data?.error_message || "An error occurred");
        }
    };

    const fetchWeeklySummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/history');
            setWeeklySummary(response.data.weekly_summary);
        } catch (error) {
            console.error("Failed to fetch weekly summary:", error);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recommendations');
            setRecommendations(response.data.user_deficiencies);
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        }
    };

    useEffect(() => {
        fetchWeeklySummary();
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Nutrition Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input name="weight" placeholder="Weight" onChange={handleInputChange} />
                <input name="height" placeholder="Height" onChange={handleInputChange} />
                <input name="age" placeholder="Age" onChange={handleInputChange} />
                <select name="activity_level" onChange={handleInputChange}>
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly_active">Lightly Active</option>
                    <option value="moderately_active">Moderately Active</option>
                    <option value="very_active">Very Active</option>
                    <option value="extra_active">Extra Active</option>
                </select>
                <input name="meal_time" placeholder="Meal Time" onChange={handleInputChange} />
                <input type="file" name="image" onChange={handleImageUpload} />
                <button type="submit">Submit Meal</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {nutritionInfo && (
                <div>
                    <h2>Nutrition Info</h2>
                    {/* Render nutritionInfo here */}
                </div>
            )}
            {targets && (
                <div>
                    <h2>Targets</h2>
                    {/* Render targets here */}
                </div>
            )}
            <h2>Weekly Summary</h2>
            <ul>
                {weeklySummary.map((day) => (
                    <li key={day.date}>
                        {day.date}: {JSON.stringify(day.summary)}
                    </li>
                ))}
            </ul>
            <h2>Recommendations</h2>
            {recommendations && (
                <ul>
                    {Object.keys(recommendations).map((nutrient) => (
                        <li key={nutrient}>
                            {nutrient}: {recommendations[nutrient]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;