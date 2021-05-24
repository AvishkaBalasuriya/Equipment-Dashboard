import React from 'react'
import TextField from '@material-ui/core/TextField';

const InputField = (props) => {
    const onChange = (e) => {
        props.onChange(e.target.value)
    }

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={props.id}
            label={props.label}
            name={props.name}
            autoComplete={props.autoComplete}
            type={props.type}
            onChange={(e)=>onChange(e)}
            autoFocus
        />
    )
}

export default InputField
