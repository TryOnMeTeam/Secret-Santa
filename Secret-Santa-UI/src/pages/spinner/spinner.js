import React from "react";
import { useLoading } from "../../services/context/LoadingContext";
import { HashLoader } from "react-spinners";
import '../../pages/spinner/spinner.css'; // Custom CSS

const Spinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null; // Render nothing if not loading

  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        {/* Use ClimbingBoxLoader and customize it */}
        <div className="climbing-box-loader">
          <HashLoader color="#ff6f61" loading={isLoading} size={50} />
        </div>
      </div>
      <p className="spinner-text">Preparing your Secret Santa surprise...</p>
    </div>
  );
};

export default Spinner;
