import React, { useState, useEffect } from 'react';
import { Dropdown, Form, DropdownButton } from "react-bootstrap";

interface BasicDropdownInputProps {
    title: string;
    labelShow: string;
    placeholderShow: string;
    valueShow: string;
    rules: (value: string) => boolean;
    valueSet: (value: string) => void;
    checkIsValid: boolean;
    invalidFeedback: string;
    list: { text: string }[];
    disabled: boolean;

}

const BasicDropdownInput: React.FC<BasicDropdownInputProps> = ({
    title,
    labelShow,
    placeholderShow,
    valueShow,
    rules,
    valueSet,
    checkIsValid,
    invalidFeedback,
    list,
    disabled

}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleDropdownChange = (value: string) => {
        setSelectedValue(value);
        valueSet(value);
    };

    return (
        <>
            <Form.Label htmlFor={title}>{labelShow}</Form.Label>
            <Dropdown id={title} className='w-100'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='w-100'
                    disabled={disabled}
                >
                    {selectedValue || valueShow || placeholderShow}
                </Dropdown.Toggle>
                <Dropdown.Menu className='w-100 text-center'>
                    {list.map((item, index) => (
                        <Dropdown.Item key={index} onClick={() => handleDropdownChange(item.text)}>
                            {item.text}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {checkIsValid && !rules(selectedValue || '') && <Form.Text id={`${title}HelpBlock`} className="text-danger">
                {invalidFeedback}
            </Form.Text>}
        </>
    );
};
export default BasicDropdownInput;