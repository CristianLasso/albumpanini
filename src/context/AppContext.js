import React, {useState} from "react";
import { db } from "../config/firebase/firebase"
import { collection, deleteDoc, doc , setDoc, getDocs, getDoc } from "firebase/firestore";
import md5 from 'md5';
import { auth } from '../config/firebase/firebase';

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [albumName, setAlbumName] = useState("Tus albumes");
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(0);
    const [laminaId, setLaminaId] = useState(0);
    const [imgLamina, setImgLamina] = useState("");
    const [numberLamina, setNumberLamina] = useState("");
    const [cuantityLamina, setCuantityLamina] = useState(0);
    const [priceLamina, setPriceLamina] = useState(0);
    const [filterLamina, setFilterLamina] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userNotis, setUserNotis] = useState(0)
    const [charge, setCharge] = useState(false);

    const [userInfo, setUserInfo] = useState("");

    const [acceptanceToken, setAcceptanceToken] = useState("");

  const charging = () => {
    setCharge(true);
    setTimeout(async () =>{
      setCharge(false);
    },2000);
  }

  ////////////////////////////////////////////////////////////////////

  const getUser = async(userId) => {
    console.log(userId)
    const datos = await getDoc(doc(db,'users', userId))
    // console.log(datos.data())
    setUserInfo(datos.data())
    
  }

  const findUser = async(userId) => {
    const datos = await getDoc(doc(db,'users', userId))
    return datos.data()
  }

  const setUser = ( tokens ) => {
    if(tokens >= 0){
      userInfo.tokens = tokens;
    }
    postUserBD(userInfo)
  };

  const postUserBD = async(user) =>{
    try {
      await setDoc(doc(db, "users", user.id), 
      {id: user.id,
        admin: user.admin,
        tokens: user.tokens,
        name: user.name,
        lastName: user.lastName,
        documentId: user.documentId,
        phone: user.phone,
        location: user.location,
        email: user.email,
        password: md5(user.password)});
      getUser(user.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const saveUser = (userName, userLastName, userDocumentId, userPhone, userLocation, userEmail, userPassword) => {
    const newUser = {
      id: auth.currentUser.uid,
      admin: false,
      tokens: 0,
      name: userName,
      lastName: userLastName,
      documentId: userDocumentId,
      phone: userPhone,
      location: userLocation,
      email: userEmail,
      password: md5(userPassword)
    };
    try {
      postUserBD(newUser).then(()=>{
        getUser(newUser.id)
      });
    } catch (e) {
      console.log(e);
    }
    
  };

  const deleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
  };
    
    const state = {
        currentUser,
        setCurrentUser,
        currentAlbum,
        setCurrentAlbum,
        albumName,
        setAlbumName,
        open,
        setOpen,
        token,
        setToken,
        laminaId,
        setLaminaId,
        imgLamina,
        setImgLamina,
        numberLamina,
        setNumberLamina,
        cuantityLamina,
        setCuantityLamina,
        priceLamina,
        setPriceLamina,
        filterLamina,
        setFilterLamina,
        currentPage,
        setCurrentPage,
        userNotis,
        setUserNotis,
        charge,
        setCharge,
        charging,
        userInfo,
        setUserInfo,
        getUser,
        setUser,
        saveUser,
        deleteUser,
        findUser,
        acceptanceToken,
        setAcceptanceToken,
    };

    return (
        <AppContext.Provider value={state} displayName="AppContext">
          {props.children}
        </AppContext.Provider>
      );
};

export default AppContext;