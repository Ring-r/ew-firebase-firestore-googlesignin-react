import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('User signed in with Google:', result.user);
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
