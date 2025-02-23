import { useEffect, useState } from "react";
import { ValueBoolean, FormContainer, InputField } from "./FormContainer";
import useUserInfoStore, { UserInfoProps, UserInfoUpdateProps } from "../../store/UserInfoStore";


const UserInfoUpdater = () => {
    const { userInfo, updateUserInfo } = useUserInfoStore();
    const [ edit, setEdit ] = useState<boolean>(false);
    const [ pair, setPair ] = useState<UserInfoProps>(userInfo);

    const dirtycheck = (origin: UserInfoProps, entity: UserInfoProps) => {
        const result: Partial<UserInfoProps> = {};
        for (let key in entity) {
            if(!(key in origin)) continue;
            result[key as keyof UserInfoProps] = entity[key as keyof UserInfoProps];
        }
        return result;
    };

    const handleBooleanClick = async (value: boolean) => {         
        let dirtyObject;
        if(!value && Object.keys( dirtyObject = dirtycheck(userInfo, pair) ).length != 0) {
            try {
                await updateUserInfo(dirtyObject as UserInfoUpdateProps);
            } finally {
                setEdit(value);
            }
        }
        setEdit(value);
    };

    useEffect(() => {
        setPair({ ...pair });
    }, [userInfo]);

    return (<>
        <FormContainer>
            <ValueBoolean edit={true} onClick={handleBooleanClick} />
        </FormContainer>
        <FormContainer value={pair} onChange={(obj: UserInfoProps) => setPair(obj)}>
            <InputField name={'이름'} keyName={'nickname'} value={userInfo.nickname || ''} edit={edit}/>
        </FormContainer>
    </>);
};

export default UserInfoUpdater;
