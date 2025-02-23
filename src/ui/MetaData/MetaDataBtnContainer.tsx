import { faThumbsUp, faThumbsDown, faShare, faDownload, faScissors, faBookmark } from "@fortawesome/free-solid-svg-icons";
import IconBtn from "../IconBtn";
import { convertToKoreanUnit } from "../../utils";


interface MetaDataBtnContainerProps {
    numLikes?: number;
    numDislikes?: number;
}
const MetaDataBtnContainer: React.FC<MetaDataBtnContainerProps> = ({ numLikes }) => {
    return (
        <div>
            <IconBtn icon={faThumbsUp}>
                { convertToKoreanUnit(numLikes || 0) }
            </IconBtn>
            <IconBtn icon={faThumbsDown}>
                { convertToKoreanUnit(numLikes || 0) }
            </IconBtn>
            <IconBtn icon={faShare}>
                공유
            </IconBtn>
            <IconBtn icon={faDownload}>
                오프라인 저장
            </IconBtn>
            <IconBtn icon={faScissors}>
                클립
            </IconBtn>
            <IconBtn icon={faBookmark}>
                저장
            </IconBtn>
            <IconBtn>
                ...
            </IconBtn>
        </div>
    );
};

export default MetaDataBtnContainer;
