import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Col, FloatingLabel, Form } from "react-bootstrap";

// Your interfaces and options here...
interface BankAccountProps {
    bankAccount: string;
    setBankAccount: React.Dispatch<React.SetStateAction<string>>;
    inputForm: boolean;
}
const BankAccount: React.FC<BankAccountProps> = ({ bankAccount, setBankAccount, inputForm }) => {
    const handleInputChange = (setter: any) => (event: any) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) && !newValue.includes('.')) {
            setter(newValue);
        }
    };

    return (
        <FloatingLabel controlId="bankBankAccount" label="Bank Account / เลขบัญชีธนาคาร" className="mb-3">
            <Form.Control
                isValid={inputForm && bankAccount !== ""}
                isInvalid={inputForm && bankAccount === ""}
                minLength={10}
                maxLength={13}
                type="text"
                placeholder="Bank account / เลขบัญชีธนาคาร"
                value={bankAccount}
                onChange={handleInputChange(setBankAccount)}
            />
        </FloatingLabel>
    );
};

export default BankAccount;
