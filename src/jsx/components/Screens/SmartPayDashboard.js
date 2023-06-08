import React,{Fragment,useContext, useState, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";
 
import { set_my_number, set_my_message, get_my_number, get_my_message } from "../../../Setup";


const SmartPay = ({ phala_api, blockHeader }) => {
	const { background } = useContext(ThemeContext);
	const [phat_Message, setPhat_Message] = useState("");
	const [phatValue, setPhatValue] = useState("");

	const [smartPay_button_active, setSmartPay_button_active] = useState(true);
	const [pallet_balance, setPallet_balance] = useState("");
	const [overallLiabilities, setOverallLiabilities] = useState([]);
	const [twoDaysLiabilities, setTwoDaysLiabilities] = useState([]);
	const [sevenDaysLiabilities, setSevenDaysLiabilities] = useState([]);
	const [thirtyDaysLiabilities, setThirtyDaysLiabilities] = useState([]);
	const [smartPay_notification_two_active, setSmartPay_notification_two_active] = useState(false);
	const [smartPay_notification_seven_active, setSmartPay_notification_seven_active] = useState(false);
	const [smartPay_notification_thirty_active, setSmartPay_notification_thrity_active] = useState(false);
	const [smartPay_notification_overall_active, setSmartPay_notification_overall_active] = useState(true);


	const readMyMessage = async () => {
		const response = await get_my_message();
		console.log(`A new PHAT readMyMessage: `,response.Ok);
		setPhat_Message(response.Ok);
	}
	const readMyNum = async () => {
		const response  = await get_my_number();
		console.log(`A new PHAT readMyNum: `,response.Ok);
		setPhat_Message(response.Ok);
	}


	const phala_setMyNymber = async () => {
				await set_my_number(phatValue);
				console.log(`A new phala_setMyNymber has been submitted with phatValue: ${phatValue}`);
	}
	const phala_setMyMessage = async () => {
		await set_my_message(phatValue);
		console.log(`A new phala_setMyMessage has been submitted with phatValue: ${phatValue}`);
	}

	useEffect(() => {
		const getSnapShot = async () => {
			if (blockHeader && blockHeader.number && ((Number(blockHeader.number)%2) ===0) )
			{
				console.log(`updating SmartPayDashboard at Block Number: ${blockHeader.number}`); 
				// await readMyMessage()
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
			<div className="row" style={{height:"auto"}}>
				<div className="col-xl-1 col-xxl-4"></div>



				<div className="col-xl-3 col-xxl-8">
					<div className="card"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-24 text-black">Some Information</h4>
						</div>
						<div className="card-body text-center fs-16" style={{height:"auto"}}>
							<div  className="bg-gradient-4 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >LIVE DOT PRICE</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {"price"} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-4 coin-holding" style={{height:"80px", marginBottom:"35px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >5 Day AVG DOT Price</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {"averagePrice"} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12 col-xxl-3" style={{backgroundColor:""}}>
							<div className="text-center">
								<h4 className="m-4 fs-24 text-black">Alert Information</h4>
							</div>
							</div>
							<div  className="bg-gradient-4 coin-holding text-center" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
									<div className="col-xl-7 col-xxl-3">
										<div className="mb-2">
											<div className="align-items-center">
												<div className="ms-3 pt-2">
													<p className="mb-0 op-6" >Level 1 Alert </p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
										<div className="mb-2" style={{backgroundColor:""}}> 
											<div className="align-items-center"  style={{backgroundColor:""}}>
												<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
													{/* <input type="text" disabled readOnly value = {`${liabilityThresholds[1]}%`} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} /> */}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div  className="bg-gradient-4 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
									<div className="col-xl-7 col-xxl-3">
										<div className="mb-2">
											<div className="align-items-center">
												<div className="ms-3 pt-2">
													<p className="mb-0 op-6" >Level 2 Alert </p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
										<div className="mb-2" style={{backgroundColor:""}}> 
											<div className="align-items-center"  style={{backgroundColor:""}}>
												<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
													{/* <input type="text" disabled readOnly value = {`${liabilityThresholds[0]}%`} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} /> */}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div  className="bg-gradient-4 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
									<div className="col-xl-7 col-xxl-3">
										<div className="mb-2">
											<div className="align-items-center">
												<div className="ms-3 pt-2">
													<p className="mb-0 op-6" >Top Up Level</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
										<div className="mb-2" style={{backgroundColor:""}}> 
											<div className="align-items-center"  style={{backgroundColor:""}}>
												<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
													{/* <input type="text" disabled readOnly value = {`${liabilityThresholds[2]}%`} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} /> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>


					</div>
				</div>



				<div className="col-xl-7 col-xxl-8">
					<div className="card"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-24 text-black">SmartPay Setup</h4>
						</div>
						<div className="card-body text-center fs-16" style={{height:"auto"}}>

							<div  className="bg-gradient-1 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3"style={{backgroundColor:""}}>
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Set Phat Values</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"90%"}}>
												<input type="text" value = {phatValue} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} 
													onChange={(event) => setPhatValue(event.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-3 px-3" style={{height:"", backgroundColor:`${!smartPay_button_active?"grey":"red"}`  }} //disabled={!smartPay_button_active} 
									//  onClick = { () => changeAdmin()}
									onClick = { () => phala_setMyMessage()}
									>
										SetMyMessage
									</button> 

								</div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-3 px-3" style={{height:"", backgroundColor:`${smartPay_button_active?"grey":"red"}`  }} 
									 onClick = { () => phala_setMyNymber()}
									>
										Phat SetMyNum
									</button> 

								</div>
								<div className="col-xl-2 col-xxl-3"></div>
							</div>


							<div  className="bg-gradient-1 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3"style={{backgroundColor:""}}>
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Read Phat Values</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"90%"}}>
												<input type="text" disabled readOnly value = {phat_Message} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-3 px-3" style={{height:"", backgroundColor:`${!smartPay_button_active?"grey":"red"}`  }} disabled={!smartPay_button_active} 
									 onClick = { () => readMyMessage()}
									>
										ReadMyMessage
									</button> 

								</div>
								<div className="col-xl-2 col-xxl-4">
									<button className="btn btn-dark py-3 px-3" style={{height:"", backgroundColor:`${!smartPay_button_active?"red":"grey"}` }} disabled={!smartPay_button_active}  
									 onClick = { () => {
										console.log(`Shoudl read my number`);
										readMyNum()
									 }}
									>
										Read MyNum
									</button> 
								</div>
								<div className="col-xl-1 col-xxl-3"></div>
							</div>

							<div  className="bg-gradient-1 coin-holding" style={{height:"80px", marginBottom:"15px", marginTop:"95px", backgroundColor:""}}>

							<div className="col-xl-2 col-xxl-3"></div>
							</div>
							<div  className="bg-gradient-4 coin-holding" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-2 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-3 pt-2">
												<p className="mb-0 op-6" >Treasury Balance (DOT)</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-2 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"80%"}}>
												<input type="text" disabled readOnly value = {pallet_balance} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-8 col-xxl-3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row" style={{height:"auto"}}>
				<div className="col-xl-2 col-xxl-4"></div>


				<div className="col-xl-2 col-xxl-8">
					<div className="card pb-0"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black">2-Day Liabilities</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >DOT Denominated Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {twoDaysLiabilities[0]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >FIAT Denominated DOT Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {twoDaysLiabilities[1]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >Total Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {twoDaysLiabilities[2]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"30px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >% Covered</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {twoDaysLiabilities[3]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>


							<div className="row">
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
								<div className="col-xl-10 col-xxl-4"style={{backgroundColor:""}}>
									<button className="btn btn-dark p-2" style={{height:"", width:"100%", height:"50px", backgroundColor:`${smartPay_notification_two_active?"red":"grey"}`  }}  
									// onClick = { () => enable2dayNotifications()}
									>
										Enable Notifications
									</button> 
								</div>
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-2 col-xxl-8" >
					<div className="card pb-0"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black">7-Day Liabilities</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >DOT Denominated Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {sevenDaysLiabilities[0]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >FIAT Denominated DOT Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {sevenDaysLiabilities[1]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >Total Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {sevenDaysLiabilities[2]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"30px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >% Covered</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {sevenDaysLiabilities[3]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
								<div className="col-xl-10 col-xxl-4"style={{backgroundColor:""}}>
									<button className="btn btn-dark p-2" style={{height:"", width:"100%", height:"50px", backgroundColor:`${smartPay_notification_seven_active?"red":"grey"}`  }} 
									// onClick = { () => enable7dayNotifications()}
									>
										Enable Notifications
									</button> 
								</div>
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-2 col-xxl-8">
					<div className="card pb-0"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black">30-Day Liabilities</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >DOT Denominated Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {thirtyDaysLiabilities[0]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >FIAT Denominated DOT Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {thirtyDaysLiabilities[1]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >Total Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {thirtyDaysLiabilities[2]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"30px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >% Covered</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {thirtyDaysLiabilities[3]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
								<div className="col-xl-10 col-xxl-4"style={{backgroundColor:""}}>
									<button className="btn btn-dark p-2" style={{height:"", width:"100%", height:"50px", backgroundColor:`${smartPay_notification_thirty_active?"red":"grey"}`  }} 
									// onClick = { () => enable30dayNotifications()}
									>
										Enable Notifications
									</button> 
								</div>
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-2 col-xxl-8">
					<div className="card pb-0"style={{backgroundColor:""}}>
						<div className="card-header border-0 text-center mx-auto pb-0">
							<h4 className="mb-0 fs-20 text-black">Total Liabilities</h4>
						</div>
						<div className="card-body" style={{height:"auto"}}>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >DOT Denominated Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {overallLiabilities[0]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >FIAT Denominated DOT Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {overallLiabilities[1]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"15px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >Total Payouts</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {overallLiabilities[2]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div  className="bg-gradient-3 coin-holding text-center px-1" style={{height:"80px", marginBottom:"30px", backgroundColor:""}}>
								<div className="col-xl-7 col-xxl-3">
									<div className="mb-2">
										<div className="align-items-center">
											<div className="ms-0 pt-2">
												<p className="mb-0 op-6" >% Covered</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-5 col-xxl-3"  style={{backgroundColor:""}}>
									<div className="mb-2" style={{backgroundColor:""}}> 
										<div className="align-items-center"  style={{backgroundColor:""}}>
											<div className="ms-0 pt-2" style={{backgroundColor:"", width:"100%"}}>
												<input type="text" disabled readOnly value = {overallLiabilities[3]} placeholder="" className="form-control fs-16" style={{color:"white",  textAlign:"center",  }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
								<div className="col-xl-10 col-xxl-4"style={{backgroundColor:""}}>
									<button className="btn btn-dark p-2" style={{height:"", width:"100%", height:"50px", backgroundColor:`${smartPay_notification_overall_active?"red":"grey"}`  }}  
									// onClick = { () => enableOverallNotifications()}
									>
										Enable  
									</button> 
								</div>
								<div className="col-xl-1 col-xxl-4"style={{backgroundColor:""}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}		
export default SmartPay;