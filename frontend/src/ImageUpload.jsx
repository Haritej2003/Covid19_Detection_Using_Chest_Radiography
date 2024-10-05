import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('')
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPrediction(''); // Clear prediction on file change
        setError('');
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("please select a file")
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData);
        try {
            console.log("sending to flask server")
            const response = await axios.post('http://localhost:2000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache',
                }
            });
            console.log("received : ", response.data.prediction);
            { console.log("prediction received") }
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading the image, please try again.');

            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.error || 'An error occurred.');
            }
        }
    };

    return (
        <div className="Container">
            <div className="inputFile">
                <h2>Upload X-ray Here</h2>

                <input type="file" id="xrayInput" name="file" onChange={handleFileChange} />
                <label htmlFor="xrayInput">
                    <img src="./public/_24ef5c65-6f76-4971-b3c3-49fb6fbdaaf2.jpg" className="image_icon" alt="upload image" />
                </label>
                {selectedFile && <div class="acknowledgement-message">
                    <p>Thank you, <span>User</span>! Your file has been successfully uploaded. Click the below button to predict</p>
                    
                </div>
                }
                <button onClick={handleUpload} className="submit">Predict</button>
            </div>
            <div className="outputFile">
                <h2>Predicted Result</h2>
                <input type="text" id="outputValue" readOnly value={prediction} />
                {error && <p style={{ color: 'red' }}>Error: {"Input format is not supported. "}</p>}
            </div>
            {/* //prediction &&  */}

            {/* return <div>
                <input type="file" name="" id="" />
                <button type="submit" value="Predict" onclick={ImageUpload}>Predict</button>
            </div> */}

        </div >
    );
};


export default ImageUpload;
