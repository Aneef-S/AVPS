from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
import easyocr
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/verify', methods=['POST'])
def verify():
    result = "Python script executed successfully"
    Run()
    return jsonify({"message": result})

def Run():
    reg_list = ["tn09cb5990", "br19g8869", "mn03t2532", "access33", "klo1bg2516", "kl31m9090"]
    reader = easyocr.Reader(['en'], gpu=False)

    save_folder = r"C:\Users\aneef\Work\Coding\Web\AVPS\avps\src\Python Code\ACPS\scr"

    if not os.path.exists(save_folder):
        os.makedirs(save_folder)

    cam = cv2.VideoCapture(0)
    cv2.namedWindow("Text Detection from Camera", cv2.WINDOW_NORMAL)
    img_counter = 0

    while True:
        ret, frame = cam.read()

        if not ret:
            print("Failed to grab frame")
            break

        cv2.imshow("Text Detection from Camera", frame)

        k = cv2.waitKey(1)
        if k % 256 == 27:  # 'ESC' key
            print("Escape hit. Closing app")
            break
        elif k % 256 == 32:  # 'Space' key
            img_name = os.path.join(save_folder, f"opencv_frame_{img_counter}.jpg")
            cv2.imwrite(img_name, frame)
            print("Screenshot taken and saved in", img_name)

            text_results = reader.readtext(frame)

            for detection in text_results:
                text = detection[1]
                confidence = detection[2]
                print(f"Text: {text}, Confidence: {confidence:.2f}")

                text = text.replace(" ", "")
                text2 = text.lower()
                print("Text2", text2)
                isPresent = text2 in reg_list
                print((text2 in reg_list))

                if text2 in reg_list:
                    command = "ON"
                else:
                    command = "OFF"
                
                # Emit the detected text and its presence status to the frontend
                socketio.emit('text_detected', {'text': text2, 'isPresent': isPresent})

            img_counter += 1

    cam.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    socketio.run(app, debug=True)
