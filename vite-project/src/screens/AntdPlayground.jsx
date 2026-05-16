import React, { useEffect } from 'react'
// import { Button, Checkbox, Col, Row } from 'antd';
// import { PoweroffOutlined, SkinTwoTone } from '@ant-design/icons';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select } from "antd";

// const onChange = checkedValues => {
//     console.log('checked = ', checkedValues);
// };
const onFinish = values => {
    console.log('Received values of form: ', values);
};

export const AntdPlayground = () => {
    // Create form instance using useForm hook
    const [form] = Form.useForm();

    // Initial values
    const initialValues = {
        name: "Ali Haider",
        email: "ali@example.com",
        age: 25,
        gender: "male",
    };

    // // Example: Update form values dynamically
    // useEffect(() => {
    //     form.setFieldsValue({
    //         name: "Updated Ali",
    //         age: 26
    //     });
    // }, [form]);

    // Submit handler
    const onFinish = (values) => {
        console.log("Submitted Values:", values);
    };
    return (
        <div>
            {/* <Button icon={<PoweroffOutlined />} color="default" variant="dashed">
                Dashed
            </Button>
            <Button onClick={(e) => {
                console.log(e, "e");
            }} loading={false} size='large' variant='outlined' type="primary">Primary Button</Button>
            <SkinTwoTone />
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value="A">A</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="B">B</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="C">C</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="D">D</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="E">E</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group> */}
            <div style={{ maxWidth: 500 }}>
                <Form
                    // form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={onFinish}
                >
                    {/* Name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                            {
                                min: 3,
                                message: "Name must be at least 3 characters",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    {/* Age */}
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your age",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter your age"
                            style={{ width: "100%" }}
                            min={1}
                        />
                    </Form.Item>

                    {/* Gender */}
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: "Please select gender",
                            },
                        ]}
                    >
                        <Select placeholder="Select gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button
                            style={{ marginLeft: 10 }}
                            // onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
