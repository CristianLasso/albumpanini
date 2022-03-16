import React, {useState} from "react";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [albumName, setAlbumName] = useState("Tus albumes");
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(0);
    const [imgLamina, setImgLamina] = useState("");
    const [numberLamina, setNumberLamina] = useState("");
    const [quantityLamina, setQuantityLamina] = useState(0);
    const [filterLamina, setFilterLamina] = useState("filtro-bn");
    

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
        imgLamina,
        setImgLamina,
        numberLamina,
        setNumberLamina,
        quantityLamina,
        setQuantityLamina,
        filterLamina,
        setFilterLamina,
    };

    return (
        <AppContext.Provider value={state} displayName="AppContext">
          {props.children}
        </AppContext.Provider>
      );
};

export default AppContext;