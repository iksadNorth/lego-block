import React, { ReactNode } from "react";
import { ThemeControlProvider } from '@/theme';

interface ProxyProp {
    children: ReactNode
}
const Proxy: React.FC<ProxyProp> = ({ children }) => {
    return (
        <>
            <ThemeControlProvider>
                { children }
            </ThemeControlProvider>
        </>
    );
};

export default Proxy;
