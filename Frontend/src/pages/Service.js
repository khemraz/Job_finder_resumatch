import React from 'react'
import Navbar from '../components/Navbar'

const Service = () => {
  return (
    <div>
        <Navbar/>
        <div className="container">
			<h1 className="text-center">Our Services</h1>
			<hr/>
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title">Matched Job List</h2>
							<p className="card-text">Provides list of applied candidate with similarity index</p>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title">Similar Jobs</h2>
							<p className="card-text">Jobseeker can find job and also see similarity of job</p>
						</div>
					</div>
				</div>
				
			</div>
		</div>
    </div>
  )
}

export default Service