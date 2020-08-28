import React from "react";
import styled from "styled-components";
import { Typography, Input, Select, Button, List } from "antd";

const { Text } = Typography;
const { Option } = Select;
const { Item } = List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5%;
`;

const Row = styled.div`
  margin-bottom: 2.5%;
`;

const Label = styled(Text)`
  display: block;
`;

const StyledInput = styled(Input)`
  width: 300px;
`;

const StyledSelect = styled(Select)`
  width: 300px;
`;

const StyledButton = styled(Button)`
  width: 300px;
`;

const Spacer = styled.div`
  height: 2.5%;
`;

const StyledList = styled(List)`
  width: 500px;
`;

function App() {
  return (
    <Container>
      <Row>
        <Label sty>List</Label>
        <StyledInput />
      </Row>
      <Row>
        <Label>Search</Label>
        <StyledInput />
      </Row>
      <Row>
        <Label>Search Type</Label>
        <StyledSelect defaultValue="linear_search">
          <Option value="linear_search">Linear Search</Option>
          <Option value="binary_search">Binary Search</Option>
          <Option value="bubble_sort">Bubble Sort</Option>
        </StyledSelect>
      </Row>
      <Row>
        <StyledButton type="primary">Search</StyledButton>
      </Row>
      <Spacer />
      <StyledList
        header={<Label>Result</Label>}
        bordered
        dataSource={["data"]}
        renderItem={(item) => (
          <Item>
            <Text>{item}</Text>
          </Item>
        )}
      />
    </Container>
  );
}

export default App;
