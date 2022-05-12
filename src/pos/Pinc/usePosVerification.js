import { useEffect, useState } from "react";
import { useUrlQueries } from "../../customHooks/useUrlQuery";
import { allowOnWebsites } from "../../utils/helper";

export default function usePosVerification() {
  const [loading, setLoading] = useState(false);
  const { token } = useUrlQueries();

  useEffect(() => {
    if (
      allowOnWebsites(["pincUat", "topup"]) &&
      token &&
      window.location.pathname === "/input/basic-details"
    ) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_BASE_URL}pinc/token/posp_details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      }).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            const { first_name, last_name, pos_id } = data.response.pos_detail;
            localStorage.setItem(
              "Pos_details",
              JSON.stringify({
                first_name,
                last_name,
                pos_id,
              }),
            );
            setLoading(false);
          });
        }
        setLoading(false);
      });
    }
  }, [token]);

  return { loading };
}
