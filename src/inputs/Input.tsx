import React, { ChangeEvent, useCallback } from 'react';
import { FormControl as Base } from 'react-bootstrap';

interface InputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    multiline?: boolean;
    value?: string;
    rows?: number;
    type: 'text' | 'email' | 'number';
    step?: number;
    length: number;
    pattern?: RegExp;
    label?: string;
    inline?: boolean;
    className?: string;
    onChange?: (v: string) => void;
    onBlur?: () => void;
};

const replaceChars: Record<string, string> = { ' ': '', ',': '.' };
const Input = ({type, pattern, length, step, onChange, id, label, inline, ...rest}: InputProps) =>{
    const numberRegex = new RegExp(`^-?[0-9 ]{0,${length && step ? length-step : length ? length : 1}}([.,][0-9]{0,${step}})?$`);
    if (type === 'number') {
        if (!pattern) pattern = numberRegex;
        type = 'text';
        if (step) length = length + 1;
    }

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!pattern) onChange && onChange(e.target.value);
        else if (pattern.test(e.target.value) && type === 'number') {
            onChange && onChange(e.target.value.replace(/\s/g, ''));
        } else if (pattern.test(e.target.value)) {
            onChange && onChange(e.target.value.replace(/,|\s/g, match => replaceChars[match]));
        } else e.preventDefault();
        },
        [onChange, pattern, type],
    );

    return (
        <div className={inline ? 'no-wrap' : ''}>
            {label && <label htmlFor={id}>{label}</label>}
            <Base
                type={type}
                onChange={handleChange}
                maxLength={length}
                id={id}
                {...rest}
            />
        </div>
    )
};

export default Input;