import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div>
        <Navbar/>
        <div className="container">
			<h1 className="text-center">About Us</h1>
			<hr/>
			<p className="text-center">Resumatch is a job finder web app built with React. Our mission is to connect job seekers with their dream jobs and help employers find the best talent for their organizations.</p>
			<div className="row">
				<div className="col-md-6">
					<h2>Our Team</h2>
					<p>We are a team of experienced developers and designers who are passionate about creating innovative solutions to help people achieve their career goals.</p>
				</div>
				<div className="col-md-6">
					<h2>Contact Us</h2>
					<p>If you have any questions or feedback, feel free to contact us at:</p>
					<ul>
						<li>Email: info@resumatch.com</li>
						<li>Phone: +977 014244348</li>
						<li>New Baneshwor, Kathmandu Nepal</li>
					</ul>
				</div>
			</div>
		</div>
    </div>
  )
}

export default About