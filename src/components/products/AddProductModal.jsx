import React from 'react'
import { useState } from "react";

import { useMutation } from "@apollo/client";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';

import { GET_PRODUCTS } from "../../queries/productQueries";
import { ADD_PRODUCT } from "../../mutations/productMutation";
import Scanner from '../shared/Scanner';

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

export default function AddProductModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState([]);
    const [characteristics, setCharacteristics] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState();
    const [scannedResult, setScannedResult] = useState('');
    const [addProduct] = useMutation(ADD_PRODUCT, {
        variables: { name, description, amount, price, image, characteristics },
        update(cache, { data: { addProduct } }) {
            const { products } = cache.readQuery({ query: GET_PRODUCTS });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: { products: [...products, addProduct] }
            });
        }
    });



    const onImageChange = (e) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImage(data.result);
        })
        data.readAsDataURL(e.target.files[0]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || price === '' || amount === '' || image === '') {
            return alert('Please fill in all fields');
        }

        addProduct(name, description, amount, price, image, characteristics);

        setAmount();
        setDescription('');
        setName('');
        setImage('');
        setPrice('');
        setCharacteristics('')
        handleClose();
    };

    const handleScanResult = (result) => {
        if (result && result.codeResult.code) {
            setScannedResult(result.codeResult.code);
        }

    };

    return (
        <div>         <Tooltip title="Add product">
            <Fab onClick={handleOpen} className='m-2' aria-label="add">
                <AddIcon sx={{ color: grey[900] }} />
            </Fab>
        </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} >
                {
                !scannedResult ?
                    
                <Scanner closeModal={handleClose} onDetected={handleScanResult} stopScanner={open} />
                :
                     <form onSubmit={onSubmit}>
                        <h2 >Add product</h2>
                        <div className="m-2">
                            <TextField fullWidth id="Name" label="Name" variant="standard" value={name}
                                onChange={(e) => setName(e.target.value)} />

                        </div>

                        <div className="m-2">
                            <TextField
                                id="outlined-multiline-static"
                                label="Bar Code"
                                multiline
                                disabled
                                rows={4}
                                fullWidth
                                defaultValue={scannedResult}
                            />

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

                            <TextField fullWidth id="Amount" label="Amount" variant="standard" value={amount}
                                onChange={(e) => setAmount(e.target.value)} />

                        </div>

                        <div className="m-2">

                            <TextField fullWidth id="Characteristics" label="Characteristics" variant="standard" value={characteristics}
                                onChange={(e) => setCharacteristics(e.target.value)} />

                        </div>

                        <div className="m-2">

                            <TextField fullWidth id="Price" label="Price" variant="standard" value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="m-2">
                            <input type="file" style={{ cursor: 'pointer' }} multiple accept="image/*" onChange={onImageChange} />
                            <img style={{ width: "20em" }} src={image} alt='imageSelected' />
                        </div>
                        <div className=" text-center">
                            <Button className="m-2 " type="submit" variant="contained">Submit</Button>
                        </div>
                    </form> 
                }
                </Box>
            </Modal></div>
    )
}
