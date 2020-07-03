import React from 'react'
import './Input.css'

const input = (props) => {

    const { label, elementType, elementConfig, value, changed, notValid, shouldValidate, touched } = props
    let inputElement = null
    const inputClasses = ['input-element']

    if (notValid && shouldValidate && touched) {
        inputClasses.push('not-valid')
    }

    const cls = inputClasses.join(' ')

    // Adding validation error messages
    let validationError = null
    if (touched && notValid) {
        validationError = <p>Please Enter a Valid Value</p>
    }

    switch (elementType) {
        case ('input'):
            inputElement =
                <input
                    className={cls}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
            break
        case ('textarea'):
            inputElement =
                <textarea
                    className={cls}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
            break
        case ('select'):
            inputElement = (
                <select
                    className={cls}
                    value={value}
                    onChange={changed}>
                    {elementConfig.options.map(option => {
                        const { display, value } = option
                        return (
                            <option
                                key={value}
                                value={value}>
                                {display}
                            </option>
                        )
                    })}
                 </select>
            )
            break
        default:
            inputElement =
                <input
                    className={cls}
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
    }


    return (
        <div className='input'>
            <label className='label'>{label}</label>
            {inputElement}
        </div>
        )

}

export default input