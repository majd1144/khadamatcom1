import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { servicesCards } from "../data";
import ReactStars from "react-rating-stars-component";
import './WorkerProfile.css';
import person from "../asset/person.png";
import axios from 'axios';

const WorkerProfile = () => {
  const { id } = useParams();
  const workers = servicesCards.find((w) => w.id === parseInt(id));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  if (!user) {
    return <h2 className="text-center text-red-500 text-2xl">Loading User Data ...</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please provide a rating and a comment.");
      return;
    }
    await submitComment();
  };

  const submitComment = async () => {
    try {
      const response = await fetch('http://localhost:4000/reviews', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: user.id,
          comment: comment,
          rating: rating,
        }),
      });
      const dataComment = await response.json();
      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          reviews: Array.isArray(prevUser.reviews) ? [...prevUser.reviews, dataComment] : [dataComment],
        }));
        setComment("");
        setRating(0);
      } else {
        console.log("Something went wrong:", dataComment.message);
        alert(dataComment.message);
      }
    } catch (error) {
      console.error("Error: Error during comment", error);
    }
  };

  const handleGalleryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const newGallery = [...gallery, URL.createObjectURL(file)];
      setGallery(newGallery);
    }
  };

  const handleGalleryImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    await uploadGalleryImage();
  };

  const uploadGalleryImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert("Gallery image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (response.data.success) {
          setUser((prevUser) => ({
            ...prevUser,
            picture: response.data.filename,
          }));
          alert('Profile picture updated successfully!');
        } else {
          alert('Failed to update profile picture.');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        alert('Error updating profile picture.');
      }
    }
  };

  const nextImage = () => {
    if (currentIndex < gallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <div className="row">
        <div className="col-md-6 text-left containerForJob">
          <div className="flex items-center gap-4">
            <img
              src={user.picture ? `/Storage/userpicture/${user.picture}` : person}
              alt={user.name}
              className="Img img-fluid rounded-circle"
            />
            <div>
              <h2 className="text-xl font-bold mt-2">{user.name}</h2>
              <button
                className="text-blue-500 mt-2"
                onClick={() => document.getElementById('profileImageUpload').click()}
              >
                Change the picture
              </button>
              <input
                type="file"
                id="profileImageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfileImageChange}
              />
            </div>
          </div>

          <div className="mt-4 text-gray-700 text-sm">
            <p><span className="font-semibold">Username:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || "N/A"}</p>
            <p><span className="font-semibold">Joined On:</span> {user.joined_on || "N/A"}</p>
          </div>
        </div>

        <div className="col-md-6 mt-6 WorkPictures">
          <h3 className="text-lg font-semibold">User Gallery:</h3>
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
                    className="gallery-image w-full h-48 object-cover rounded-md"
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
      </div>

      <hr />

      <div className="container">
        <div className="comment-section">
          <div className="mb-4">
            {user ? (
              <form onSubmit={handleSubmit} className='comment-form'>
                <div className="d-flex gap-3">
                  <img
                    src={user.id === parseInt(id) ? (user.picture ? `/Storage/userpicture/${user.picture}` : person) : person}
                    alt="User Avatar" className="user-avatar"
                  />
                  <h4>{user.name}</h4>
                  <div className="flex-grow-1">
                    <textarea name='comment' className="form-control comment-input" rows="3" placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <ReactStars name="rating" count={5} value={rating} onChange={setRating} size={24} activeColor="#ffd700" />
                    <div className="mt-3 text-end">
                      <button className="btn btn-comment text-white" name='submit' type="submit" >Post Comment</button>
                    </div>
                  </div>
                </div>
              </form>
            ) : <div className="text-center"><h3>Not Logged In</h3></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
