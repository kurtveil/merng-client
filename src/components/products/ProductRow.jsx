import React from 'react'
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
import { DELETE_PRODUCT } from '../../mutations/productMutation';
import { GET_PRODUCTS } from '../../queries/productQueries';

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

export default function ProductRow({ product }) {
    const [open, setOpen] = React.useState(false);
    const [productSelected, setProductSelected] = React.useState({});
    function handleOpen(product)  {
        setOpen(true);
        setProductSelected(product);
    };
    const handleClose = () => setOpen(false);

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        variables: { id: productSelected.id },
        refetchQueries: [{ query: GET_PRODUCTS }],
        // update(cache, {data:{deleteProduct}}){
        //     const {products} = cache.readQuery({
        //         query:GET_PRODUCTS
        //     });
        //     cache.writeQuery({
        //         query:GET_PRODUCTS,
        //         data:{products:products.filter(product=>product.id !== deleteProduct.id)}
        //     });
        // }
    }, [handleClose]);
    return (
        <>
            <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                    {product.id}
                </StyledTableCell>
                <StyledTableCell align="right">{product.name}</StyledTableCell>
                <StyledTableCell align="right">{product.description}</StyledTableCell>
                <StyledTableCell align="right">{product.amount}</StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                    <Tooltip title="Delete client">
                        <DeleteForeverIcon className='cursor' onClick={()=>handleOpen(product)} />
                    </Tooltip>
                </StyledTableCell>
            </StyledTableRow>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='text-center' sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete client {productSelected.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure to want delete this product {productSelected.name}
                    </Typography>
                    <div className='mt-2 pt-2'>

                        <Button variant="contained" onClick={deleteProduct}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
