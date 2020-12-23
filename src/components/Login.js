import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { useHistory } from "react-router-dom";




function Login({sendDetails}){

  const [roomID, setRoomID] = useState("");
  const[username, setUsername] = useState("");
  const history = useHistory();
  function handleSubmit(e) {
    console.log("Form Submitted!")
    console.log(username);
    console.log(roomID);
    sendDetails([username, roomID]);
    history.push("/chatroom")
  }
  function roomIDChanged(e){
    setRoomID(e.target.value);
    console.log("ID Changed");
  }
  function usernameChanged(e){
    setUsername(e.target.value);
    console.log("Username Changed");
  }
  return (
    <div>
      <Grid container spacing = {0} direction = "column" alignItems = "center" justify = "center" style = {{minHeight: '80vh'}}>
        <Grid item xs = {3}>
          <Paper elevation = {3} style = {{minWidth: '50vh'}}>
            
            <form autoComplete="off">
              <Box p= {2} pt= {3}>
                <FormControl>
                  <InputLabel htmlFor="username-input">Username</InputLabel>
                  <Input required id = "username-input" value = {username} onChange = {usernameChanged} />
                </FormControl>
              </Box>
              <Box p = {2} pt = {1}>
                <FormControl>
                  <InputLabel htmlFor="roomID-input">Room ID</InputLabel>
                  <Input required id = "roomID-input"  value = {roomID} onChange = {roomIDChanged} />
                </FormControl>
              </Box>
            </form>
            <Box p = {2}>
              <Button variant="contained" color="primary" onClick = {handleSubmit}>
                Join
              </Button>
            </Box>

          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default Login;
