from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
import easyocr
import os
import serial.tools.list_ports

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/verify', methods=['POST'])
def verify():
    result = "Python script executed successfully"
    Run()
    return jsonify({"message": result})

@app.route('/update_command', methods=['POST'])
def update_command():
    data = request.json  # Assuming data is sent as JSON
    state = data.get('temp')  # Extract the command from JSON data
    print(f"Received State from React: {state}")
    if state:
        command = "ON"
    else:
        command = "OFF"
    #serialInst.write(command.encode('utf-8'))

    
    # Process the command as needed (e.g., send to Arduino)
    # Example: serialInst.write(command.encode('utf-8'))

    return jsonify({"message": "Command received"})


def Run():
    #reg_list = ["tn09cb5990", "br19g8869", "mn03t2532", "access33", "klo1bg2516", "kl31m9090"]
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
                #isPresent = text2 in reg_list
                # print((isPresent))

                # if isPresent:
                #     command = "ON"
                # else:
                #     command = "OFF"
                #serialInst.write(command.encode('utf-8'))
                # Emit the detected text and its presence status to the frontend
                socketio.emit('text_detected', {'text': text2})

            img_counter += 1

    cam.release()
    cv2.destroyAllWindows()


def SetAurdino():
    ports = serial.tools.list_ports.comports()
    
    portsList = []

    for one in ports:
        portsList.append(str(one))
        print(str(one))

    if not portsList:
        print("No available COM ports found.")
    else:
        com = input("Select COM Port for Arduino #: ")
        use = None

        for i in range(len(portsList)):
            if portsList[i].startswith("COM" + str(com)):
                use = "COM" + str(com)
                print(f"Using port: {use}")
                break

        if use is None:
            print(f"COM{com} not found in available ports.")
        else:
            serialInst.baudrate = 115200
            serialInst.port = use
            serialInst.open()

if __name__ == '__main__':
    serialInst = serial.Serial()
    #SetAurdino()
    socketio.run(app, debug=True)


