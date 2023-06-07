import React,{useState,useContext, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";


const ReadMe = () => {

	const { changeBackground, background } = useContext(ThemeContext);
	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });

	}, []);

	return(
		<>
			<div className="row">
				<div className="row">
					<div className="col-xl-12">
						<div className="row">

<div className="col-xl-12 col-xxl-6 col-lg-6">

  <div className="card">

	<div className="card-header border-1 pb-4">
	  <h4 className="card-title">Instructions</h4>
	</div>

	<div className="card-body">
	  <PerfectScrollbar
		style={{ height: "auto" }}
		id="DZ_W_TimeLine"
		className="widget-timeline dz-scroll height370 ps ps--active-y"
	  >
		<ul className="timeline">
		  <li>
			<div className="timeline-badge primary"></div>
			<Link
			  className="timeline-panel text-muted"
			  to="/widget-basic"
			>
			  <strong className="text-primary fs-28">Some thing</strong>.

			  <p className="mb-4 mt-4 text-dark">
			  Something  
			
</p>

<p className="m-4">
Something
</p>
<p className="text-dark">
Something
			  </p>
			</Link>
		  </li>
		</ul>
	  </PerfectScrollbar>
	</div>
  </div>
</div>
</div>


					</div>
				</div>
			</div>	
		</>
	)
}
export default ReadMe;