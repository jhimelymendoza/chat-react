import {Button, Checkbox, Form, Icon, Input} from "antd";
import {Col, Row} from 'react-flexbox-grid';
import React from "react";
import { useRouter } from 'rift-router';


const FormLogin = (props: any) => {
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
                    placeholder="Username"
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
                    placeholder="Password"
                />,
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
                Forgot password
            </a>

            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Form.Item>
    </Form>
};

const FormLoginWrapped = Form.create({name: 'normal_login'})(FormLogin);
export default FormLoginWrapped;
