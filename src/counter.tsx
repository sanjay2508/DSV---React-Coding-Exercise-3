import { Button, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import { reducer } from "state/reducer";

export default function Counter() {
    const [countState, dispatch] = useReducer(reducer, { count: 0 });
    const [numberInput, setNumberInput] = useState(0);

    return (<>
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
    </>)
}