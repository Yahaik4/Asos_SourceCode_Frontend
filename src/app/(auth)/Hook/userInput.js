import { useState, useEffect } from "react";

export function userInput(defaultValue, validationFn){
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    useEffect(() => {
        setEnteredValue(defaultValue); 
    }, [defaultValue]);

    function handleInputChange(event){
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur(){
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid,
        setValue: setEnteredValue,
    }
}

export default userInput;