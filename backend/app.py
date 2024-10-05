#    ----------------------------------------------------------------------------------------------------------

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('./savedModel/myModel.h5')

# Allowed file extensions
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image, target_size=(256, 256)):
    if image.mode != 'RGB':
        image = image.convert('RGB')

    img = image.resize(target_size)  # Resize image to fit model input size
    img_array = np.array(img) / 255.0  # Normalize pixel values to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# to clear cache after every request
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/')
def upload_form():
    return "Use POST /predict to send an image for prediction"

@app.route('/predict', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:        
        return jsonify({'error':'No file part'}),400

    file = request.files['file'] #--------------------

    # If user does not select a file, browser also
    # submits an empty part without filename
    if file.filename == '':
        return jsonify({'error':'No selected file'}),400

    if file and allowed_file(file.filename):
        try:
            img = Image.open(io.BytesIO(file.read()))
            preprocessed_image = preprocess_image(img)

            predictions = model.predict(preprocessed_image)
            print("predictions are :  ",predictions);
            # predicted_class = np.argmax(predictions, axis=1)
            # print("hi",predicted_class.item())
            # print("predcted",int(round(predicted_class[0])))
            ans="Covid" if int(round(predictions[0,0])) ==0 else "Normal"
            return jsonify({'prediction': ans }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Invalid file extension'}), 400
        
if __name__ == '__main__':
    app.run(host='localhost', port=2000, debug=True)



