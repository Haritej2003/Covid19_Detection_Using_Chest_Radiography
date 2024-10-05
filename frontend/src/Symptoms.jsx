import { useState } from 'react'
const Symptoms = () => {
    return <>
        <h3 class="SymptomsHeading">Risk Analysis</h3>
        <div class="SymptomsContainer">
            <InputBox />
            <OutputBox />
        </div>

    </>
}
const InputBox = () => {
    const [fever, setFever] = useState(false);
    function handleFeverChange(event) {
        setFever(event.target.value === 'yes')

    }
    return <>
        <div class="inputBox">
            <div>
                <label htmlFor="">Fever:
                    <input type="radio" name="Fever" id="" value="yes" onChange={handleFeverChange} />
                    <label name="Fever" >Yes</label>
                    <input type="radio" name="Fever" id="" value="no" onChange={handleFeverChange} />
                    <label name="Fever" > No</label>
                </label>
            </div>
            {fever && (
                <div>
                    <label htmlFor="temperature"> Enter your temperature:
                        <input type="number" name="Temperature" id="temperature" placeholder="Enter your temperature" min="32" max="42" />
                    </label>

                </div>
            )}

        </div>
    </>
}

const OutputBox = () => {
    return <div class="outputBox">
        <h4>Your Output</h4>
        <h3>hi</h3>
        <h2>hefia</h2>
    </div>
}
export default Symptoms