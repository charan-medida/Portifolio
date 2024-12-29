import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
//import { userContext } from "../../UserContext";
import axios from "axios";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');

    const [project,setProject] = useState(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        const UniqueId = localStorage.getItem("UniqueId");
        if(UniqueId)
        {
            fetchUserDetails(UniqueId);
        }
        else
        {
            console.log("No UniqueId in localstorage");
        }
    },[]);

    const fetchUserDetails = async (UniqueId) => {

        try{
            const response = await axios.get(`http://localhost:5136/registration/get-user`, {
            params: { UniqueId }
        });
        setProject(response.data);
        }
        catch(error){
        console.error("Error fetching user details:", error);
        }
    }
    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"PROJECTS".split("")}
                        idx={15}
                    />
                </h1>
                {project ? (
                <>
                <span style={{ color: 'orange', fontWeight: 'bold', fontSize: '18px', marginLeft: '10%' }}>
                            {project.Project1h}
                        </span>
                    <p className="stylep1">
                        {project.Project1}
                    </p>
                    <span style={{ color: 'orange', fontWeight: 'bold', fontSize: '18px', marginLeft: '10%' }}>
                            {project.Project2h}
                        </span>
                    <p className="stylep1">
                        {project.Project2}
                    </p>
                    <br />
                    <span  style={{ color: 'orange', fontWeight: 'bold', fontSize: '18px', marginLeft: '10%' }}>
                            {project.Project3h}
                        </span>
                    <p className="stylep1">
                        
                        {project.Project3}
                    </p>
                    <br />
                    <span style={{ color: 'orange', fontWeight: 'bold', fontSize: '18px', marginLeft: '10%' }}>
                            {project.Project4h}
                        </span>
                    <p className="stylep1">
                        {project.Project4}
                    </p>
                </>
            ) : (
                <p>Loading user details...</p>
            )}
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;