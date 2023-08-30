import React from 'react';
import Select from 'react-select';
import { Col, FloatingLabel, Form } from "react-bootstrap";
import { bankMap } from '@/data/test';


// Your interfaces and options here...
interface BankSelectProps {
    setBank: React.Dispatch<React.SetStateAction<string>>;
}
interface Option {
    value: string;
    image: string;
}

const formatOptionLabel = (option: Option) => (
    <div>
        <img src={option.image} alt={option.value} style={{ width: '20px', marginRight: '10px' }} />
        {option.value}
    </div>
);
const BankSelect: React.FC<BankSelectProps> = ({ setBank }) => {
    return (
        <Select
            className="mb-3"
            options={bankMap}
            formatOptionLabel={formatOptionLabel}
            isSearchable
            placeholder="Bank / เลือกธนาคาร"
            onChange={(option: any) => setBank(option ? option.value : null)}
        />
    );
};

export default BankSelect;
