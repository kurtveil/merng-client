import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from "react"
import EditProjectForm from './EditProjectForm';
import { useNavigate } from 'react-router-dom';
import DeleteProject from './DeleteProject';

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

const options = ['Edit', 'More', 'Delete'];


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [status, setStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const isModalDelete = () => setIsDelete(true);

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (options[index] === 'Edit') {
      setOpenModal(true);
    } else if (options[index] === 'More') {
      return navigate(`/projects/${project.id}`);
    } else if (options[index] === 'Delete') {
      isModalDelete(true);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    if (project.status === 'Not Started') {
      setStatus('new');
    } else if (project.status === 'In Progress') {
      setStatus('progress');
    } else if (project.status === 'Completed') {
      setStatus('completed');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const isCloseModal = (isClose) => {
    if (isClose) {
      handleCloseModal();
    }
  }
  return (
    <div className='m-4'>
      <Card sx={{ minWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              variant="contained" ref={anchorRef} aria-label="split button"
              aria-haspopup="menu"
              onClick={handleToggle}
              sx={{ color: grey[50] }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={project?.name}
          subheader="September 14, 2016"
        />
       
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          </Typography>
          <p >
            {project?.description}
          </p>
          <p className="small">
            Status: {project?.status}
          </p>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: grey[50] }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon sx={{ color: grey[50] }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: grey[50] }} />
          </ExpandMore>
        </CardActions>
      </Card>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <EditProjectForm isCloseModal={isCloseModal} project={{ id: project?.id, status: status, name: project?.name, description: project?.description }} />
        </Box>
      </Modal >
      <DeleteProject isModalDelete={isDelete} project={project} />

    </div>
  );
}
