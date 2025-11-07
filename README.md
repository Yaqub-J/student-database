# Student QR Code ID Generator

A modern, full-stack web application for generating and managing student QR code IDs. Built with React and Firebase.

## Live Demo

**Live App**: https://student-database-2224500-5721b.web.app

## Features

- **User Authentication** - Secure login with email/password
- **QR Code Generation** - Create unique QR codes for students
- **Cloud Storage** - Automatic upload to Firebase Storage
- **Database Management** - Store and retrieve student records
- **Student Dashboard** - View all students in a grid layout
- **Download QR Codes** - Export individual QR codes as PNG
- **Delete Records** - Remove students with confirmation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with smooth animations

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.23.1
- QRCode 1.5.3
- Vite 5.2.0
- CSS3 (Custom styling)

### Backend
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Hosting

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### 2. Clone & Install
```bash
git clone <your-repo-url>
cd student-database
npm install
```

### 3. Configure Firebase
Update `src/firebase.js` with your Firebase credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 10 minutes
- **[SETUP.md](SETUP.md)** - Detailed Firebase setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide and live app info
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
- **[UI_GUIDE.md](UI_GUIDE.md)** - UI design and navigation guide

## Project Structure

```
student-database/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Authentication
│   │   ├── Dashboard.jsx       # Main app interface
│   │   └── PrivateRoute.jsx    # Route protection
│   ├── App.jsx                 # Root component
│   ├── App.css                 # Styling
│   ├── firebase.js             # Firebase config
│   └── main.jsx                # Entry point
├── dist/                       # Production build
├── firebase.json               # Firebase config
├── firestore.rules             # Database rules
├── storage.rules               # Storage rules
└── package.json                # Dependencies
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Check code quality

# Deployment
firebase deploy      # Deploy to Firebase
```

## Firebase Setup

### 1. Enable Services
- Authentication (Email/Password)
- Firestore Database
- Firebase Storage

### 2. Set Security Rules

**Firestore** (`firestore.rules`):
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

**Storage** (`storage.rules`):
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

### 3. Create User
Go to Firebase Console → Authentication → Add User

## Deployment

The app is deployed at: https://student-database-2224500-5721b.web.app

To deploy updates:
```bash
npm run build
firebase deploy --only hosting
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Usage

### Login
1. Navigate to the app
2. Enter your email and password
3. Click "Sign In"

### Generate QR Code
1. Go to "Generate QR Code" tab
2. Enter student name and ID
3. Click "Generate & Save QR Code"
4. Download the QR code if needed

### View Students
1. Go to "View Students" tab
2. See all student records
3. Download individual QR codes
4. Delete students as needed

## Security

- All routes protected with authentication
- Firestore rules require authentication
- Storage rules require authentication
- No credentials stored in code
- Environment variable support

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting

### Can't login
- Verify user exists in Firebase Console
- Check Firebase configuration
- Ensure Authentication is enabled

### Permission denied
- Check Firestore rules are deployed
- Verify Storage rules are set
- Ensure user is authenticated

### Build errors
- Clear node_modules and reinstall
- Check Node.js version
- Verify all dependencies are installed

## Support

For issues or questions:
- Check the documentation files
- Review Firebase Console for errors
- Check browser console for error messages
- Verify Firebase configuration

---

**Project Status**: ✅ Deployed and Running

**Live URL**: https://student-database-2224500-5721b.web.app

**Last Updated**: 2025-11-07