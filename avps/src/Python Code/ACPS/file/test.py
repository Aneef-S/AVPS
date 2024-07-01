import cv2
import easyocr
import os


reg_list = ["tn09cb5990", "br19g8869", "mn03t2532", "access33", "klo1bg2516", "kl31m9090"]
reader = easyocr.Reader(['en'], gpu=False)

        # Create a folder path for saving screenshots
save_folder = r"C:\Users\aneef\Work\Coding\Web\AVPS\avps\src\Python Code\ACPS\scr"

        # Check if the folder exists, and create it if not
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

        # Open a connection to the camera (camera index 0 is usually the default webcam)
cam = cv2.VideoCapture(0)
cv2.namedWindow("Text Detection from Camera", cv2.WINDOW_NORMAL)
img_counter = 0

while True:
            # Capture frame-by-frame
    ret, frame = cam.read()

    if not ret:
        print("Failed to grab frame")
        break

            # Display the frame
    cv2.imshow("Text Detection from Camera", frame)

            # Save the frame and print the result upon pressing the 'Space' key
    k = cv2.waitKey(1)
    if k % 256 == 27:  # 'ESC' key
        print("Escape hit. Closing app")
        break
    elif k % 256 == 32:  # 'Space' key
        img_name = os.path.join(save_folder, f"opencv_frame_{img_counter}.jpg")
        cv2.imwrite(img_name, frame)
        print("Screenshot taken and saved in", img_name)

                # Perform text detection on the captured frame
        text_results = reader.readtext(frame)

                # Print recognized text and confidence score
        for detection in text_results:
            text = detection[1]  # Extracting the recognized text
            confidence = detection[2]  # Extracting the confidence score
            print(f"Text: {text}, Confidence: {confidence:.2f}")

            text = text.replace(" ", "")
            text2 = text.lower()
            print("Text2" ,text2)
            print((text2 in reg_list))  # Arduino comms
            if text2 in reg_list:
                command = "ON"
            else:
                command = "OFF"
            #serialInst.write(command.encode('utf-8'))
        img_counter += 1

        # Release the camera and close all OpenCV windows
cam.release()
cv2.destroyAllWindows()