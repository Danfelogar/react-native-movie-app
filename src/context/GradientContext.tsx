import React, { createContext, useState } from "react";

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}

//en "as" se determina de que tipo tienen que ser las variables que recibe el vaule
export const GradientContext = createContext({} as ContextProps); //TODO: definir tipo es decir lo que quiero mandar a los demas

export const GradientProvider = ({ children }: any) => {

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const [prevColors, sePrevtColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const setMainColors = ( colors: ImageColors ) => {
        setColors( colors );
    }

    const setPrevMainColors = ( colors: ImageColors ) => {
        setColors( colors );
    }

    return(
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColors,
            setPrevMainColors
        }}>
            { children }
        </GradientContext.Provider>
    )
}