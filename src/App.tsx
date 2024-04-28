import React, {useState} from 'react';
import CustomerTable from "./components/CustomerTable";

const Customer = () => {
  const [customers , setCustomers] = React.useState([])
  return (
      <div>
        { customers ? <CustomerTable customers={customers} setCustomers={()=>{alert('hello form set customer')}}/> : "no customer found ! "}
          <p>hello from customer</p>
      </div>
  );
};

export default Customer;
