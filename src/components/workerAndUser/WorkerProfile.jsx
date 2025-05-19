import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { servicesCards } from "../../data";
import ReactStars from "react-rating-stars-component";
import './WorkerProfile.css';
import person from "../../asset/person.png";
import axios from 'axios';

const WorkerProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [location,setLocation]=useState("");
  const workers = servicesCards.find((w) => w.id === parseInt(id));

  // Helper function to get user image or default
  const getUserImage = (picture) => {
    return picture ? `/Storage/userpicture/${picture}` : person;
  };

  // Get logged-in user
  useEffect(() => {
    console.log("user");
    
    axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Get worker data
  useEffect(() => {
    console.log("worker");
    

    axios.get(`http://localhost:4000/workers/${id}`)
      .then((res) => setWorker(res.data))
      .catch((err) => console.error("Error fetching worker:", err));
  }, [id]);

  // Get worker reviews
  useEffect(() => {
    console.log("reviews");
    
    axios.get(`http://localhost:4000/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);
  useEffect(() => {
    console.log("location");
    
    axios.get(`http://localhost:4000/location/${id}`)
      .then((res) => setLocation(res.data))
      .catch((err) => console.error("Error fetching location:", err));
  }, [id]);
  
  if (!worker) {
    return <h2 className="text-center text-red-500 text-2xl">Loading Worker Data...</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please provide a comment.");
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/reviews', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: user.id,
          workerid: id,
          comment: comment,
          rating: rating,
        }),
      });
      const dataComment = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert(dataComment.message);
      }
    } catch (error) {
      console.error("Error during comment submission:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <div className="row">

        {/* Worker Info */}
        <div className="col-md-6 text-left containerForJob">
          <img
            src={worker.image ? worker.image : person}
            alt={worker.title}
            className="Img img-fluid rounded-circle"
          />
          <h2 className=" h2 text-xl font-bold mt-2">{worker.name}</h2>
          <br/>
          <div className="mt-4 text-gray-700 text-sm">
            <p className='info-WU'><span className="font-semibold">Service:</span> {worker.servicecategory}</p>
            <p className='info-WU'><span className="font-semibold">Location:</span> {worker.location || "Not specified"}</p>
            <p className='info-WU'><span className="font-semibold">Rating:</span> {worker.rating || 0} ⭐</p>
            <p className='info-WU'><span className="font-semibold">Price:</span> {worker.fee} JD</p>
            <p className='info-WU'><span className="font-semibold">Availability:</span> {worker.availability || "8 a.m - 4 p.m"}</p>
          </div>
        </div>

        {/* Work Gallery */}
        <div className="col-md-6 mt-6 WorkPictures">
          <h2 className="text-lg font-semibold PforW">Work Gallery:</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {workers?.workImages && workers.workImages.length > 0 ? (
              workers.workImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Work ${index}`}
                  className="w-full h-32 object-cover rounded-md imgWJ"
                />
              ))
            ) : (
              <p className="text-gray-500">No work images available.</p>
            )}
          </div>
        </div>

      </div>

      <hr />

      {/* Comments Section */}
      <div className="container info-commint">
        <div className="comment-section">
          <div className="mb-4">
            {user ? (
              <form onSubmit={handleSubmit} className='comment-form'>
                <div className="d-flex gap-3">
                  <img src={getUserImage(user.picture)} alt="User Avatar" className="user-avatar" />
                  <h4>{user.name}</h4>
                  <div className="flex-grow-1">
                    <textarea
                      name='comment'
                      className="form-control comment-input"
                      rows="3"
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <ReactStars
                      name="rating"
                      count={5}
                      value={rating}
                      onChange={setRating}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <div className="mt-3 text-end">
                      <button className="btn btn-comment text-white" type="submit">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <h3 className="text-center">
                You have to login to review this worker!{" "}
                <Link to="/Login" className="text-center btn btn-outline-primary">Log in</Link>
              </h3>
            )}
          </div>

          {/* Reviews List */}
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
  {rev.rating
    ? "⭐".repeat(Math.round(rev.rating))
    : "No rating"}
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
    </div>
  );
};

export default WorkerProfile;
