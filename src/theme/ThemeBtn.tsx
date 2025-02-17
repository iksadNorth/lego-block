import React from "react";
import IconBtn from "@/ui/IconBtn";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useThemeControl, lightTheme, darkTheme } from "@/theme";


const ThemeBtn: React.FC = () => {
    const { setTheme } = useThemeControl();

    return <>
        <IconBtn icon={ faSun } onClick={() => setTheme(lightTheme)}>
            Light Theme
        </IconBtn>
        <IconBtn icon={ faMoon } onClick={() => setTheme(darkTheme)}>
            Dark Theme
        </IconBtn>
    </>;
};

export default ThemeBtn;
