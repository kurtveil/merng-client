import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import {grey} from '@mui/material/colors';

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

export default function AddProjectModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, clientId, status},
        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({query:GET_PROJECTS});
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects:[...projects, addProject]}
            });
        }
    });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }

        addProject(name,description,status,clientId);

        setClientId();
        setDescription('');
        setName('');
        setStatus('new');
        handleClose();
    };

    if (loading) return null;
    if (error) return 'Soemthing went wrong';
    return (
        <div className="projectModal">
            {!loading && !error && (
                <>
                        <Tooltip title="Add Project">
                            <Fab onClick={handleOpen} className='m-2' aria-label="add">
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
                            <form onSubmit={onSubmit}>
                                <h2 >Add Project</h2>
                                <div className="m-2">
                                    <TextField fullWidth id="Name" label="Name" variant="standard" value={name}
                                        onChange={(e) => setName(e.target.value)} />

                                </div>

                                <div className="m-2">
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                </div>

                                <div className="m-2">


                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="status"
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem value='new'>Not Started</MenuItem>
                                            <MenuItem value='progress'>In Progress</MenuItem>
                                            <MenuItem value='completed'>Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="m-2">
                                    <label className="form-label">Client</label>
                                    <select id="clientId" className="form-select" value={clientId}
                                        onChange={(e) => setClientId(e.target.value)}>
                                        <option value="">Select Client</option>
                                        {data.clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className=" text-center">
                                <Button className="m-2 " type="submit" variant="contained">Submit</Button>
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </>
            )}

        </div>
    )
}
