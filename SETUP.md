# Student QR Code ID Generator - Setup Guide

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A Firebase account

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

### 2. Enable Authentication

1. In the Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable it and click **Save**

### 3. Create Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll update the rules)
4. Select a location for your database
5. Click **Enable**

### 4. Enable Storage

1. In the Firebase Console, go to **Storage**
2. Click **Get started**
3. Accept the default security rules (we'll update them)
4. Click **Done**

### 5. Update Security Rules

#### Firestore Rules
Go to **Firestore Database** → **Rules** and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules
Go to **Storage** → **Rules** and replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /qrcodes/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 6. Get Firebase Configuration

1. In the Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click on the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Student QR App")
5. Copy the Firebase configuration object

### 7. Configure the Application

1. Open `src/firebase.js` in your project
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 8. Create a User Account

Since the app uses email/password authentication, you need to create a user:

1. In Firebase Console, go to **Authentication** → **Users**
2. Click **Add user**
3. Enter an email and password
4. Click **Add user**

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

3. Login with the email and password you created in Firebase

## Building for Production

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist` directory

## Deploying to Firebase Hosting (Optional)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

4. Select your Firebase project
5. Set public directory to `dist`
6. Configure as a single-page app: Yes
7. Don't overwrite index.html

8. Deploy:
```bash
npm run build
firebase deploy
```

## Features

- **Authentication**: Secure email/password login
- **QR Code Generation**: Create QR codes with student information
- **Cloud Storage**: Automatically save QR codes to Firebase Storage
- **Database**: Store student records in Firestore
- **Student Management**: View all students and their QR codes
- **Download**: Download individual QR codes as PNG files
- **Delete**: Remove student records when needed

## Troubleshooting

### Authentication Errors

- Make sure Email/Password authentication is enabled in Firebase Console
- Verify you've created a user account in Authentication → Users

### Permission Denied Errors

- Check that Firestore and Storage rules are correctly configured
- Make sure you're logged in

### Firebase Configuration Errors

- Verify all values in `src/firebase.js` are correct
- Check for typos in the configuration object

## Security Notes

- Never commit your `firebase.js` file with real credentials to public repositories
- Consider using environment variables for Firebase configuration in production
- Review and adjust Firebase security rules based on your needs
- The current rules allow any authenticated user to read/write all data

## Support

For issues or questions:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review [React Documentation](https://react.dev/)
- Check the browser console for error messages
