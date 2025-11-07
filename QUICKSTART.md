# Quick Start Guide

Get your Student QR Code ID Generator up and running in 10 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] npm installed
- [ ] Firebase account created
- [ ] Web browser (Chrome recommended)

## Step-by-Step Setup

### 1. Firebase Project Setup (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or use existing project
3. Enable these services:
   - **Authentication** → Enable Email/Password
   - **Firestore Database** → Create database
   - **Storage** → Enable storage

4. Copy security rules:

**Firestore Rules** (Firestore → Rules):
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

**Storage Rules** (Storage → Rules):
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

5. Get Firebase config:
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click Web icon (`</>`)
   - Copy the config object

### 2. Project Configuration (2 minutes)

1. Open `src/firebase.js`
2. Replace placeholders with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace this
  authDomain: "YOUR_AUTH_DOMAIN",      // Replace this
  projectId: "YOUR_PROJECT_ID",        // Replace this
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace this
  messagingSenderId: "YOUR_SENDER_ID", // Replace this
  appId: "YOUR_APP_ID"                 // Replace this
};
```

### 3. Create User Account (1 minute)

1. In Firebase Console → Authentication → Users
2. Click "Add user"
3. Enter email (e.g., `admin@example.com`)
4. Enter password (e.g., `password123`)
5. Click "Add user"

### 4. Install & Run (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### 5. Login & Test

1. Navigate to `http://localhost:3000`
2. Login with the credentials you created
3. Generate your first QR code!

## You're Done!

Your app is now running. Try:
- Generating a student QR code
- Viewing the students list
- Downloading a QR code
- Deleting a student

## Need Help?

- **Detailed Setup**: See [SETUP.md](SETUP.md)
- **UI Overview**: See [UI_GUIDE.md](UI_GUIDE.md)
- **Project Details**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Common Issues

### "Permission denied" errors
→ Check Firebase rules are set correctly

### "User not found" on login
→ Create user in Firebase Console → Authentication

### Can't see students
→ Make sure you're on the "View Students" tab

### Firebase errors
→ Verify config in `src/firebase.js` is correct

## Production Deployment

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting (optional)
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## What You Built

A full-stack application with:
- User authentication
- QR code generation
- Cloud storage
- Database management
- Modern responsive UI

Enjoy your new Student QR Code ID Generator!
