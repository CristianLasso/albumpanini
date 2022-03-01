import React, {useState} from "react";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
    const [albumName, setAlbumName] = useState("Tus albumes");
    const [open, setOpen] = useState(false);
    const [imgLamina, setImgLamina] = useState("");
    const [numberLamina, setNumberLamina] = useState("");
    const [quantityLamina, setQuantityLamina] = useState(0);
    const [filterLamina, setFilterLamina] = useState("filtro-bn");
    

    const state = {
        albumName,
        setAlbumName,
        open,
        setOpen,
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