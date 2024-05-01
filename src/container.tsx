import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CustomerTable from './components/CustomerTable';
import {CustomerDataContext} from './dataContext';

const theme = createTheme({
    typography: {
        fontFamily: [
            'IRANSans',
        ].join(','),
    },
    direction:"rtl"
});
const Container = () => {

    const {customers , setCustomers} = useContext(CustomerDataContext)
    return (

        <ThemeProvider theme={theme}>
            <div>
                {customers ? <CustomerTable customers={customers} setCustomers={setCustomers} /> : "مشتری ای یافت نشد"}
            </div>
        </ThemeProvider>
    );
};

export default Container;