import React, { useState } from "react";
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
  const [state, setState] = useState({
    list: "",
    search: "",
    type: "linear_search",
    results: [],
  });

  const clearState = () => {
    setState({
      list: "",
      search: "",
      type: "linear_search",
      results: [],
    });
  };

  const onInputChange = (keyName, value) => {
    setState({ ...state, [keyName]: value });
  };

  const onSelectChange = (value) => {
    setState({ ...state, type: value });
  };

  const updateResults = (results) => {
    setState({ ...state, results });
  };

  const listToNumbers = (list) => {
    const numbers = list
      .replace(/ /g, "")
      .split(",")
      .map((item) => Number(item));
    return numbers;
  };

  const binarySearch = (data, searchNumber) => {};

  const onButtonClick = async () => {
    clearState();
    let results = [];

    const numbers = listToNumbers(state.list);
    results.push(`List : [${numbers}]`);

    const search = Number(state.search.trim());
    results.push(`Search : ${search}`);

    results.push("Result :::");
    if (state.type === "linear_search") {
      //
    } else if (state.type === "binary_Search") {
      //
    } else {
      //
    }

    updateResults(results);
  };

  return (
    <Container>
      <Row>
        <Label>List</Label>
        <StyledInput
          value={state.list}
          onChange={(e) => onInputChange("list", e.currentTarget.value)}
        />
      </Row>
      <Row>
        <Label>Search</Label>
        <StyledInput
          value={state.search}
          onChange={(e) => onInputChange("search", e.currentTarget.value)}
        />
      </Row>
      <Row>
        <Label>Search Type</Label>
        <StyledSelect value={state.type} onChange={onSelectChange}>
          <Option value="linear_search">Linear Search</Option>
          <Option value="binary_search">Binary Search</Option>
          <Option value="bubble_sort">Bubble Sort</Option>
        </StyledSelect>
      </Row>
      <Row>
        <StyledButton
          type="primary"
          disabled={!state.list || !state.search}
          onClick={onButtonClick}
        >
          Search
        </StyledButton>
      </Row>
      <Spacer />
      <StyledList
        header={<Label>Results</Label>}
        bordered
        dataSource={state.results}
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
