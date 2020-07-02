import React from 'react'
import './Input.css'

const input = (props) => {

    const { label, tag, elementType, elementConfig, value, changed } = props
    let inputElement = null

    switch (elementType) {
        case ('input'):
            inputElement =
                <input
                    className='input-element'
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
            break
        case ('textarea'):
            inputElement =
                <textarea
                    className='input-element'
                    {...elementConfig}
                    value={value}
                    onChange={changed} />
            break
        case ('select'):
            inputElement = (
                <select
                    className='input-element'
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
                    className='input-element'
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