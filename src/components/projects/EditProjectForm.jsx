import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECT } from "../../queries/projectQueries"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';


export default function EditProjectForm({ project,isCloseModal }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const [status, setStatus] = useState(project.status);
  
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    });
    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !status) {
            return alert('Please fill out all fields');
        }
        updateProject(name, description, status);
        isCloseModal(true);
    }
    return (


                <div className="mt-5 border-top">

                            <h3>Update Project Details</h3>
                     

                    
                <form onSubmit={onSubmit}>
                    <div className="m-2">
                        <TextField id="Name" label="Name" variant="standard" value={name}
                            onChange={(e) => setName(e.target.value)} />

                    </div>

                    <div className="m-2">
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
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
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
    )
}
