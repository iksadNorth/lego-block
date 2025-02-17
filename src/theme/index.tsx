import React, { ReactNode, useState, createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../theme/GlobalStyle";


// 기본 테마들 정의
interface ColorType {
    primary: string,
    background: string,
    backgroundHover: string,
    text: string,
}
interface ThemeType {
    colors: ColorType;
}
export const lightTheme: ThemeType = {
    colors: {
      primary: "#007bff",
      background: "#ffffff",
      backgroundHover: "gray",
      text: "#000000",
    },
  };
  
export const darkTheme: ThemeType = {
    colors: {
        primary: "#ff9800",
        background: "#333333",
        backgroundHover: "gray",
        text: "#ffffff",
    },
};


// 컨텍스트 생성 (초기값은 null)
interface ThemeControlContextProp {
    setTheme: (theme: ThemeType) => void;
}
const ThemeControlContext = createContext<ThemeControlContextProp | null>(null);

interface ThemeContextProp {
    children: ReactNode
}
export const ThemeControlProvider: React.FC<ThemeContextProp> = ({ children }) => {
    const [ theme, setTheme ] = useState<ThemeType>(lightTheme);

    return (
        <ThemeControlContext.Provider value={{ setTheme }}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                { children }
            </ThemeProvider>
        </ThemeControlContext.Provider>
    );
};

export default ThemeControlProvider;

export const useThemeControl = () => {
    const context = useContext(ThemeControlContext);
    if (!context) throw new Error("useThemeControl must be used within a ThemeControlContext");
    return context;
  };
