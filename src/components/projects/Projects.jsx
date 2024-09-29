import React from 'react'
import { GET_PROJECTS } from '../../queries/projectQueries';
import ProjectCard from './ProjectCard';
import { useQuery } from '@apollo/client';
import AddProjectModal from './AddProjectModal';
import { FaSpinner } from 'react-icons/fa';

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return <FaSpinner/>;
    if (error) return <p>Somenting went wrong</p>;

    return <div >
            <AddProjectModal/>
            {data.projects.length > 0 ? (
                <div className={` rowCards`}> 
                    {data.projects.map((project) =>(  
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (<p>No projects</p>)}
        </div>;
    
}
