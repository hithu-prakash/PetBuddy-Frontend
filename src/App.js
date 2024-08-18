import {Link, Routes, Route} from "react-router-dom"
import { useEffect } from "react";
import axios from "./config/axios";
import { useAuth } from "./context/authContext";
//User-Registeration
import Home from "./components/userRegistration/home";
import Register from "./components/userRegistration/register";
import OtpVerification from "./components/userRegistration/otpVerify";
import Login from "./components/userRegistration/login";
import Account from "./components/userRegistration/account";
import ForgetPassword from "./components/userRegistration/forgetpassword";
import ResetPassword from "./components/userRegistration/resetpassword";
//Care-Taker Creation
import CreateCareTaker from "./components/careTaker-Component/create-careTaker";
import CareTakerAVList from "./components/careTaker-Component/careTaker-AV-list";
import CareTakerDetails from "./components/careTaker-Component/careTaker-single";
import CareTakerSingleDetails from "./components/careTaker-Component/careTaker-one-params";
import UpdateCareTaker from "./components/careTaker-Component/careTaker-update";
import AllBookingCareTaker from "./components/careTaker-Component/all-booking";

//Pet-Parent Creation
import PetParentForm from "./components/petParent-Component/petParent-Form";
import PetParentList from "./components/petParent-Component/petParent-list-all";
import PetParentDetail from "./components/petParent-Component/petParent-Single";
import UpdatePetParent from "./components/petParent-Component/petParent-update";

//Pets Creation
import PetForm from "./components/pets-Component/pet-create";
import PetAccount from "./components/pets-Component/pet-singlepet";
import PetUpdate from "./components/pets-Component/pet-update";

//booking Creation
import BookingForm from "./components/booking-Component/booking-create";
import AllBooking from "./components/booking-Component/booking-history";
import BookingDetails from "./components/booking-Component/booking-details-id";

//payment Creation
import CreatePayment from "./components/payment-Component/payment-create";
import Success from "./components/payment-Component/success";
import Failure from "./components/payment-Component/failure";

//review creation
import CreateReview from "./components/review/createReview"
import ReviewList from "./components/review/allRevieww"
import SingleCaretakerReviews from "./components/review/singlereview-Id"
import UpdateReview from "./components/review/updateReview"
import SingleReviews from "./components/review/singlereview"

//import ReviewForm from "./components/review-Component/create-review";

//Admin Operations
import AdminHome from "./components/admin-Components/admin-home";
import CareTakerNVList from "./components/admin-Components/careTaker-NV-list";
import AdminCareTakerSingleDetails from "./components/admin-Components/admin-caretaker-single";

function App() {
  const {user,dispatch} = useAuth()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        const response = await axios.get('/user/account',{
          headers:{
            Authorization: localStorage.getItem('token')
          }
        })
        dispatch({type:'LOGIN',payload:{account:response.data}})
      })()
    }
  },[])
  
  return (
    <div >
      <h1>PetBuddy</h1>
      <Link to='/'>Home</Link>
      {!user.isLoggedIn ?(
        <>
        |<Link to='/register'>Register</Link>|
        <Link to='/login'>Login</Link>
        </>
      ):(
        <>
        |<Link to='/account'>Account</Link>
        {/* |<Link to='/create-caretaker'>Create-Caretaker</Link> */}
        {/* |<Link to='/create-petparent'>Create-PetParent</Link> */}
        |<Link to='/all-petparents'>All-PetParents</Link>
        |<Link to='/all-caretaker-v'>All-v-CareTaker</Link>
        |<Link to='/single-caretaker'>Profile-C</Link>
        |<Link to='/single-petparent'>Profile-P</Link>
        |<Link to='/single-pet'>Pets-Profile</Link>
        |<Link to='/all-review'>All-Review</Link>
        |<Link to='/' onClick={()=>{
          localStorage.removeItem('token')
          dispatch({type:'LOGOUT'})
        }}>Logout</Link>
        </>
      )}
      
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<OtpVerification/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/account" element={<Account/>}/>

        <Route path="/create-caretaker" element={<CreateCareTaker/>}/>
        <Route path="/all-caretaker-v" element={<CareTakerAVList/>}/>
        <Route path="/caretaker-params-one/:id" element={<CareTakerSingleDetails/>}/>
        <Route path="/single-caretaker" element={<CareTakerDetails/>}/>
        <Route path="/update-caretaker/:id" element={<UpdateCareTaker/>}/>
        <Route path="/all-booking-caretaker" element={<AllBookingCareTaker/>}/>
        

        <Route path="/create-petparent" element={<PetParentForm/>}/>
        <Route path="/all-petparents" element={<PetParentList/>}/>
        <Route path="/single-petparent" element={<PetParentDetail/>}/>
        <Route path="/update-petparent/:id" element={<UpdatePetParent/>}/>

        <Route path="/create-pet" element={<PetForm/>}/>
        <Route path="/single-pet" element={<PetAccount/>}/>
        <Route path="/update-pet/:id" element={<PetUpdate/>}/>

        <Route path="/create-booking/:id" element={<BookingForm/>}/>
        <Route path="/booking-history" element={<AllBooking/>}/>
        <Route path="/booking-details/:bookingId" element={<BookingDetails/>}/>

        <Route path="/payment/:bookingId" element={<CreatePayment/>} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

         <Route path="/create-review/:id" element={<CreateReview/>}/>
        <Route path="/single-careTaker-review/:caretakerId" element={<SingleReviews/>}/>
        <Route path="/update-review/:reviewId" element={<UpdateReview/>}/>
        <Route path="/all-review" element={<ReviewList/>}/>
        <Route path="/singleReview/:reviewId" element={<SingleCaretakerReviews />} /> 

        {/* <Route path="/create-review-form/:id" element={<ReviewForm/>}/> */}

         <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/admin-care-nv-list" element={<CareTakerNVList/>}/>
        <Route path="/admin-care-verify/:id" element={<AdminCareTakerSingleDetails/>}/>
  



      </Routes>
    </div>
  );
}

export default App;
