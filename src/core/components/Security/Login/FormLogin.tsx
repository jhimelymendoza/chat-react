import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Col, Row} from 'react-flexbox-grid';
import React from "react";
import { useRouter } from 'rift-router';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {BlueSpan} from "./styles";

interface IFormLogin extends InjectedIntlProps {
form:any
}

const FormLogin = (props: IFormLogin) => {
    const router = useRouter();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                router.to('/Home');
            }
        });
    };
    const {getFieldDecorator} = props.form;

    return <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{required: true, message: 'Please input your username!'}],
            })(
                <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder={props.intl.formatMessage({ id: 'home.login.username' })}
                />,
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}],
            })(
                <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder={props.intl.formatMessage({ id: 'home.login.pass' })}
                />,
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox> <FormattedMessage id="home.login.remember" defaultMessage="Recuerdame" /></Checkbox>)}
            <BlueSpan>
                <FormattedMessage id="home.login.forgotPassword" defaultMessage="Olvido su contraseña?" />
            </BlueSpan>
            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            <FormattedMessage id="home.login.msg" defaultMessage="Log-in to your account" />
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Form.Item>
    </Form>
};

const FormLoginWrapped = Form.create({name: 'normal_login'})(injectIntl(FormLogin));
export default FormLoginWrapped;


