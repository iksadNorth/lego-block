import React, { useState, useEffect, ReactNode, ReactElement } from "react";
import styled from "styled-components";


const Container = styled.div`
    width: 95%;
`;

const ContextMenuTab = styled.div<{ x: number; y: number }>`${({ theme, x, y }) => `
    position: absolute;
    left: ${x}px; top: ${y}px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ddd;
`}`;

interface MenuChildProps {
    selected?: ReactNode;
}
interface ContextMenuProps {
    children?: ReactNode;
    menuchild?: ReactElement<MenuChildProps>;
    eventNet?: string;
}
const ContextMenu: React.FC<ContextMenuProps> = ({ children, menuchild, eventNet }) => {
    const [ selectedRef, setSelectedRef ] = useState<Element | null>(null);
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        setSelectedRef((event.target as HTMLElement).closest(`[${ eventNet || 'data-event-net' }]`));
        setMenu({ x: event.pageX, y: event.pageY });
    };

    const closeMenu = () => setMenu(null);
    useEffect(() => {
        document.addEventListener("click", closeMenu);
        document.addEventListener("contextmenu", closeMenu);
        return () => {
            document.removeEventListener("click", closeMenu);
            document.removeEventListener("contextmenu", closeMenu);
        };
    }, []);

    return (<>
        <Container>
            <div onContextMenu={handleContextMenu}>
                { children }
            </div>
            {menu && (
                <ContextMenuTab x={menu.x} y={menu.y}>
                    {
                        React.Children.map(menuchild, (child) =>
                            React.isValidElement<MenuChildProps>(child) 
                            ? React.cloneElement(child, { selected: selectedRef }) 
                            : child
                        )
                    }
                </ContextMenuTab>
            )}
        </Container>
    </>)
};

export default ContextMenu;


const MenuItemStyle = styled.div`${({ theme }) => `
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color: ${theme.colors.backgroundHover};
    }
`}`;

interface MenuItemProps {
    children?: ReactNode;
    selected?: HTMLDivElement;
    onClick?: (selected: HTMLDivElement) => void;
}
export const MenuItem: React.FC<MenuItemProps> = ({ children, selected, onClick }) => {    
    const handleClick = async () => {
        if(!selected || !onClick) return;
        onClick(selected);
    };
    return <>
        <MenuItemStyle onClick={handleClick}>
            { children }
        </MenuItemStyle>
    </>;
};
