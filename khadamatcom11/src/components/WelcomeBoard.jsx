export default function WelcomeBoard({ theme }) {
    const isLight = theme === 'light';
  
    return (
      <div
        className="container_welcome"
        style={{
          backgroundColor: isLight ? '#2673d0' : '#333', // لون خلفية ثابت لكل ثيم
          backgroundImage: isLight
            ? 'linear-gradient(to bottom right, #2673d0 , #cddef2)' // تدرج الألوان في الثيم الفاتح
            : 'linear-gradient(to bottom right, #3c3838,rgb(96, 88, 88))', // تدرج الألوان في الثيم المظلم
               width: '75%',
               margin: '0 auto',
               marginTop:'50px',
        }}
      >
        <h1>Scale your professional <br /> workforce with{" "}
          <span style={{ fontFamily: "'Playwrite IN', serif" }}>Freelancers</span>
        </h1>
        <br /><br /><br />
        <div className="search-bar_wel">
          <input type="text" placeholder="Search for any service..." />
          <button className="fa fa-search" type="submit"></button>
        </div>
  
    
      </div>
    );
  }

