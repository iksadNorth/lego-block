import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconBtn from '@/ui/IconBtn';
import Fill from '@/size/Fill';
import { faHome, faBoltLightning, faBoxTissue, faClock, faPlayCircle, faVideo, faMobile, faLadderWater, faThumbsUp, faScissors } from "@fortawesome/free-solid-svg-icons";
import Line from '@/ui/Line';
import Bedge from '@/ui/Bedge';


const IconBtnFull = styled(IconBtn)`
    ${Fill}
    text-align: start;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;
export const NavStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Nav: React.FC = ({ ...props }) => {
    const navigate = useNavigate();
    return (
        <NavStyled {...props}>
            <IconBtnFull icon={faHome} onClick={() => navigate('/')}>
                홈
            </IconBtnFull>
            <IconBtnFull icon={faBoltLightning}>
                Shorts
            </IconBtnFull>
            <IconBtnFull icon={faBoxTissue}>
                구독
            </IconBtnFull>

            <Line row="true"/>

            <div>
                내 페이지
            </div>
            <IconBtnFull icon={faClock}>
                시청기록
            </IconBtnFull>
            <IconBtnFull icon={faPlayCircle}>
                재생목록
            </IconBtnFull>
            <IconBtnFull icon={faVideo}>
                내 동영상
            </IconBtnFull>
            <IconBtnFull icon={faMobile}>
                내 영화
            </IconBtnFull>
            <IconBtnFull icon={faLadderWater}>
                나중에 볼 동영상
            </IconBtnFull>
            <IconBtnFull icon={faThumbsUp}>
                좋아요 동영상
            </IconBtnFull>
            <IconBtnFull icon={faScissors}>
                내 클립
            </IconBtnFull>

            <Line row="true"/>

            <div>
                구독
            </div>
            <Bedge>
                ROSE
            </Bedge>
            <Bedge>
                ROSE
            </Bedge>
            <Bedge>
                ROSE
            </Bedge>
        </NavStyled>
    );
};

export default Nav;
