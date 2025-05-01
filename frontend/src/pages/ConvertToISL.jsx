import React, { useState } from 'react';
import axios from 'axios';
import '../style/convertToISL.css'; // optional CSS

export default function ConvertToISL() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/convert', {
                sentence: input
            });
            setOutput(response.data); // assuming backend returns plain string
        } catch (err) {
            console.error(err);
            setOutput('❌ Error converting to ISL grammar.');
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
                    <p className="note">Note: The translations may not be correct or there can be multiple translations possible</p>
                </div>
            )}
        </div>
    );
}
