import React from 'react';
import './informations.css';
import pic1 from '../../asset/pic1.png'
import pic2 from '../../asset/pic2.png'
import pic3 from '../../asset/pic3.png'
import pic4 from '../../asset/pic4.png'

export default function InforMation(){
    return(
       <div className='container'>
         <p className ="info" >A whole world of freelance talent at your fingertips</p>

         <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic1} alt="" className='pic' /> </div> 
            <p >Over 700 categories</p>
            <p className='paragraph1'>Get results from skilled freelancers 
                from all over the world, for every task,
                 at any price point.</p>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic '> <img src={pic2} alt="" className='pic hand-pic' /> </div> 
            <p>Clear, transparent pricing</p>
            <p className='paragraph1'>Pay per project or by the hour (Pro).
            Payments only get released when you approve.</p>

            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic3} alt="" className='pic' /> </div> 
            <p>Quality work done faster</p>
            <p className='paragraph1'>Filter to find the right freelancers quickly and get great work delivered in no time, every time.</p>


            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic4} alt="" className='pic' /> </div> 
            <p>24/7 award-winning support</p>
            <p className='paragraph1'>Chat with our team to get your questions answered or resolve any issues with your orders.</p>
            </div>
        </div>
        
{/* about us  */}
    <section className="bg-light py-5 mt-5" id="about-us">
      <div className="container text-center">
        <h2 className="mb-3">About Us - Khadamatkom</h2>
        <p className="lead">
          Welcome to <strong>Khadamatkom</strong>, the platform that connects you with the best service providers across the kingdom!
        </p>
        <p>
          We help you find trusted professionals to meet your needs, whether you need private tutors, babysitters, maintenance technicians, wall painters, or any other home service.
        </p>

        <h4 className="mt-4">Why Choose Khadamatkom?</h4>
        <ul className="list-unstyled text-start mx-auto w-50 fs-5">
          <li>✔ <strong>Easy Search:</strong> Browse available services and book the right one in minutes.</li>
          <li>✔ <strong>Security & Reliability:</strong> We ensure that all service providers are verified and trustworthy.</li>
          <li>✔ <strong>Affordable Prices:</strong> High-quality services at competitive rates.</li>
          <li>✔ <strong>Continuous Support:</strong> Our team is always available to assist you and answer your inquiries.</li>
        </ul>

        <h4 className="mt-5">Our Vision</h4>
        <p>
          To be the leading platform providing reliable and convenient solutions for individuals and families seeking professional home services.
        </p>

        <h4 className="mt-4">Contact Us</h4>
        <p>📧 Email: info@khadamatkom.com</p>
        <p>📞 Phone: +962-7XXXXXXXX</p>
        <p>📍 Location: Amman, Jordan</p>
      </div>
    </section>
        </div>
    );
}