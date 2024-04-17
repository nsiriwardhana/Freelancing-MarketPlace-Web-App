import { Link, useParams } from "react-router-dom";
import { AdminSideBar } from "../AdminSideBar";
import { VIewTiceketPage } from "./VIewTiceketPage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TicketResponseModel from "../../../../../Model/TicketResponseModel";
import { SpinnerLoading } from "../../../../../utils/SpinnerLoading";
import { SpecificTicketResponse } from "./SpecificTicketResponse";
import { AdminNavbar } from "../AdminNavbar";

export const RespondToTicekt = () => {

    const { ticketId } = useParams<{ ticketId: string }>();
    const [tresponses, setTresponses] = useState<TicketResponseModel[]>([]);
    const [error, setError] = useState(null);
    const [isloading, setIsloading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [ticket, setTicket] = useState<any>({
        id: "",
        relatedTo: "",
        user: {
            userId: "",
            userName: ""
        },
        createdTime: "",
        updatedTime: "",
        status: "",
        description: "",
        subject: ""
    });

    const [formData, setFormData] = useState({
        response: "",
        ticket: {
            id: ""
        },
        subject: ""
    });

    const formRef = useRef<HTMLFormElement>(null);
    let responseTiceket;
    let responseTiceketResponses;


    //to get data and set the state
    useEffect(() => {
        const fetchData = async () => {
            try {
                responseTiceket = (await axios.get(`http://localhost:8082/ticket/findticketbyid?id=${ticketId}`)).data;
                responseTiceketResponses = (await axios.get(`http://localhost:8082/ticketresponse/findresponsebytid?id=${ticketId}`)).data;
            } catch (error) {
                throw new Error("Error in fetching data");
            }

            console.log(responseTiceket);
            console.log(responseTiceketResponses);

            const loadedticket = {
                id: responseTiceket.id,
                relatedTo: responseTiceket.relatedTo,
                user: {
                    userId: responseTiceket.user.userId,
                    userName: responseTiceket.user.userName
                },
                createdTime: responseTiceket.createdTime,
                updatedTime: responseTiceket.updatedTime,
                status: responseTiceket.status,
                description: responseTiceket.description,
                subject: responseTiceket.subject
            };

            const loadedResponses: TicketResponseModel[] = [];
            for (const element in responseTiceketResponses) {
                loadedResponses.push(
                    new TicketResponseModel(
                        responseTiceketResponses[element].id,
                        responseTiceketResponses[element].response,
                        responseTiceketResponses[element].createdTime,
                        responseTiceketResponses[element].subject,
                        {
                            ticketId: responseTiceketResponses[element].ticket.id,
                            relatedTo: responseTiceketResponses[element].ticket.relatedTo,
                            createdTime: responseTiceketResponses[element].ticket.createdTime,
                            updatedTime: responseTiceketResponses[element].ticket.updatedTime,
                            status: responseTiceketResponses[element].ticket.status,
                            ticektdescription: responseTiceketResponses[element].ticket.ticektdescription,
                            subject: responseTiceketResponses[element].ticket.subject,
                            user: {
                                userId: responseTiceketResponses[element].ticket.user.userId,
                                userName: responseTiceketResponses[element].ticket.user.userName
                            }
                        }
                    )
                );
            }

            setTresponses(loadedResponses);
            console.log("responses loaded");
            setTicket(loadedticket);
            console.log("ticket loaded");


            setIsloading(false);
        };

        fetchData().catch(
            (error) => {
                setError(error.message)
            }
        )

    }, [formData, updated]);


    //to adjust the margin of the div accirding to the height of the form
    useEffect(() => {
        const adjustMargin = () => {
            const formHeight = document.getElementById('response-form')?.clientHeight;
            const element = document.getElementById('before-content');

            if (document.getElementById('response-form-div')?.style.visibility === 'hidden') {
                if (element) {
                    element.style.marginBottom = `0px`;
                }
            } else if (element) {
                if (formHeight) {
                    element.style.marginBottom = `${formHeight + 10}px`;
                }
            }
        };
        adjustMargin();
        console.log("adjusting margin");

        window.addEventListener('resize', adjustMargin);

        return () => {
            window.removeEventListener('resize', adjustMargin);
        };

    }, [showForm])



    if (isloading) {
        return (
            <SpinnerLoading />
        );
    }
    if (error) {
        return (
            <div className="container m-5">
                <p>{error}</p>
            </div>
        );
    }

    const hendleShowForm = async () => {
        setShowForm((prev) => !prev);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            response: "",
            ticket: {
                id: ticketId
            },
            subject: ticket.subject
        }
        )
        setFormData(prevState => ({ ...prevState, [name]: value }));
        console.log(e.target.value);
    };



    console.log(formData);


    const handlesubmt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8082/ticketresponse/addticketresponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("response posted successfully");
                setFormData({
                    response: "",
                    ticket: {
                        id: ""
                    },
                    subject: ""
                    // imageLink: "",
                });
                (document.getElementById('responsetextarea') as HTMLTextAreaElement).value = "";
                formRef.current?.reset();

            } else {
                alert("Failed to post notice. Please try again");
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container-fluid  below-navbar-admin" style={{ width: "90vw", height: "fit-content", backgroundColor: "rgba(192, 187, 201, 30%)" }} >
            <AdminNavbar />
            <div className="row" style={{ padding: "0", margin: "0", minHeight: "fit-content" }}>

                <div className="col p-0" style={{ width: "100vw" }}>
                    <div className="row justify-content-center" id="before-content" style={{ minHeight: "fit-content", paddingBottom: "25px" }} >
                        <div className="col-9">

                            <Link to={"/admin/ticketrespond"}>
                                <button className="btn btn-primary m-3 d-flex align-items-center justify-content-center" style={{ height: "50px", maxWidth: "fit-content", borderRadius: "20px", left: "0" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle-fill me-2" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                    </svg>
                                    Back to all tickets
                                </button>
                            </Link>
                            <hr />


                            <div className="mt-3 ms-5 ">

                                <h1>Ticket ID: {ticket.id} </h1>
                                <h3>Subject : {ticket.subject}</h3>
                                <p>Ticket raised on : {ticket.createdTime}</p>

                            </div>
                            <hr />
                            <div className="card  mx-auto mt-5" style={{ width: "80%", borderRadius: "20px" }}>
                                <div className="card-body">
                                    {/* Add your details here */}

                                    <p className="card-text">{ticket.description}</p>
                                </div>
                            </div>

                            {tresponses.map((element, index) => (

                                <SpecificTicketResponse element={element} key={index} index={index}
                                    onDelete={(id: number) => {
                                        setUpdated((prev) => !prev);
                                    }}
                                />

                            ))}


                        </div>
                        <div className="col-3 align-items-center" style={{ borderLeftColor: "red", borderLeftWidth: "2px", borderLeftStyle: "solid" }}>


                            <div className="card  mx-auto mt-5 " style={{ width: "80%", borderRadius: "20px" }}>
                                <div className="card-body">
                                    {/* Add your details here */}
                                    <div className="d-flex align-items-center">
                                        <span className="me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 19">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                            </svg>
                                        </span>
                                        <span className="me-2">Status :</span>
                                        <h5>
                                            {ticket.status.toLowerCase() === "pending" ? (
                                                <span className="ticketStatuspending">
                                                    {ticket.status.toUpperCase()}
                                                </span>
                                            ) : (
                                                <span className="ticketStatuscomplete">
                                                    {ticket.status.toUpperCase()}
                                                </span>
                                            )}
                                        </h5>
                                    </div>




                                </div>
                            </div>


                            <div className="card  mx-auto mt-5" style={{ width: "80%", borderRadius: "20px" }}>
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                                        </svg>
                                        <h4 className="card-title mb-0">Attachments :</h4>
                                    </div>
                                </div>
                            </div>


                            <div className="card  mx-auto mt-5" style={{ width: "80%", borderRadius: "20px" }}>
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>
                                        <h4 className="card-title mb-0">User Details:</h4>
                                    </div>
                                    <hr />
                                    <h5>
                                        User ID: {ticket.user.userId} <br />
                                        <hr />
                                        User Name: {ticket.user.userName}
                                        <hr />
                                        Relate to: {ticket.relatedTo}
                                    </h5>

                                </div>
                            </div>

                            <div className="card  mx-auto mt-5" style={{ width: "80%", borderRadius: "20px" }}>
                                <div className="card-body">
                                    <button className="btn btn-primary m-1  d-flex align-items-center justify-content-center" style={{ width: "100%", textAlign: "center" }} title="download report">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-download me-2" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg>
                                        download

                                    </button>
                                    <button className="btn btn-success m-1 d-flex align-items-center justify-content-center" style={{ width: "100%", textAlign: "center" }} onClick={hendleShowForm} title="respond to ticekt">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-input-cursor-text me-2" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2" />
                                            <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
                                        </svg>
                                        {showForm === true ? "Hide Response Form" : "Respond"}
                                    </button>


                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="row justify-content-center fix-bottom rounded mt-5" id="response-form-div" style={{ backgroundColor: "purple", position: "fixed", bottom: "0", left: "0", width: "100vw", visibility: showForm ? 'visible' : 'hidden' }}>
                        <form className="d-flex pt-2 pb-2 ps-5 pe-5" onSubmit={handlesubmt} id="response-form">
                            <textarea className="form-control me-2" id="responsetextarea" placeholder="Write response" rows={3} name="response" aria-label="Search" onChange={handleChange}></textarea>
                            <button className="btn btn-success" type="submit">Submit</button>
                        </form>
                    </div>
                </div>



            </div>
        </div>
    );
}