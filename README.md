# Tuul Scooter-Sharing Web Application

## Table of Contents

- [Video Demonstration](#video-demonstration)
- [Features](#features)
  - [Core Functionality](#core-functionality)
  - [Location & Status](#location--status)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
- [Contributor](#contributors)

A React-based web application for managing and controlling shared electric scooters. This application provides a seamless interface for users to authenticate, pair with scooters, and control their operations. You also need to run [backend-part](https://github.com/TigerTimofey/tuul-back).

## Video Demonstration 

https://github.com/user-attachments/assets/5db648df-6fb1-4be9-8f63-d39da1e6d9f4


## Features

### Core Functionality

- **User Authentication**

  - Email & password login/registration
  - Protected routes for authenticated users
  - Secure logout functionality

- **Scooter Management**
  - Pair scooters using unique codes
  - Send ON/OFF commands to paired scooters
  - Lock/Unlock scooter controls

### Location & Status

- **Map Integration**

  - Real-time scooter location tracking
  - User location display
  - Interactive Google Maps interface

- **Scooter Status Information**
  - Battery level percentage
  - Lock status indicator
  - Odometer readings
  - Estimated range display

## Technical Stack

- **Frontend Framework:** React with TypeScript
- **UI Components:** Material-UI (MUI)
- **Maps:** Google Maps API
- **Backend:**<br/>
  - Firebase
  - Authentication
  - Firestore Database

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Google Maps API key

### Installation

## Running the Application

1. Clone the repository

```bash
git clone https://github.com/TigerTimofey/tuul
```

2. Move inside folder

```bash
cd tuul-rent
```

3. Build the project

```bash
npm install
```

3. Run the application

```bash
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_BACKEND_URL=your_backend:port
VITE_FIREBASE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Contributors

### Timofey Babisashvili <br/>

![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=flat&logo=linkedin&logoColor=white) <br/>**[@Timofey-tech](https://www.linkedin.com/in/timofey-tech)**<br/><br/>
![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=flat&logo=github&logoColor=white) <br/>**[@TigerTimofey](https://github.com/TigerTimofey)** <br/><br/>
![Portfolio](https://img.shields.io/badge/Portfolio-%2316B5D8?style=flat&logo=google-chrome&logoColor=white)<br/> **[Portfolio](https://timofey-tigertimofeys-projects.vercel.app)**
