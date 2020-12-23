//All import statements
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import {Button, InputLabel, Input, FormControl, ListItem, List, Box, Grid, Paper, Typography, CardContent, Card} from '@material-ui/core'

const endpoint = "https://expresschatserver.herokuapp.com/"
//Functional React Component, inheriting the loginDetails 
function Chatroom({loginDetails}){

    //Text state hook, in order to store the message entry 
    const [text, setText] = useState("");

    //State hook to store all messages in the room
    const [messageList, setMessageList] = useState([]);

    const history = useHistory();

    //Called everytime component loads and relaods
    useEffect(()=> {

        console.log(loginDetails)
        if(loginDetails[0] === ""){
            console.log("There are no login details")
            history.push("/chat")
        }
        //Connect
        const socket = socketIOClient(endpoint);

        //Whenever we get that message
        socket.on("Update", data => {

            //Pull The data and set to messagelist
            axios.get(endpoint + "messagelist", {params: {roomID: loginDetails[1]}}).then(response => {
                setMessageList(response.data)
            });
        });

        return () => socket.disconnect();
    }, [])

    //Text Value Changed
    function textChanged(e) {
        setText(e.target.value);
    }

    //When submitted
    function handleSubmit(e){
        e.preventDefault()
        console.log("text submitted, " + text)
        const toAdd = 
        {
            username: loginDetails[0],
            text: text,
            roomID: loginDetails[1]
        }
        axios.post(endpoint + "messages", toAdd)

        setText("");
    }

    //Render
    return(
        <div>
            <Grid container>
                <Grid item xs = {6}>
                    <Grid container spacing = {0} direction = "column" alignItems = "center" justify = "center" style = {{minHeight: '80vh'}}>
                        <Grid item xs = {6}>
                            <Paper elevation = {3}>
                                <Box p = {3} pb = {0}>
                                    <form autoComplete = "off" onSubmit = {handleSubmit}>
                                        <FormControl>
                                            <InputLabel htmlFor = "text-input">Send a Message!</InputLabel>
                                            <Input id = "text-input" value = {text} onChange = {textChanged} />
                                        </FormControl>
                                    </form>
                                </Box>
                                <Box p = {3}>
                                    <Button variant="contained" color="primary" onClick = {handleSubmit}>
                                        Send
                                    </Button>
                                </Box>
                                              
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs = {6}>
                    <List style = {{width: '100%', overflow: 'auto', maxHeight: 500}}>
                        {messageList.slice(0).reverse().map(message => {
                            return (
                                <ListItem key= {message.id} style = {{width: "100%"}}>
                                    <Box p = {0.5} style = {{width: "100%"}}>
                                        <Card>
                                            <CardContent>
                                                <Typography color="textSecondary" gutterBottom>
                                                    {message.username}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {message.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}
export default Chatroom;