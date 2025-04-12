import React, { useEffect , useState} from 'react';
import { useParams } from "react-router-dom";
import { servicesCards } from "../data";
import ReactStars from "react-rating-stars-component";
import './WorkerProfile.css';
import { Link } from 'react-router-dom';
import person from "../asset/person.png";
import axios from 'axios';

const WorkerProfile = () => {
  const { id } = useParams();
  const worker = servicesCards.find((w) => w.id === parseInt(id));
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(worker?.reviews || []);

  
  // Retreive user data from backend server
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

// Retreive worker data from backend server
const [workerr, setWorkerr] = useState(null);
useEffect(() => {
  axios.get(`http://localhost:4000/workers/${id}`)
    .then((res) => {
      setWorkerr(res.data);   // not setWorkerr
    })
    .catch((err) => {
      console.error("Error fetching worker:", err);
    });
}, [id]);


  if (!workerr) {
    return <h2 className="text-center text-red-500 text-2xl">Loading Workers Data ...</h2>;
  }
  const handleSubmit = () => {
    if (!review.trim() || rating === 0) {
      alert("Please provide a rating and a comment.");
      return;
    }

    const newReview = { text: review, stars: rating };
    setReviews([...reviews, newReview]);
    setReview("");
    setRating(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <div className="row">
        {/* Worker Info */}
        <div className="col-md-6 text-left containerForJob">
          <img
            src={workerr.image || person}
            alt={workerr.title}
            className="Img img-fluid rounded-circle"
          />
          <h2 className="text-xl font-bold mt-2">{workerr.name}</h2>
          <div className="mt-4 text-gray-700 text-sm">
            <p><span className="font-semibold">Service:</span> {workerr.servicecategory}</p>
            <p><span className="font-semibold">Rating:</span> {workerr.rating || 0} ⭐</p>
            <p><span className="font-semibold">Price:</span> {workerr.fee} JD</p>
            <p><span className="font-semibold">Availability:</span> {workerr.availability || "8 a.m - 4 p.m"}</p>
          </div>
        </div>

        {/* Work Gallery */}
        <div className="col-md-6 mt-6 WorkPictures">
          <h3 className="text-lg font-semibold">Work Gallery:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {worker.workImages && worker.workImages.length > 0 ? (
              worker.workImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Work ${index}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))
            ) : (
              <p className="text-gray-500">No work images available.</p>
            )}
          </div>
        </div>
      </div>
      <hr/>

      {/* Comments Section */}
      <div className="container">
        <div className="comment-section">
          <div className="mb-4">
          {user? (
                <div className="d-flex gap-3">
                  <img src={`/Storage/userpicture/${user.picture}` || person} alt="User Avatar" className="user-avatar" />
                  <h4>{user.name}</h4>
                  <div className="flex-grow-1">
                    <textarea className="form-control comment-input" rows="3" placeholder="Write a comment..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                    <ReactStars count={5} value={rating} onChange={setRating} size={24} activeColor="#ffd700" />
                    <div className="mt-3 text-end">
                      <button className="btn btn-comment text-white" onClick={handleSubmit}>Post Comment</button>
                    </div>
                  </div>
                </div>
          ):(
            <h3 className="text-center">
              you have to login to review this worker!! 
              <Link to="/Login" className="text-center btn btn-outline-primary"> Log in</Link>
              
            </h3>
          )}

          </div>

          <div className="comments-list">
            {reviews.map((rev, index) => (
              <div key={index} className="comment-box">
                <div className="d-flex gap-3">
                  <img src={person} alt="User Avatar" className="user-avatar" />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">User {index + 1}</h6>
                      <span className="comment-time">Just now</span>
                    </div>
                    <p className="mb-2">{rev.text}</p>
                    <p className="mb-2">Rating: {rev.stars} ⭐</p>
                    <div className="comment-actions">
                      <a href="#"><i className="bi bi-heart"></i> Like</a>
                      {/*<a href="#"><i className="bi bi-reply"></i> Reply</a>
                      <a href="#"><i className="bi bi-share"></i> Share</a>*/}
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