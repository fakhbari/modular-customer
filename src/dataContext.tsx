//@ts-nocheck
import React from "react";
import { createContext, useState } from 'react';
export interface SharedDataContextProps {
    children: JSX.Element;
}
export const CustomerDataContext = createContext<Record<string, any>>({});
export function CustomerDataProvider({ children }: SharedDataContextProps) {
    const [customers, setCustomers] = useState([
        {customerNumber:1, name:"فرشته", family:"اخباری", nationalCode:"123456789"},
        {customerNumber:2, name:"زهرا", family:"قلی زاده", nationalCode:"987654321"},
        {customerNumber:3, name:"آرمان", family:"طاهریان", nationalCode:"543219876"},
    ]);
    return (
        <CustomerDataContext.Provider value={{ customers, setCustomers }}>
            {children}
        </CustomerDataContext.Provider>
    );
}
export default CustomerDataProvider;