import { useState, useEffect } from "react";

export default function useIsUserVerified() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.SSO_user && JSON.parse(localStorage.SSO_user).username) {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_BASE_URL}renew_buy/username/posp_details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: JSON.parse(localStorage.SSO_user).username,
          }),
        },
      )
        .then(res => {
          res.json().then(data => {
            if (data.is_Gi_certified) {
              setStatus("true");
            } else {
              setStatus("false");
            }
            setLoading(false);
          });
        })
        .catch(error => {
          console.log(error);
          alert(error.message);
          setLoading(false);
        });
    }
  }, []);

  return { status, loading };
}
