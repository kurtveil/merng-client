import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/clients/ClientInfo";

export default function Project() {
    const { id } =  useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, 
        { variables: { id } });
    if (loading) return <p>Loading</p>;
    if (error) return <p>Somenting went wrong</p>;
    
    return (
    <>
        {!loading && !error && (
            <div className=" w-75 card p-5 MuiTable-root">
                <Link to='/projects' className="btn btn-success btn-sm w-25 d-inline ms-auto">Back</Link>
                <h1>{data.project.name}</h1>
                <b>{data.project.description}</b>
                <h5 className="mt-3">Project Status</h5>
                <b className="lead">{data.project.status}</b>
                <ClientInfo client={data.project.client}/>
            </div>
        )}
    </>
  )
}
