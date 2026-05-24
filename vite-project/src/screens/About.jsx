import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { DatePicker, Button as AntButton } from 'antd';

export const About = () => {
  return (
    <div>About
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
          <AntButton className='custom-button' type="primary">Primary Button</AntButton>
          <DatePicker />
          {/* <FaAtlassian />
          <FaBeer />
          <HomeOutlined spin />
          <SmileOutlined />
          <SmileOutlined rotate={180} /> */}
          
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
