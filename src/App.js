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

  const linearSearch = (numbers, searchNumber) => {
    let results = [];
    for (let i = 0; i < numbers.length; i++) {
      let result = `Round : ${i + 1} ===> `;
      if (numbers[i] === searchNumber) {
        result += `${numbers[i]} = ${searchNumber} found !!`;
        results.push(result);
        return results;
      } else {
        result += `${numbers[i]} != ${searchNumber}`;
        results.push(result);
      }
    }
    return results;
  };

  const iterativeBinarySearch = (numbers, searchNumber) => {
    let results = [];
    let left = 0;
    let right = numbers.length - 1;

    for (let i = 0; left <= right; i++) {
      let result = `Round : ${i + 1} ===> `;
      let mid = Math.floor((left + right) / 2);

      if (numbers[mid] > searchNumber) {
        result += `${numbers[mid]} != ${searchNumber}`;
        results.push(result);
        right = mid - 1;
      } else if (numbers[mid] < searchNumber) {
        result += `${numbers[mid]} != ${searchNumber}`;
        results.push(result);
        left = mid + 1;
      } else {
        result += `${numbers[mid]} = ${searchNumber} found !!`;
        results.push(result);
        return results;
      }
    }
  };

  const recursiveBinarySearch = (numbers, searchNumber, left, right) => {
    let mid = Math.floor((left + right) / 2);

    if (numbers[mid] > searchNumber) {
      console.log(`${numbers[mid]} > ${searchNumber}`);
      recursiveBinarySearch(numbers, searchNumber, left, mid - 1);
    } else if (numbers[mid] < searchNumber) {
      console.log(`${numbers[mid]} < ${searchNumber}`);
      recursiveBinarySearch(numbers, searchNumber, mid + 1, right);
    } else {
      console.log(`${numbers[mid]} = ${searchNumber} at index ${mid}`);
    }
  };

  const bubbleSort = (numbers) => {
    let results = [];
    let isSorted = false;

    for (let i = 0; i < numbers.length && !isSorted; i++) {
      let result = `Round : ${i + 1} ===> `;
      isSorted = true;
      for (let j = 1; j < numbers.length - i; j++) {
        if (numbers[j - 1] > numbers[j]) {
          isSorted = false;
          let temp = numbers[j];
          numbers[j] = numbers[j - 1];
          numbers[j - 1] = temp;
        }
      }
      result += numbers;
      results.push(result);
    }
    results[results.length - 1] += " sorted !!";
    return results;
  };

  const isDisable = () => {
    if (state.list && state.search) {
      return false;
    } else if (state.type === "bubble_sort" && state.list) {
      return false;
    } else {
      return true;
    }
  };

  const onButtonClick = async () => {
    clearState();
    let results = [];

    const numbers = listToNumbers(state.list);
    results.push(`List : [${numbers}]`);

    const searchNumber = Number(state.search.trim());
    results.push(`Search : ${searchNumber}`);

    results.push("Result :::");
    if (state.type === "linear_search") {
      results = [...results, ...linearSearch(numbers, searchNumber)];
    } else if (state.type === "iterative_binary_search") {
      results = [...results, ...iterativeBinarySearch(numbers, searchNumber)];
    } else if (state.type === "recursive_binary_search") {
      // TODO display results
      recursiveBinarySearch(numbers, searchNumber, 0, numbers.length - 1);
    } else {
      results = [...results, ...bubbleSort(numbers)];
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
          disabled={state.type === "bubble_sort"}
          onChange={(e) => onInputChange("search", e.currentTarget.value)}
        />
      </Row>
      <Row>
        <Label>Search Type</Label>
        <StyledSelect value={state.type} onChange={onSelectChange}>
          <Option value="linear_search">Linear Search</Option>
          <Option value="iterative_binary_search">
            Iterative Binary Search
          </Option>
          <Option value="recursive_binary_search">
            Recursive Binary Search
          </Option>
          <Option value="bubble_sort">Bubble Sort</Option>
        </StyledSelect>
      </Row>
      <Row>
        <StyledButton
          type="primary"
          disabled={isDisable()}
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
