import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

// getFirestore: instantiate getFirestore
// doc: allows retrive document
// getDoc, setDoc: set/get data from documents
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "store/categories/categories.types";
const firebaseConfig = {
  apiKey: "AIzaSyD4VtjeDGdpk8PDsaTOkIRmM17Z_IsVYsk",
  authDomain: "crwn-clothing-db-2ee97.firebaseapp.com",
  projectId: "crwn-clothing-db-2ee97",
  storageBucket: "crwn-clothing-db-2ee97.appspot.com",
  messagingSenderId: "332224956597",
  appId: "1:332224956597:web:5d3434e140dcdcacedd6fc",
};

///////////////////////////////////////////////////////////////////// login 通用操作 ///////////////////////////////////////////////////////////////////////////

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

///////////////////////////////////////////////////////////////////// popup login  ///////////////////////////////////////////////////////////////////////////

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

///////////////////////////////////////////////////////////////////// redirect login  ///////////////////////////////////////////////////////////////////////////

// instantiate
// 可以用多种Provider：google，facebook
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

///////////////////////////////////////////////////////////////////// password sign up ///////////////////////////////////////////////////////////////////////////

//step1: import createUserWithEmailAndPassword from "firebase/auth";
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

///////////////////////////////////////////////////////////////////// password sign in ///////////////////////////////////////////////////////////////////////////

//step1: import signInWithEmailAndPassword from "firebase/auth";
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

///////////////////////////////////////////////////////////////////// sign out ///////////////////////////////////////////////////////////////////////////

export const signOutUser = async () => await signOut(auth);

///////////////////////////////////////////////////////////////////// auth change ///////////////////////////////////////////////////////////////////////////

// step 1: import onAuthStateChanged
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  // auth change， invoke callback
  onAuthStateChanged(auth, callback);
};
///////////////////////////////////////////////////////////////////// 获得current user ///////////////////////////////////////////////////////////////////////////

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged(p1,p2,p3)
    // p1: auth
    // p2: callback
    // p3: 可选，如果error callback
    const unsubscribe = onAuthStateChanged(
      auth,

      (userAuth) => {
        // close listener, release memeory
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
///////////////////////////////////////////////////////////////////// firestore ///////////////////////////////////////////////////////////////////////////

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

//use db to access database
export const db = getFirestore();

//如果additional info 存在，存入doc。 用户密码登录时，userAuth内的displayName 为空，displayName通过additionalInformation传入
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;
  //获取 users collection下的doc reference
  //如果users collection不存在，创建新
  //在sign-in.jsx中google登录后，传入user uid
  const userDocRef = doc(db, "users", userAuth.uid);
  // getData from reference
  const userSnapShot = await getDoc(userDocRef);

  // if user data  not exist, create new data
  // else return userDocRef
  if (!userSnapShot.exists()) {
    //creat new data to reference
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user: ", error);
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>;
  // return userDocRef;
};

///////////////////////////////////////////////////////////////////// firestore 存入商品数据///////////////////////////////////////////////////////////////////////////
//只调用一次
//async function always return promise, but this promise is void
type ObjectToAdd = {
  title: string;
};
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const batch = writeBatch(db);
  // get the collection reference
  const collectionRef = collection(db, collectionKey);
  //transction by using writeBatch
  objectsToAdd.forEach((object) => {
    // creat docRef for each object(mens/womens/...)
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

///////////////////////////////////////////////////////////////////// firestore get商品数据///////////////////////////////////////////////////////////////////////////

//1. import query, getDocs from "firebase/firestore"
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "collections");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};
