import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import './WorkerProfile.css';
import person from "../../asset/person.png";
import axios from 'axios';

const WorkerProfile = () => {
  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
      const loggedUser = userResponse.data;
      setUser(loggedUser);

      if (loggedUser.role === "worker") {
        const workerResponse = await axios.get(`http://localhost:4000/workers/users/${loggedUser.id}`);
        const workerData = workerResponse.data;
        setWorker(workerData);

        const reviewsResponse = await axios.get(`http://localhost:4000/reviews/${workerData.id}`);
        setReviews(reviewsResponse.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please provide a rating and a comment.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/review/${worker.id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user.id, comment, rating }),
      });
      const dataComment = await response.json();
      if (response.ok) {
        setReviews(prev => [...prev, dataComment]);
        setComment("");
        setRating(0);
      } else {
        alert(dataComment.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const getUserImage = (picture) => picture ? `/Storage/userpicture/${picture}` : person;

  const handleGalleryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setGallery(prev => [...prev, URL.createObjectURL(file)]);
    }
  };

  const handleGalleryImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.success ? "Gallery image uploaded successfully!" : "Failed to upload image.");
    } catch (error) {
      alert("Error uploading image.");
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post('http://localhost:4000/uploadProfilePicture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(prev => ({ ...prev, picture: response.data.filename }));
          alert('Profile picture updated successfully!');
        } else {
          alert('Failed to update profile picture.');
        }
      } catch (error) {
        alert('Error updating profile picture.');
      }
    }
  };

  const nextImage = () => currentIndex < gallery.length - 1 && setCurrentIndex(currentIndex + 1);
  const prevImage = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  if (!user) {
    return <h2 className="text-center text-red-500 text-2xl">Loading User Data ...</h2>;
  }

  // Show loading if the user is a worker and the worker data hasn't been fetched yet
  if (user.role === "worker" && !worker) {
    return <h1 className="text-center text-yellow-500 text-2xl">Loading Worker Data ...</h1>;
  }

  return (
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <div className="row ">
        <div className="col-md-6 text-left containerForJob Profile">
          <div className="flex items-center gap-4">
            <img
              src={user.picture ? `/Storage/userpicture/${user.picture}` : person}
              alt={user.name}
              className="Img img-fluid rounded-circle"
            />
            <div>
              <h2 className="h2 text-xl font-bold mt-2 ">{user.name}</h2>
              <button className="text-500 mt-2 btn-img" onClick={() => document.getElementById('profileImageUpload').click()}>
                Change the picture
              </button>
              <input type="file" id="profileImageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleProfileImageChange} />
            </div>
          </div>
          <div className="mt-4 text-gray-700 text-sm ">
            <p className='info-WU'><strong >Username:</strong> {user.name}</p>
            <p className='info-WU'><strong>Email:</strong> {user.email}</p>
            <p className='info-WU'><strong>Phone:</strong> {user.phone || "N/A"}</p>
            {user.role === "worker" && worker && (
              <>
                <p className='info-WU'><strong>Service:</strong> {worker.servicecategory || "N/A"}</p>
                <p className='info-WU'><strong>Availability:</strong> 8:00 A.M- 3:00 P.M</p>
                <p className='info-WU'><strong>Rating:</strong> {worker.rating || 0} ⭐</p>
                <br/>
              </>
            )}
          </div>
        </div>
      

            {user.role === "worker" && (
        <>
        <div className="col-md-6 mt-6 WorkPictures">
            <h2 className="text-lg font-semibold PforW">Upload Work Photo:</h2>
             <div className="relative mt-4">
              <input
              type="file"
              id="imageUploadInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleGalleryImageChange}
            />
             <button
              onClick={() => document.getElementById('imageUploadInput').click()}
              className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
            >
            <i className="fa fa-upload"></i> upload Photo
            </button>
          </div>
          <br />
               {gallery.length > 0 && (
            <div className="mt-6">
              <div className="gallery-container">
                <div className="image-container">
                  <img
                    src={gallery[currentIndex]}
                    alt="Gallery"
                    className="gallery-image w-full h-48 object-cover rounded-md imgWJ"
                  />
                </div>

                {gallery.length > 1 && (
                  <div className="navigation-buttons">
                    <button onClick={prevImage} className="nav-btn">{"<"}</button>
                    <button onClick={nextImage} className="nav-btn">{">"}</button>
                  </div>
                )}
              </div>

              <div className="image-thumbnails mt-4">
                {gallery.slice(0, 6).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="thumbnail-image"
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
                
                </div>
                
              </div>
            )}
          </div>
          

      <div className="container info-commint">
          <hr/> 
        <div className="comment-section">
          <div className="mb-4">
            {user ? (
              <form onSubmit={handleSubmit} className='comment-form'>
                <div className="d-flex gap-3">
                  <img
                    src={user.id === parseInt(user.id) ? (user.picture ? `/Storage/userpicture/${user.picture}` : person) : person}
                    alt="User Avatar" className="user-avatar"
                  />
                  <h4>{user.name}</h4>
                  <div className="flex-grow-1">
                    <p className="text-gray-500 italic info-commint">You can't comment or rate yourself.</p>
                  </div>
                </div>
              </form>
            ) : <div className="text-center"><h3>Not Logged In</h3></div>}
          </div>
          <div className="comments-list">
            {reviews.map((rev, index) => (
              <div key={index} className="comment-box">
                <div className="d-flex gap-3">
                  <img src={getUserImage(rev.picture)} alt="User Avatar" className="user-avatar" />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{rev.firstname + " " + rev.lastname}</h6>
                      <span className="comment-time">{rev.createdat}</span>
                    </div>
                    <p className="mb-2">{rev.comment}</p>
                    <p>
                        <span className="font-semibold">Rating:</span>{" "}
                        {user.rating
                          ? "⭐".repeat(Math.round(user.rating))
                           : "No rating yet"}
                           </p>
                    <div className="comment-actions">
                      <a href="#like"><i className="bi bi-heart"></i> Like</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
    </div>
    </div>
    </div>

        </>
         )}
    </div>
    </div>
  );
};

export default WorkerProfile;
