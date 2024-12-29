
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { userContext } from "../../UserContext";
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [image, setImage] = useState(() => localStorage.getItem('uploadedImage') || null);
  const [nameString, setNameString] = useState("");
  const [Job, setJob] = useState("");
  const { setUserDetails } = useContext(userContext);
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

      
  //     reader.onload = () => {
        
  //       setImage(reader.result);
  //       localStorage.setItem('uploadedImage', reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const UniqueId = urlParams.get("data");
    localStorage.setItem("UniqueId", UniqueId);
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
    try {
        const response = await axios.get(`http://localhost:5136/registration/get-user`, {
            params: { UniqueId }
        });
        console.log("received data",response.data);
        setUserDetails(response.data);
        setNameString(response.data?.Name || "");
        setImage(response.data?.Image || null);
        setJob(response.data.Job ||"");
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};


  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100vh",
        paddingRight: "40px",
        marginTop: "-30px",
      }}
    >
      <div className="image-upload-container">
        <label style={{ cursor: "pointer" }}>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          /> */}
          <div
            className="upload-box"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="upload-preview"
              />
            ) : ( <FaRegCircleUser className="upload-preview" />)}
          </div>
        </label>

      
      </div>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <span> </span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameString.split('')}
              idx={15}
            />
            <br />
          </h1>
          <h2 style={{color:"white"}}>{Job}</h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
      </div>
        <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100vh",
          paddingRight: "80px",
          
        }}
      >
      </div>
    </div>
  );
};
export default Home

