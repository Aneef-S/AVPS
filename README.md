# Automated Vehicle Monitoring System

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

The Automated Vehicle Monitoring System is designed to streamline vehicle entry and exit processes, particularly in gated communities or secure premises. This system automatically detects vehicle numbers, verifies them against a pre-registered list, and logs entry/exit details.

## Features

- **Real-time Vehicle Number Detection**: Uses a camera and image processing to detect vehicle numbers.
- **Automated Verification**: Verifies detected numbers against a database of registered vehicles.
- **Entry/Exit Logging**: Logs details of each vehicle entry and exit.
- **Guest Management**: Allows for guest vehicle entry registration.
- **User Management**: Admin interface for managing registered vehicles and users.

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Flask
- **Database**: Firestore (Firebase)
- **Image Processing**: Python (OpenCV, Tesseract)
- **Microcontroller**: Arduino (for interfacing with entry/exit gates)
- **Build Tool**: Vite
- **Real-time Communication**: Socket.io

## Architecture

![Architecture Diagram](./architecture-diagram.png) (Add your architecture diagram here)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>=14.x.x) and npm (>=6.x.x)
- Python (>=3.8.x)
- Arduino IDE (for microcontroller programming)
- Firebase account and project setup
- Flask

## Installation

Follow these steps to get your development environment set up.

### Frontend (React)

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/vehicle-monitoring-system.git
    cd vehicle-monitoring-system/frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

### Backend (Flask)

1. Navigate to the backend directory:
    ```sh
    cd ../backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the Flask server:
    ```sh
    flask run
    ```

### Image Processing (Python)

1. Install required Python packages:
    ```sh
    pip install opencv-python pytesseract
    ```

2. Ensure Tesseract OCR is installed and accessible via system PATH.

### Microcontroller (Arduino)

1. Open the Arduino IDE.
2. Load the sketch from the `arduino` directory.
3. Upload the sketch to your Arduino board.

## Usage

1. Start the frontend and backend servers as described in the installation steps.
2. Connect your camera and Arduino board.
3. Access the frontend via `http://localhost:3000`.
4. Log in to the admin interface to manage vehicle registrations and monitor vehicle entries/exits.

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README file provides a comprehensive guide to set up and use the Automated Vehicle Monitoring System. For any additional questions or issues, please refer to the documentation or open an issue in the repository.
