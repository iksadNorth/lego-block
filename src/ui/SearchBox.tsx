import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchBoxContainer = styled.div`
    display: flex;
    gap: 0px;
`;
const SearchInputStyled = styled.input.attrs({
    type: 'text',
})`
    flex-grow: 1;

    border: 1px solid lightgray;
    border-radius: 10px 0 0 10px;

    padding: 5px;
`;
const SearchBtnStyled = styled.div`
    flex-grow: 0;

    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;

    border: 1px solid lightgray;
    border-radius: 0 10px 10px 0;

    background-color: lightgray;
    &:hover {
        background-color: gray;
        transition: background-color 1s ease;
    }
`;

interface SearchInputProps {
    onChange?: (value: string) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const SearchBox: React.FC<SearchInputProps> = ({ onChange, onClick }) => {
    const [ keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        if(!onChange) return;
        onChange(keyword);
    }, [keyword]);

    return <>
        <SearchBoxContainer>
            <SearchInputStyled 
                value={ keyword } onChange={ (e) => setKeyword(e.target.value) }
            />
            <SearchBtnStyled onClick={onClick ?? (() => {})}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchBtnStyled>
        </SearchBoxContainer>
    </>
};

export default SearchBox;
