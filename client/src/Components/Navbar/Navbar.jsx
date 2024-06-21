import React, {useState} from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "./SearchBar/SearchBar";
import { RiVideoAddLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Auth from "../../Pages/Auth/Auth";
function Navbar({ toggleDrawer,setEditCreateChanelBtn }) {

  const [AuthBtn, setAuthBtn] = useState(false)
  const CurrentUser=useSelector(state=>state.currentUserReducer)

  // const CurrentUser = null;
  //   const CurrentUser = {
  //   result: {
  //     email: "abzxy50312@gmail.com",
  //     joinedOn: "2222-07-15T09:57:23.489Z",
  //   },
  // };
  console.log(CurrentUser)
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "218784884290-2agkbklhha7rr5s8dn43n20uso7dbf9o.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();
  // const logTmp=()=>{
  //   dispatch(login({ email:"abzxy50312@gmail.com" }));
  // }
  const onSuccess = (response) => {
    const Email = response?.profileObj.email;
    console.log(Email);
    dispatch(login({ email: Email }));
  };

  const onFailure = (response) => {
    console.log("Failed", response);
  };
  return (
    <>
    <div className="Container_Navbar">
      <div className="Burger_Logo_Navbar">
        <div className="burger" onClick={() => toggleDrawer()}>
          <p></p>
          <p></p>
          <p></p>
        </div>

        <Link to={"/"} className="logo_div_Navbar">
          <img src={logo} alt="" />
          <p className="logo_title_navbar">YouTube</p>
        </Link>
      </div>
      <SearchBar />
      <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
      <div className="apps_Box">
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
      </div>
      <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
      <div className="Auth_cont_Navbar">
        {CurrentUser ? (
          <>
            <div className="Chanel_logo_App" onClick={()=>setAuthBtn(true)}>
              <p className="fstChar_logo_App">
                {CurrentUser?.result.name ? (
                  <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                ) : (
                  <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            <GoogleLogin
              clientId={
                "218784884290-2agkbklhha7rr5s8dn43n20uso7dbf9o.apps.googleusercontent.com"
              }
              onSuccess={onSuccess}
              onFailure={onFailure}
              render={(renderProps) => (
                <p onClick={renderProps.onClick} className="Auth_Btn">
                {/* <p onClick={logTmp} className="Auth_Btn"> */}
                  <BiUserCircle size={22} />
                  <b>Sign in</b>
                </p>
               )}
             />
          </>
        )}
      </div>
    </div>
    {
      AuthBtn &&
      <Auth
      setEditCreateChanelBtn={setEditCreateChanelBtn}
      setAuthBtn={setAuthBtn}
      User={CurrentUser}
      />
    }
    </>
  );
}

export default Navbar;
// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import logo from "./logo.ico";
// import SearchBar from "./SearchBar/SearchBar";
// import { RiVideoAddLine } from "react-icons/ri";
// import { BiUserCircle } from "react-icons/bi";
// import { gapi } from "gapi-script";
// import { Link } from "react-router-dom";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/auth";
// import Auth from "../../Pages/Auth/Auth";
// import { GoogleLogin } from "react-google-login"; // Add this import statement

// function Navbar({ toggleDrawer, setEditCreateChanelBtn }) {
//   const [AuthBtn, setAuthBtn] = useState(false);
//   const CurrentUser = useSelector((state) => state.currentUserReducer);

//   useEffect(() => {
//     const initGoogleAPI = () => {
//       gapi.load("client:auth2", () => {
//         gapi.client
//           .init({
//             clientId:
//               "1053187740998-bvi232kvkis99nf5rqjqs68tbg7odfjs.apps.googleusercontent.com",
//             scope: "email",
//           })
//           .then(() => {
//             console.log("GAPI client initialized");
//           })
//           .catch((error) => {
//             console.error("Error initializing GAPI client:", error);
//           });
//       });
//     };

//     const loadGapiScript = () => {
//       const script = document.createElement("script");
//       script.src = "https://apis.google.com/js/api.js";
//       script.async = true;
//       script.defer = true;
//       script.onload = initGoogleAPI;
//       document.body.appendChild(script);
//     };

//     if (!window.gapi) {
//       loadGapiScript();
//     } else {
//       initGoogleAPI();
//     }
//   }, []);

//   const dispatch = useDispatch();

//   const onSuccess = (response) => {
//     const Email = response?.profileObj.email;
//     console.log("Google Login Success:", response);
//     dispatch(login({ email: Email }));
//   };

//   const onFailure = (response) => {
//     console.log("Google Login Failed:", response);
//   };

//   return (
//     <>
//       <div className="Container_Navbar">
//         <div className="Burger_Logo_Navbar">
//           <div className="burger" onClick={() => toggleDrawer()}>
//             <p></p>
//             <p></p>
//             <p></p>
//           </div>

//           <Link to={"/"} className="logo_div_Navbar">
//             <img src={logo} alt="YouTube Logo" />
//             <p className="logo_title_navbar">YouTube</p>
//           </Link>
//         </div>
//         <SearchBar />
//         <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
//         <div className="apps_Box">
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//         </div>
//         <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
//         <div className="Auth_cont_Navbar">
//           {CurrentUser ? (
//             <>
//               <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
//                 <p className="fstChar_logo_App">
//                   {CurrentUser?.result.name ? (
//                     <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
//                   ) : (
//                     <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
//                   )}
//                 </p>
//               </div>
//             </>
//           ) : (
//             <GoogleLogin
//               clientId="1053187740998-bvi232kvkis99nf5rqjqs68tbg7odfjs.apps.googleusercontent.com"
//               onSuccess={onSuccess}
//               onFailure={onFailure}
//               render={(renderProps) => (
//                 <p onClick={renderProps.onClick} className="Auth_Btn">
//                   <BiUserCircle size={22} />
//                   <b>Sign in</b>
//                 </p>
//               )}
//             />
//           )}
//         </div>
//       </div>
//       {AuthBtn && (
//         <Auth
//           setEditCreateChanelBtn={setEditCreateChanelBtn}
//           setAuthBtn={setAuthBtn}
//           User={CurrentUser}
//         />
//       )}
//     </>
//   );
// }

// export default Navbar;

