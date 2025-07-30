import React, { useState } from 'react';
import { Card, Button, Input, Row, Col } from 'antd';

const Calculator = () => {
  const [input, setInput] = useState(''); // Holds the current calculation input

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value); // Append the clicked button value to the input
  };

  const handleClear = () => {
    setInput(''); // Clear the input field
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1)); // Remove the last character from input
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); // Perform the calculation and update input
    } catch (error) {
      setInput('Error'); // Display error message for invalid calculations
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <Card title="Simple Calculator" className="p-4">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Input
            value={input}
            readOnly
            placeholder="Enter calculation"
            className="mb-3"
          />
        </Col>
        {buttons.flatMap((row, rowIndex) => (
          row.map((button, colIndex) => (
            <Col span={6} key={`${rowIndex}-${colIndex}`}>
              {button === '=' ? (
                <Button
                  type="primary"
                  onClick={handleCalculate}
                  block
                >
                  {button}
                </Button>
              ) : (
                <Button
                  onClick={() => handleButtonClick(button)}
                  block
                >
                  {button}
                </Button>
              )}
            </Col>
          ))
        ))}
        <Col span={12}>
          <Button onClick={handleClear} danger block>
            Clear
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={handleBackspace} type="default" block>
            Backspace
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Calculator;
