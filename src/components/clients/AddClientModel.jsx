import { useState } from "react";
import { useMutation } from "@apollo/client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ADD_CLIENT } from "../../mutations/clientMutation";
import { GET_CLIENTS } from "../../queries/clientQueries";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {grey} from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function AddClientModel() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            });
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields');
        }

        addClient(name, email, phone);
        setEmail('');
        setName('');
        setPhone('');
        handleClose();
    };

    return (
        <div className={` m-3`}>

            <Tooltip title="Add client">
                <Fab onClick={handleOpen}  aria-label="add">
                    <AddIcon sx={{ color: grey[900] }}/>
                </Fab>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <h2 >Add Client</h2>
                    <form onSubmit={onSubmit} >
                        <div className="m-2">
                            <TextField fullWidth id="standard-basic" label="Name" variant="standard" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="m-2">
                            <TextField fullWidth id="standard-basic" label="Email" variant="standard" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="m-2">
                            <TextField fullWidth id="standard-basic" label="Phone" variant="standard" value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="m-2 text-center">

                            <Button type="submit" variant="contained">Submit</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
