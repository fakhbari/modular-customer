import * as React from "react";
import {alpha} from "@mui/material/styles";
import * as Icons from "@mui/icons-material";
import {
  Tooltip,
  Checkbox,
  Paper,
  Typography,
  Toolbar,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  IconButton
} from "@mui/material";
import CustomerModal, {formData, modalData} from "./Modal";
import {useState} from "react";
import axios from 'axios';

interface customerType {
  customerNumber: number,
  name: string,
  family: string,
  nationalCode: string
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "customerNumber",
    numeric: true,
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "family",
    numeric: true,
    disablePadding: false,
    label: "Family",
  },
  {
    id: "nationalCode",
    numeric: true,
    disablePadding: false,
    label: "national Code",
  },
  {
    id: "operation",
    numeric: true,
    disablePadding: false,
    label: "Operation",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {onSelectAllClick, numSelected, rowCount} = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selectedItem: any;
  onAddItem:()=>void;
  onDeleteItem:(customerNumbers:number[])=>void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {numSelected, selectedItem} = props;
  const AddIcon = Icons.AddCircle;
  const DeleteIcon = Icons.Delete;

  const handleDeleteCustomer = (customerNumbers:number[]) =>{
    props.onDeleteItem(customerNumbers)
  }

  return (
    <>

      <Toolbar
        sx={{
          pl: {sm: 2},
          pr: {xs: 1, sm: 1},
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{flex: "1 1 100%"}}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{flex: "1 1 100%"}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Customers
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
                onClick={() => {
                  handleDeleteCustomer(selectedItem)
                }}
            >
              <DeleteIcon
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add New Customer">
            <IconButton onClick={()=>{props.onAddItem()}}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
}

interface customersType {
  name:string,
  family:string,
  nationalCode:string,
  customerNumber:number
}

export default function CustomerTable(props:{customers:customerType[],setCustomers:(customers:customersType[])=>void}) {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [modal, setModal]=useState<{isOpen:boolean,data:modalData }>({isOpen:false,data:{name:'',family:'',nationalCode:'',onSubmit:()=>{}}})
  let EditIcon = Icons.Edit;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.customers.map((n) => n.customerNumber);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, customerNumber: number) => {
    const selectedIndex = selected.indexOf(customerNumber);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, customerNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (customerNumber: number) => selected.indexOf(customerNumber) !== -1;

  const submitModalAddHandler = (formData:formData)=>{
    const newCustomer = {
      ...formData,
      customerNumber:Math.floor(Math.random() * 1000) + 1
    }
    props.setCustomers([...props.customers,newCustomer])
    axios.post('http://localhost:7000/customers',newCustomer)
  }
  const submitModalEditHandler = (customerNumber:number,formData:formData)=>{
    const updatedCustomers = props.customers.map(customer =>{
      if(customer.customerNumber == customerNumber){
        return{customerNumber,...formData}
      }else {
        return customer
      }
    })
    props.setCustomers(updatedCustomers)
  }
  const handleDeleteItem= (customerNumbers:number[])=>{
    const updatedCustomers = props.customers.filter(customer =>!customerNumbers.includes(customer.customerNumber))
    props.setCustomers(updatedCustomers)
    setSelected([])
  }
  return (
    <>
      {/*sample of publishing an event*/}
      {/*<button onClick={()=>{*/}
      {/*  (window as any).publish('mife-a', {*/}
      {/*    type: 'show_dialog',*/}
      {/*    name: 'close_file'*/}
      {/*  });*/}
      {/*}}>click me </button>*/}
      <Box sx={{width: "100%"}}>
        <Paper sx={{width: "100%", mb: 2}}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selectedItem={selected}
            onAddItem={()=>{setModal({isOpen: true,data: {name:'',family:'',nationalCode:'',onSubmit:submitModalAddHandler}})}}
            onDeleteItem={handleDeleteItem}
          />
          <TableContainer>
            <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={props.customers.length}
              />
              <TableBody>
                {props.customers && props.customers.map((customer, index) => {
                  const isItemSelected = isSelected(customer.customerNumber);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={customer.customerNumber}
                      selected={isItemSelected}
                      sx={{cursor: "pointer"}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, customer.customerNumber)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {customer.customerNumber}
                      </TableCell>
                      <TableCell align="center">{customer.name}</TableCell>
                      <TableCell align="center">{customer.family}</TableCell>
                      <TableCell align="center">{customer.nationalCode}</TableCell>
                      <TableCell align="center">
                        <EditIcon onClick={() => {
                          setModal(
                            {
                              isOpen: true,
                              data: {
                                name:customer.name,
                                family:customer.family,
                                nationalCode:customer.nationalCode,
                                onSubmit:(formData)=>{submitModalEditHandler(customer.customerNumber,formData)},
                              }
                            }
                          )
                        }
                        }/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <CustomerModal openModal={modal.isOpen} modalData={modal.data} closeModal={()=>{setModal({isOpen: false,data: {name:'',family:'',nationalCode:'',onSubmit:()=>{}}})}} />
    </>
  );
}
