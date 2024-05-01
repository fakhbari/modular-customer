import * as React from 'react';
import {TextField, Modal, Box, Typography, Button} from "@mui/material";
import styles from './Modal.module.css';
import {useEffect} from "react";

export interface formData{
  name:string;
  family:string;
  nationalCode:string;
}

export interface modalData {
  name:string;
  family:string;
  nationalCode:string;
  onSubmit:(formData:formData)=>void
}

interface Iprops{
  openModal:boolean;
  closeModal:()=>void;
  modalData:modalData;
}

export default function CustomerModal(props:Iprops) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [nationalCode , setNationalCode] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal()
    setOpen(false)
    setName('')
    setFamily('')
    setNationalCode('')
  };

  useEffect(()=>{
    if(props.openModal){
      handleOpen()
    }
    if(props.modalData){
      setName(props.modalData.name)
      setFamily(props.modalData.family)
      setNationalCode(props.modalData.nationalCode)
    }
  },[props])

  const onSubmitData = () =>{
    props.modalData.onSubmit({name,family,nationalCode})
    handleClose();
  }

  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer} >
          <Typography className={styles['m-b-10']}> مشخصات مشتری : </Typography>
          <TextField
              required
              id="name"
              label="نام"
              size="small"
              margin="dense"
              value={name}
              onChange={(event)=>{setName(event.target.value)}}
          />
          <TextField
              required
              id="family"
              label="نام خانوادگی"
              size="small"
              margin="dense"
              value={family}
              onChange={(event)=>{setFamily(event.target.value)}}
          />
          <TextField
              required
              id="nationalCode"
              label="کد ملی"
              size="small"
              margin="dense"
              value={nationalCode}
              onChange={(event)=>{setNationalCode(event.target.value)}}
          />
          <Button variant="contained" fullWidth={true} onClick={onSubmitData}>ثبت</Button>
        </Box>
      </Modal>
  );
}