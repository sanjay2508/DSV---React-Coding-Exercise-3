import "./styles.css";
import { useReducer, useState } from "react";
import { Button, TextField } from "@mui/material";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function App() {
  const [users] = useState([]);
  const [numberInput] = useState(0);
  const [text] = useState("");
  const [countState, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="App">
      <p style={{ marginBottom: 0 }}>Count: {countState.count}</p>
      <TextField
        defaultValue={numberInput}
        type="number"
        style={{ display: "block" }}
      />
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </Button>
      <p style={{ marginBottom: 0, marginTop: 30 }}>Search for a user</p>
      <TextField
        defaultValue={text}
        style={{ display: "block", margin: "auto" }}
      />
    </div>
  );
}
