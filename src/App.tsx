import React from 'react';
import "./App.module.css";
import {CustomerDataProvider} from './dataContext';
import Container from './container';


const Customer = () => {
    return (
        <CustomerDataProvider>
            <Container />
        </CustomerDataProvider>
    );
};

export default Customer;