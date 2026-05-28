import { useEffect } from "react";
import { notify } from "../utils/notify";


function Logout({ navigate, setUserId }) {

    const performLogout = async () => {

      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      setUserId("");
      notify.success("You've been signed out.");
      navigate("/login");
    };

  useEffect(() => {
     performLogout();
  },[]);


  return (
    <div className="main-content">
      <div className="card">
      </div>
    </div>
  );
}
export default Logout;