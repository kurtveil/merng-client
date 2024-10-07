import * as React from 'react';
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

export default function DeleteProject({ project, isModalDelete }) {

  const [openProjectModal, setOpenProjectModal] = React.useState(false);
  const handleCloseProjectModal = () => setOpenProjectModal(false);
  const handleDeleteProject = async (project) => {
   try {
    await deleteProject({
      variables: { id: project.id },
      refetchQueries: [{ query: GET_PROJECTS }]
    })
   } catch (error) {
    console.error('Error deleting client:', error);
   }

   handleCloseProjectModal();
  }
  const [deleteProject] = useMutation(DELETE_PROJECT)

  

  return (
    <Modal
      open={isModalDelete}
      onClose={handleCloseProjectModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='text-center' sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Project {project.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Are you sure to want delete this project?
        </Typography>
        <div className='mt-2 pt-2'>

          <Button variant="contained" onClick={()=>handleDeleteProject(project)}> <FaTrash className="icon" />Delete</Button>
        </div>
      </Box>
    </Modal>
  )
}
