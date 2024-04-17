import DetailedGigs from "./Components/DetailedGigs";
import UserRemarksForm from "./Components/UserRemarksForm";

export const GigOrder = () => {
    return (
        <div className='p-5'>
            <DetailedGigs />
            <UserRemarksForm />
        </div>
    );
}