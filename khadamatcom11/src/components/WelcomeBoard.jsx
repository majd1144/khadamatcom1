export default function WelcomeBoard() {
  return (
      <div className="welcome-board">
          <video className="background-video" autoPlay loop muted>
              <source src="your Services.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          <div className="content">
              <h1>Welcome to Our Website!</h1>
              <p>We are glad to have you here.</p>
          </div>
      </div>
  );
}
