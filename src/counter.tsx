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
            onChange={(event) => setNumberInput(Number(event.target.value))}
        />
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: "decrement" })}
        >
            -
        </Button>
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: "increment" })}
        >
            +
        </Button>
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: 'incrementBy', payload: 2 })}

        >
            Increment by 2
        </Button >
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: 'incrementToNearestOdd' })}

        >
            Increment to neareast Odd
        </Button >
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: 'decrementByInput', payload: numberInput })}
        >
            Decrement By Input
        </Button >
        <Button
            style={{ margin: 8 }}
            variant="contained"
            onClick={() => dispatch({ type: 'reset' })}
        >
            RESET
        </Button >
    </>)
}