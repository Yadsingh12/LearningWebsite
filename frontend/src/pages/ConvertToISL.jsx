import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import '../style/convertToISL.css';

export default function ConvertToISL() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const { backendRequest, user } = useContext(AuthContext); // get axios instance & user

    const handleConvert = async () => {
        if (!input.trim()) return;

        if (!user) {
            setOutput('❌ You must be logged in to convert sentences.');
            return;
        }

        setLoading(true);
        try {
            const response = await backendRequest.post('/convert', { sentence: input });
            setOutput(response.data); // assuming backend returns plain string
        } catch (err) {
            console.error(err);
            if (err.response) {
                setOutput(`❌ ${err.response.data?.detail || 'Error converting to ISL grammar.'}`);
            } else {
                setOutput('❌ Backend not responding. Please try later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="isl-converter-container">
            <h2>Convert English to ISL Grammar</h2>
            <textarea
                rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your English sentence here..."
            />
            <button onClick={handleConvert} disabled={loading}>
                {loading ? 'Converting...' : 'Convert'}
            </button>

            {output && (
                <div className="output-section">
                    <h3>ISL Grammar Output:</h3>
                    <ul>
                        {output.split(' | ').map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                    <p className="note">
                        Note: The translations may not be correct or there can be multiple translations possible
                    </p>
                </div>
            )}
        </div>
    );
}
