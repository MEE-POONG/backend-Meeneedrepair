import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";

interface BasicInputProps {
    title: string;
    labelShow: string;
    placeholderShow: string;
    typeShow: string;
    valueShow: string;
    valueSet: (value: string) => void;
    checkIsValid: boolean;
    rules?: (value: string) => boolean;
    invalidFeedback: string;
    disabled: boolean;
}
const BasicInput: React.FC<BasicInputProps> = ({
    title,
    labelShow,
    placeholderShow,
    typeShow,
    valueShow,
    valueSet,
    rules,
    checkIsValid,
    invalidFeedback,
    disabled,
}) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [showValidation, setShowValidation] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        valueSet(inputValue);
    };

    useEffect(() => {
        if (checkIsValid && rules) {
            setIsValid(rules(valueShow));
            setShowValidation(true);
        }
    }, [checkIsValid, valueShow, rules]);

    return (
        <>
            <Form.Group className="mb-3" controlId={title}>
                <Form.Label>{labelShow}</Form.Label>
                <Form.Control
                    type={typeShow}
                    placeholder={placeholderShow}
                    name={title}
                    value={valueShow}
                    onChange={handleInputChange}
                    isValid={showValidation && isValid === true}
                    isInvalid={showValidation && isValid === false}
                    disabled={disabled}
                />
                {showValidation && isValid === false && <Form.Control.Feedback type="invalid">
                    {invalidFeedback}
                </Form.Control.Feedback>}
            </Form.Group>
        </>
    );
};
export default BasicInput;