import React, {useState} from "react";

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
    const [filterLamina, setFilterLamina] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    

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
        filterLamina,
        setFilterLamina,
        currentPage,
        setCurrentPage,
    };

    return (
        <AppContext.Provider value={state} displayName="AppContext">
          {props.children}
        </AppContext.Provider>
      );
};

export default AppContext;