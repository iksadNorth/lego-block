import styled from "styled-components";

const Profile = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    
    & > :first-child {
        flex: 0 0 50px;
        height: 50px;
    }
    
    & > :not(:first-child) {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default Profile;
