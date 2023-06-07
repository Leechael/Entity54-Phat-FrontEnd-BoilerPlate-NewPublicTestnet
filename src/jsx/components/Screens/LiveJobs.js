import React,{Fragment,useContext, useState, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";

import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { } from "../../../Setup";
 


// const CoinChart = loadable(() =>
//   pMinDelay(import("../Boltz/MyWallet/CoinChart"), 1000)
// );

const LiveJobs = ({ phala_api,  blockHeader }) => {
	const { background } = useContext(ThemeContext);
	const [openJobsArray, setOpenJobsArray] = useState([]);
	

	

	




	useEffect(() => {
		const getSnapShot = async () => {
			if (blockHeader && blockHeader.number && ((Number(blockHeader.number)%2) ===0) )
			{
				console.log(`updating Live jobs at Block Number: ${blockHeader.number}`);
			}
		}
		getSnapShot();
	},[blockHeader])

	useEffect(() => {
		if (phala_api) 
		{
		}
	},[phala_api]) 


	return(
		<Fragment>
			<div className="row">
			<Col lg={12}>
				<Card className="bg-gradient-1 mb-1">
					<Card.Header>
					<p className="fs-24 mb-0" style={{color:"#AEAEAE"}}>Pending Jobs</p>
					</Card.Header>
					<Card.Body className="fs-24 text-center">
					<Table responsive bordered className="verticle-middle table-hover"style={{border:"solid"}}>
						<thead>
						<tr className="text-center" style={{border:"solid"}}>
							<th scope="col" style={{color:"#AEAEAE"}}>Id</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Request</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Type</th>
							<th scope="col" style={{color:"#AEAEAE"}}>First Payment Date</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Token</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Denominated In USD</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Total Amount</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payee</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Progress</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Status</th>
						</tr>
						</thead>
						<tbody className="fs-16">

						{openJobsArray.map((data,index)=>(	
							<tr  key={index} >
								<td>{data.id}</td>
								<td>{data.title}</td>
								<td>{data.paymentType}</td>
								<td>{data.first_payment_date}</td>
								<td>{data.paymentToken}</td>

								<td>{data.denomnatedinUSD? "Yes" : "No"}</td>
								<td>{data.amount}</td>
								<td>{data.payee}</td>
								<td>
								<ProgressBar now={0} variant="warning" />
								</td>
								<td>
								<Badge variant="warning light">0%</Badge>
								</td>
							</tr>
						))}
						</tbody>
					</Table>
					</Card.Body>
				</Card>
        	</Col>
		</div>

		<div className="row">
			<Col lg={12}>
				<Card className="bg-gradient-1 mb-1">
					<Card.Header>
					<p className="fs-24 mb-0" style={{color:"#AEAEAE"}}>Live Jobs</p>
					</Card.Header>
					<Card.Body>
					<Table responsive bordered className="verticle-middle table-hover"style={{border:"solid"}}>
						<thead>
						<tr className="text-center" style={{border:"solid"}}>
							<th scope="col" style={{color:"#AEAEAE"}}>Id</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Request</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Type</th>
							<th scope="col" style={{color:"#AEAEAE"}}>First Payment Date</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Token</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Denominated In USD</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Total Amount</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payee</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Progress</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Status</th>
						</tr>
						</thead>
						<tbody className="fs-16 text-center">

						{/* {pendingJobsArray.map((data,index)=>(	
							<tr  key={index} >
								<td>{data.id}</td>
								<td>{data.title}</td>
								<td>{data.paymentType}</td>
								<td>{data.first_payment_date}</td>
								<td>{data.paymentToken}</td>

								<td>{data.denomnatedinUSD? "Yes" : "No"}</td>
								<td>{data.amount}</td>
								<td>{data.payee}</td>
								<td>
								<ProgressBar now={data.progress} variant="warning" />
								</td>
								<td>
								<Badge variant="warning light">{data.progress}%</Badge>
								</td>
							</tr>
						))} */}
						</tbody>
						</Table>
					</Card.Body>
				</Card>
        	</Col>
		</div>

		<div className="row">
			<Col lg={12}>
				<Card className="bg-gradient-1 mb-1">
					<Card.Header>
					<p className="fs-24 mb-0" style={{color:"#AEAEAE"}}>Completed Jobs</p>
					</Card.Header>
					<Card.Body>
					<Table responsive bordered className="verticle-middle table-hover"style={{border:"solid"}}>
						<thead>
						<tr className="text-center" style={{border:"solid"}}>
							<th scope="col" style={{color:"#AEAEAE"}}>Id</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Request</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Type</th>
							<th scope="col" style={{color:"#AEAEAE"}}>First Payment Date</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payment Token</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Denominated In USD</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Total Amount</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Payee</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Progress</th>
							<th scope="col" style={{color:"#AEAEAE"}}>Status</th>
						</tr>
						</thead>
						<tbody className="fs-16 text-center">

						{/* {completedJobsArray.map((data,index)=>(	
							<tr  key={index} >
								<td>{data.id}</td>
								<td>{data.title}</td>
								<td>{data.paymentType}</td>
								<td>{data.first_payment_date}</td>
								<td>{data.paymentToken}</td>

								<td>{data.denomnatedinUSD? "Yes" : "No"}</td>
								<td>{data.amount}</td>
								<td>{data.payee}</td>
								<td>
								<ProgressBar now={data.progress} variant="warning" />
								</td>
								<td>
								<Badge variant="warning light">{data.progress}%</Badge>
								</td>
							</tr>
						))} */}
						</tbody>
						</Table>
					</Card.Body>
				</Card>
        	</Col>
		</div>



		</Fragment>
	)

}		
export default LiveJobs;