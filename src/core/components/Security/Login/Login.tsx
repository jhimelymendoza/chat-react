import React from 'react';
import {Grid} from 'react-flexbox-grid';
import {LoginCard, LoginContainer, LoginSecondRow} from "./styles";
import {Avatar} from "antd";
import {LoginAvatar} from "./types";
import FormLoginWrapped from "./FormLogin";

const AvatarLogin = (props: LoginAvatar) => {
    const icon = props.icon ? props.icon : 'user';
    const backgroundColor = props.backgroundColor ? props.backgroundColor : '#87d068';
    const size = props.size ? props.size : 64;

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <Avatar style={{backgroundColor: backgroundColor}} size={size} icon={icon}/>
    </div>
};

const Login = () => {
    return <>
        <Grid style={{height: '100%', width: '100%'}}>

            <LoginSecondRow>
                <LoginContainer xs={12}>
                    <LoginCard title={<AvatarLogin/>}>
                        <FormLoginWrapped/>
                    </LoginCard>

                </LoginContainer>
            </LoginSecondRow>
        </Grid>
    </>

};

export default Login;
