import React from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useMutation } from '@apollo/client';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { DELETE_CLIENT } from '../../mutations/clientMutation';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { GET_PROJECTS } from '../../queries/projectQueries';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

export default function ClientRow({ client }) {
    const handleClose = () => setOpen(false);
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    }, [handleClose]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        };        
    return (
        <>
            <StyledTableRow key={client.id}>
                <StyledTableCell component="th" scope="row">
                    {client.id}
                </StyledTableCell>
                <StyledTableCell align="right">{client.name}</StyledTableCell>
                <StyledTableCell align="right">{client.email}</StyledTableCell>
                <StyledTableCell align="right">{client.phone}</StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="Delete client">
                        <DeleteForeverIcon className='cursor' onClick={handleOpen} />
                    </Tooltip>
                </StyledTableCell>
            </StyledTableRow>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  className='text-center' sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Delete client {client.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       Are you sure to want delete this client.
                    </Typography>
                    <div  className='mt-2 pt-2'>

                    <Button  variant="contained" onClick={deleteClient}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
