import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";

type ListItem = {
    id: string;
    textShow: string | number;
};

interface BasicSelectInputProps {
    title: string;
    labelShow: string;
    placeholderShow: string;
    typeShow: string;
    valueShow: string | number;
    valueSet: (value: string) => void;
    checkIsValid: boolean;
    rules?: (value: string) => boolean;
    invalidFeedback: string;
    listArray?: ListItem[];
    disabled: boolean;
}

const BasicSelectInput: React.FC<BasicSelectInputProps> = ({
    title,
    labelShow,
    placeholderShow,
    typeShow,
    valueShow,
    valueSet,
    rules,
    checkIsValid,
    invalidFeedback,
    listArray,
    disabled,
}) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [showValidation, setShowValidation] = useState(false);

    useEffect(() => {
        if (checkIsValid && rules) {
            setIsValid(rules(valueShow.toString()));
            setShowValidation(true);
        }
    }, [checkIsValid, valueShow, rules]);

    return (
        <Form.Group className="mb-3 position-relative" controlId={title}>
            <Form.Label>{labelShow}</Form.Label>
            <Form.Select
                aria-label="Default select example"
                className='text-center'
                isValid={showValidation && isValid === true}
                isInvalid={showValidation && isValid === false}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    valueSet(event.target.value);
                }}
                value={valueShow} 
                disabled={disabled}
            >
                {listArray?.map((item, index) => (
                    <option key={index} value={item.textShow}>
                        {item.textShow + " %"}
                    </option>
                ))}
            </Form.Select>
            {/* {showValidation && isValid === false && <Form.Control.Feedback type="invalid">
                {invalidFeedback}
            </Form.Control.Feedback>} */}
        </Form.Group>
    );
};

export default BasicSelectInput;