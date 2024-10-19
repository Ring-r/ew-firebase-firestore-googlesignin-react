import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { logoutUser, signInWithGoogle } from './auth';
import { auth, db } from './firebase';

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
          const querySnapshot = await getDocs(collection(db, 'items'));
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
