import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import PublicNoticesModel from "../../../../Model/publicNoticesModel";
import { AdminSideBar } from "./AdminSideBar";
import { useEffect, useRef, useState } from "react";
import { SpinnerLoading } from "../../../../utils/SpinnerLoading";
import axios from "axios";
import React from "react";
import { AdminNavbar } from "./AdminNavbar";

export const EditNoticeForm = () => {
    const { noticeId } = useParams<{ noticeId: string }>();
    const [data, setData] = useState<PublicNoticesModel | null>(null);
    const [error, setError] = useState(null);
    const [isloading, setIsloading] = useState(true);
    const [audience, setAudience] = useState<string>("");
    const history = useHistory();
    let response;


    const [formData, setFormData] = useState({
        id: noticeId,
        title: "",
        audience: "",
        description: "",
        moreDetailsLink: "",
        imagelink: ""
    });

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                response = await axios.get(`http://localhost:8082/notices/findnotice/${noticeId}`);
            } catch (error) {
                throw new Error("Error in fetching data");
            }

            const responsedata = response.data;
            console.log(responsedata);
            setAudience(responsedata.audience);
            setData(responsedata);
            setIsloading(false);
            setFormData({
                id: responsedata.id,
                title: responsedata.title,
                audience: responsedata.audience,
                description: responsedata.description,
                moreDetailsLink: responsedata.moreDetailsLink,
                imagelink: responsedata.imagelink

            })
        };

        fetchData().catch(
            (error) => {
                setError(error.message)
            }
        )
    }, []);

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

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let sanitizedInput: string = "";
        if (/[^a-zA-Z0-9\s]/.test(e.target.value)) {
             sanitizedInput = e.target.value.replace(/[^\w\s]/g, '');
        }else{
            sanitizedInput = "ok";
        }
        
        if(sanitizedInput!==""){
            setFormData(prevState => ({ ...prevState, [name]: value }));
            console.log(formData);
        }

       
    };

    const handlesubmt = async (e: React.FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        if(formData.title!=="" || formData.audience!=="" || formData.description!==""){
            try {
                const response = await fetch(`http://localhost:8082/notices/updatenotice/${noticeId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert("Notice updated successfully");
                    setFormData({
                        id: "",
                        title: "",
                        audience: "",
                        description: "",
                        moreDetailsLink: "",
                        imagelink: ""
                    });
    
                    formRef.current?.reset();
                    history.push("/admin/editnotice");
    
    
                } else {
                    alert("Failed to update notice. Please try again");
                }
            } catch (err) {
                console.log(err);
            }
        }else{
            alert("Please fill all the fields");
        }
        
    }




    return (
        <div className=" below-navbar-admin align-items-center" style={{ height: "100vh" }}>
            <AdminNavbar />

            <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
                <Link to={"/admin/editnotice"} className="position-absolute top-0 start-0 m-3">
                    <button className="btn main-color text-white fw-bolder">Back to All Notices</button>
                </Link>

                <h1 className="text-center">Edit Notice</h1>

                <form style={{ width: "40%" }} ref={formRef} onSubmit={handlesubmt}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className={`form-control ${formData?.title ? '' : 'is-invalid'}`} id="title" name="title" value={formData?.title} required onChange={handleChange} />
                        <div className="invalid-feedback" >
                            Please provide a Title.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="audience" className="form-label">Audience</label>
                        <select className={`form-select ${formData?.audience ? '' : 'is-invalid'}`} name="audience" id="audience" aria-label="Related To" value={formData?.audience} required onChange={handleChange}>
                        <option selected disabled value="">select audience</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="client">Client</option>
                            <option value="all">All</option>
                        </select>
                        <div className="invalid-feedback">
                            select a audience
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description(must start with alphanumaric character or whitespace)</label>
                        <textarea className={`form-control ${formData?.description ? '' : 'is-invalid'}`} id="description" value={formData?.description} name="description" rows={12} onChange={handleChange} required></textarea>
                        <div className="invalid-feedback">
                            Please provide description.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moreDetailsLink" className="form-label">More Details Link</label>
                        <input type="text" className="form-control" value={formData?.moreDetailsLink} id="moreDetailsLink" name="moreDetailsLink" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moreDetailsLink" className="form-label">Image link</label>
                        <input type="text" className="form-control" value={formData?.imagelink} id="imagelink" name="imagelink" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    );
}