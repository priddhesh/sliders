import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";

function Slider() {
  const [features, setFeatures] = useState([]); // Initialize as an empty array
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`http://localhost:5000/features`);
        response = await response.json();
        setFeatures(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const slider = document.querySelector(".slider");
    const activate = (e) => {
      const items = document.querySelectorAll(".item");
      if (e.target.className == "btn prev md") {
        slider.append(items[0]);
      } else if (e.target.className == "btn next md") {
        slider.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener("click", activate, false);
    return () => {
      document.removeEventListener("click", activate, false);
    };
  }, []);

  return (
    <main>
      <div className="slider">
        {features.length === 0 ? (
          <p style={{color:"white"}}>No data available</p>
        ) : (
          features.map((feature, index) => (
            <div className="item" key={index}>
              {" "}
              <img src={feature.imgID} loading="eager" alt="" />
              <div className="content">
                <h2 className="title">{feature.title}</h2>{" "}
                <p className="description">{feature.description}</p>
                <button>Read More</button>
              </div>
            </div>
          ))
        )}
      </div>
      <nav className="nav">
        <IonIcon className="btn prev" icon={arrowBackOutline} />
        <IonIcon className="btn next" icon={arrowForwardOutline} />
      </nav>
    </main>
  );
}

export default Slider;
