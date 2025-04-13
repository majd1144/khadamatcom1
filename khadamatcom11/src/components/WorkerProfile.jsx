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
  const workers = servicesCards.find((w) => w.id === parseInt(id));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  
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
const [worker, setWorker] = useState(null);
useEffect(() => {
  axios.get(`http://localhost:4000/workers/${id}`)
    .then((res) => {
      setWorker(res.data);   // not setWorker
    })
    .catch((err) => {
      console.error("Error fetching worker:", err);
    });
}, [id]);

const [reviews, setReviews] = useState("");
useEffect(() => {
  axios.get(`http://localhost:4000/reviews/${id}`)
    .then((res) => {
      setReviews(res.data);   // not setWorker
    })
    .catch((err) => {
      console.error("Error fetching worker:", err);
    });
}, [id]);



  if (!worker) {
    return <h2 className="text-center text-red-500 text-2xl">Loading Workers Data ...</h2>;
  }
  const handleSubmit = async (e) => {
    if (!comment.trim()) {
      alert("Please provide a rating and a comment.");
      return;
    }

    try {
      
      const response = await fetch('http://localhost:4000/reviews', {
        method: "POST",
        //credentials: "include", 
        headers: {
          'Content-Type': 'application/json',
        },
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
      } else if (response.status(400)){
        alert(response.message);
      }else {
        console.log("Somthing Went Wrong:", dataComment.message);
        alert(dataComment.message);
      }
    } catch (error) {
      console.error("Error: Error during comment", error);
    }

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <div className="row">
        {/* Worker Info */}
        <div className="col-md-6 text-left containerForJob">
          <img
            src={worker.image || person}
            alt={worker.title}
            className="Img img-fluid rounded-circle"
          />
          <h2 className="text-xl font-bold mt-2">{worker.name}</h2>
          <div className="mt-4 text-gray-700 text-sm">
            <p><span className="font-semibold">Service:</span> {worker.servicecategory}</p>
            <p><span className="font-semibold">Rating:</span> {worker.rating || 0} ⭐</p>
            <p><span className="font-semibold">Price:</span> {worker.fee} JD</p>
            <p><span className="font-semibold">Availability:</span> {worker.availability || "8 a.m - 4 p.m"}</p>
          </div>
        </div>

        {/* Work Gallery */}
        <div className="col-md-6 mt-6 WorkPictures">
          <h3 className="text-lg font-semibold">Work Gallery:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {workers.workImages && workers.workImages.length > 0 ? (
              workers.workImages.map((img, index) => (
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
                <form onSubmit={handleSubmit} className='comment-form'>
                <div className="d-flex gap-3">
                  <img src={`/Storage/userpicture/${user.picture}` || person} alt="User Avatar" className="user-avatar" />
                  <h4>{user.name}</h4>
                  <div className="flex-grow-1">
                    <textarea name='comment' className="form-control comment-input" rows="3" placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <ReactStars name="raiting" count={5} value={rating} onChange={setRating} size={24} activeColor="#ffd700" />
                    <div className="mt-3 text-end">
                      <button className="btn btn-comment text-white" name='submit' type="submit" >Post Comment</button>
                    </div>
                  </div>
                </div>
                </form>

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
                  <img src={"/Storage/userpicture/" + rev.picture} alt="User Avatar" className="user-avatar" />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{rev.firstname +" "+ rev.lastname}</h6>
                      <span className="comment-time">{rev.createdat}</span>
                    </div>
                    <p className="mb-2">{rev.comment}</p>
                    <p className="mb-2">Rating: {rev.rating} ⭐</p>
                    <div className="comment-actions">
                      <a href="#link"><i className="bi bi-heart"></i> Like</a>
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