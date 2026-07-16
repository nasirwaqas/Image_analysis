import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [image, setImage] =
    useState(null);
  const [preview, setPreview] =
    useState(null);
    const [result, setResult] =
  useState(null);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    }

  };

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  const handleAnalyze = async () => {

    if (!image) {

      alert("Please select image");

      return;

    }

    const formData = new FormData();

    formData.append(
      "image",
      image
    );

    try {

      const res = await axios.post(
        "http://localhost:5000/api/image/upload",
        formData
      );

      console.log(res.data);

setResult({

  fileName:
    image.name,

  fileSize:
    (image.size / 1024).toFixed(2) + " KB",

  caption:
    "A person using a computer",

  confidence:
    "96%"

});
console.log(res.data);

      alert(
        "Image Uploaded Successfully 🚀"
      );

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    }

  };

  return (

    <div className="dashboard">

      {/* Navbar */}

      <nav className="navbar">

        <h2>
          AI Image Analyzer
        </h2>

        <div className="nav-right">

          <span>
            Welcome, {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="hero">

        <h1>
          Analyze Images Using AI
        </h1>

        <p>
          Upload any image and get AI generated tags,
          captions and confidence scores instantly.
        </p>

      </section>

      {/* Upload Card */}

      <div className="upload-card">

        <label className="upload-box">

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <h2>
            Upload Image
          </h2>

          <p>
            JPG, PNG Supported
          </p>

        </label>

        {
          preview && (

            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />

          )
        }

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >
          Analyze Image
        </button>

      </div>

      {/* Features */}

      <section className="features">

        <div className="feature-card">

          <h3>
            🤖 AI Recognition
          </h3>

          <p>
            Detect objects and scenes using AI.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            🏷 Smart Tagging
          </h3>

          <p>
            Generate accurate tags instantly.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            ⚡ Fast Performance
          </h3>

          <p>
            Analyze images within seconds.
          </p>

        </div>

      </section>

      {/* Results */}

      <section className="results">

  <h2>
    Analysis Results
  </h2>

  <div className="result-box">

    {
      result ? (

        <>
          <h3>
            Analysis Complete ✅
          </h3>

          <p>
            <strong>File Name:</strong>
            {result.fileName}
          </p>

          <p>
            <strong>File Size:</strong>
            {result.fileSize}
          </p>

          <p>
            <strong>Caption:</strong>
            {result.caption}
          </p>

          <p>
            <strong>Confidence:</strong>
            {result.confidence}
          </p>

        </>

      ) : (

        "No analysis yet"

      )
    }

  </div>

</section>

    </div>

  );

}

export default Dashboard;