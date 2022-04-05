import { useEffect, useState } from "react";
import { useFrontendBoot } from "../customHooks";
import { useUrlQueries } from "./useUrlQuery";

export function usePosPinc() {
  const [status, setStatus] = useState(false);
  const {
    data: { tenant },
  } = useFrontendBoot();
  const values = useUrlQueries();

  useEffect(() => {
    if (tenant.toLowerCase() === "pinc") {
      if (values.token) {
        localStorage.setItem("SSO_user", JSON.stringify(values));
        setStatus(true);
      }
    }
  }, []);

  return { status };
}
