import React, { useState } from 'react';
import { Dropdown, FloatingLabel, Form, Image } from "react-bootstrap";
import { bankMap } from '@/data/test';

interface BankSelectProps {
    handleInputChange: (field: string, value: string) => void;
    defaultValueShow: string;
}

interface Option {
    id: string;
    value: string;
    image: string;
}


const BankSelectF: React.FC<BankSelectProps> = ({ handleInputChange, defaultValueShow }) => {
    const [selectedBank, setSelectedBank] = useState<string>(defaultValueShow);

    const handleBankSelection = (option: Option) => {
        setSelectedBank(option.value);
        handleInputChange('bank', option.value);
    };
    const bankObj = bankMap.find(bank => bank.value === selectedBank);

    return (
        <>
            <FloatingLabel controlId="bankBankAccount" label="Bank Account / เลขบัญชีธนาคาร" className="mb-3">
                <Dropdown bsPrefix='form-control'>
                    <Dropdown.Toggle id="dropdown-dark-example1" className='w-100' variant='select-form'>
                        {bankObj &&
                            <Image src={bankObj.image} alt={bankObj.value} style={{ width: '20px', marginRight: '10px' }} />
                        }
                        {selectedBank}

                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {bankMap.map((option) => (
                            <Dropdown.Item key={option.id} onClick={() => handleBankSelection(option)}>
                                <Image src={option.image} alt={option.value} style={{ width: '20px', marginRight: '10px' }} />
                                {option.value}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </FloatingLabel>
            {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedBank || "Choose bank"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {bankMap.map((option) => (
                        <Dropdown.Item key={option.id} onClick={() => handleBankSelection(option)}>
                            <Image src={option.image} alt={option.value} style={{ width: '20px', marginRight: '10px' }} />
                            {option.value}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown> */}
        </>
    );
};

export default BankSelectF;