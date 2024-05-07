import axios from 'axios';

export const sayHello = ()=>{
  console.log("hello ^_^")
}
export const sayGoodbye = ()=>{
  console.log("goodbye :(")
}


export const getCustomers = ()=>{
  return axios.get('http://localhost:7000/customers')
}
