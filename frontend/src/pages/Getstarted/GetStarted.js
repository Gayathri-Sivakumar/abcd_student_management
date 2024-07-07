import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Getstarted from "../../assets/cover1.jpg";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="GetStartedinside">
      <div className="GetStarted">
        <div className="l">
          <div className="firstline">
            “Education is not the filling of a pail, but the lighting of a
            fire.”
            <div className="para">
              <div className="first">
                <p>Get into </p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "#ff1493",
                maxWidth: "50%",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: 50,
                marginTop: "3%",
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="r">
          <div className="get">
            <div>
              <img src={Getstarted} alt="logo" height={700} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
