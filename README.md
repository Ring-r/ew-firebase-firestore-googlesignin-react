# ew-firebase-firestore-googlesignin-react

Experiments With Firebase, Firestore, Google Sign-In, React

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run deploy`

Push the React app to the GitHub repository

That will cause the predeploy and deploy scripts defined in package.json to run.

Under the hood, the predeploy script will build a distributable version of the React app and store it in a folder named build. Then, the deploy script will push the contents of that folder to a new commit on the gh-pages branch of the GitHub repository, creating that branch if it doesn't already exist.

By default, the new commit on the gh-pages branch will have a commit message of "Updates". You can specify a custom commit message via the -m option, like this:
```shell
npm run deploy -- -m "Deploy React app to GitHub Pages"
```

At this point, the GitHub repository contains a branch named gh-pages, which contains the files that make up the distributable version of the React app.

You can learn more in the [GitHub - gitname/react-gh-pages: Deploying a React App (created using create-react-app) to GitHub Pages](https://github.com/gitname/react-gh-pages).

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Getting Started with Firebase

To access Cloud Firestore data from your React project, you'll need to follow several steps. This involves setting up a Firebase project, installing the necessary libraries, and configuring your React app to interact with Firestore. Here’s a step-by-step guide:

### Step 1: Set Up a Firebase Project
1. **Go to the Firebase Console**:
   - Visit [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the prompts to create a new Firebase project.

2. **Add Firestore to Your Project**:
    1. In the Firebase dashboard, go to **Firestore Database** from the left-hand menu.
    2. Click **Create Database**.
    3. Choose a mode for your database. You can start with **Test Mode** to allow open access (this allows read/write access without authentication), but for production, you should use **Locked Mode** and configure security rules. You can switch to production rules later.
    4. Choose your Firestore location and click **Enable** to create the database.

3. **Register Your App**:
   - Click on the "Web" icon (</>) to register your app.
   - Follow the prompts to set up your app, and Firebase will provide you with a configuration object containing your API keys and other identifiers.

### Step 2: Install Firebase SDK in Your React Project
In your React project, install the Firebase SDK using npm:

```shell
npm install firebase
```

### Step 3: Initialize Firebase in Your Project
Create a new file (e.g., `firebase.js`) in your `src` directory to initialize Firebase and Firestore:

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
```

Make sure to replace the placeholder values with your actual Firebase configuration values (see next step).

### Step 4: Get Firebase Config for Your App
1. In the Firebase console, click the gear icon next to **Project Overview** and choose **Project settings**.
2. Scroll down to the **Your apps** section.
3. If you haven’t already, click on the **</>** (web icon) to register a web app.
4. Enter an app nickname, and register the app.
5. Firebase will generate a **Firebase config** object with your API key, project ID, and other details. You will need this information in your `firebase.ts` file.

### Step 5: Access Firestore Data in Your Components
Now you can access Firestore data in your React components. Here’s an example of how to read data from a Firestore collection:

```javascript
// src/App.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'your-collection-name'));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(items);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Firestore Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
```

You can replace `'your-collection-name'` with the actual name of the Firestore collection you want to access.

### Step 6: (Optional) Write Data to Firestore
You can also write data to Firestore using the `addDoc` function:

```javascript
import { collection, addDoc } from 'firebase/firestore';

// Function to add a document to Firestore
const addData = async (newData) => {
    try {
        const docRef = await addDoc(collection(db, 'your-collection-name'), newData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
```

You can replace `'your-collection-name'` with the actual name of the Firestore collection you want to access.

### Step 7: Deploy Your React App
Once everything is set up and tested locally, you can deploy your React app to a hosting platform like GitHub Pages, Vercel, or Netlify.

### Notes:
- If you want to implement user authentication, you can use Firebase Authentication in combination with Firestore for secured access to your data.
- Be cautious with Firestore rules; you should change the database rules from Test Mode to more secure rules when moving to production.

## Getting Started with Firebase (Google Authentication)

To use **Google Authentication** with Firebase in your React project, follow these steps:

### Step 1: Enable Google Authentication in Firebase Console
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. In the Firebase dashboard, go to the **Authentication** section in the left-hand menu.
4. Click on the **Sign-in method** tab.
5. Find **Google** under the **Sign-in providers** tab and click the edit icon (a pencil).
6. Toggle **Enable**.
7. Configure the project and provide any required OAuth credentials if prompted (in most cases, Firebase configures this automatically).
8. Click **Save**.

### Step 2: (Optional) Set Up OAuth Consent Screen
If required, you may need to configure the OAuth consent screen for Google Authentication:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your Firebase project (it’s linked to Firebase).
3. Go to **APIs & Services** > **OAuth consent screen**.
4. Fill in the required information and set up the OAuth consent screen (you may need this step if your app requests sensitive data).

### Step 3: Set Firestore Security Rules (if necessary)
Once Firestore is enabled, you should configure its security rules to ensure that only authenticated users can read/write data.

**Firestore Security Rules** are primarily designed to control access based on **authentication** and **document structure**, rather than network-related aspects like the HTTP origin header.

1. Go to **Firestore Database** and click on the **Rules** tab.
2. Update the Firestore rules to allow only authenticated users to read/write data:

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    match /your-collection-name/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

You can replace `'your-collection-name'` with the actual name of the Firestore collection you want to access.

3. (Optional) This rule ensures only authenticated users with a verified email can access Firestore, reducing the risk of unauthorized access.

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    match /your-collection-name/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email_verified;
    }
  }
}
```

You can replace `'your-collection-name'` with the actual name of the Firestore collection you want to access.

4. Click **Publish** to save the rules.

### Step 4: Modify Firebase Configuration

```typescript
// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore database
const auth = getAuth(app);     // Firebase authentication

export { db, auth };
```

### Step 5: Implement Authentication Code for Google Sign-In

In your `auth.ts` file, implement the code to handle Google Authentication using Firebase's `GoogleAuthProvider`.

```typescript
// src/auth.ts
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Set up the Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async (): Promise<void> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('User signed in with Google:', result.user);
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
};

// Logout Function (remains the same as before)
export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log('User logged out');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
```

### Step 6: (Optional) Customize Google Sign-In Scopes
You can customize the scopes (what permissions you request from the user) by modifying the `GoogleAuthProvider` instance:

```typescript
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
```

### Step 7: Update the `App.tsx` Component
Now update the `App.tsx` to use the new Google sign-in method:

```typescript
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { signInWithGoogle, logoutUser } from './auth';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <div>
            <h1>Firebase Google Authentication (TypeScript)</h1>
            {user ? (
                <div>
                    <p>Logged in as: {user.displayName}</p>
                    <img src={user.photoURL || ''} alt="User Avatar" />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
            )}
        </div>
    );
};

export default App;
```

### Step 8: Access Firestore Data Based on Google Authentication
In the `App.tsx` component, you'll now add logic to access Firestore based on the Google Authenticated user:

```typescript
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { signInWithGoogle, logoutUser } from './auth';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [data, setData] = useState<DocumentData[]>([]);

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Fetch Firestore data (only when the user is authenticated)
    useEffect(() => {
        const fetchFirestoreData = async () => {
            if (user) {
                try {
                    const querySnapshot = await getDocs(collection(db, 'your-collection-name'));
                    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setData(items);
                } catch (error) {
                    console.error('Error fetching Firestore data:', error);
                }
            }
        };
        fetchFirestoreData();
    }, [user]);

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <div>
            <h1>Google Authentication with Firestore (TypeScript)</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <img src={user.photoURL || ''} alt="User Avatar" />
                    <button onClick={handleLogout}>Logout</button>
                    <h2>Firestore Data:</h2>
                    <ul>
                        {data.map(item => (
                            <li key={item.id}>{JSON.stringify(item)}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
            )}
        </div>
    );
};

export default App;
```

You can replace `'your-collection-name'` with the actual name of the Firestore collection you want to access.

### Step 9: Test the Google Authentication
Now, when you click the "Sign in with Google" button, it will trigger Google’s OAuth flow and authenticate the user. Once authenticated, the user's details (name, photo, etc.) will be displayed.

### Step 10: Deploy Security Rules (when in Production)
For production environments, ensure your security rules are configured correctly to restrict data access only to authenticated users.

### Conclusion
Once these steps are done, your Firebase project is ready to work with **Google Authentication** and **Cloud Firestore** in your React project. You’ve successfully integrated **Google Authentication** into your React project. You can now authenticate users via Google and manage their session states with Firebase.
