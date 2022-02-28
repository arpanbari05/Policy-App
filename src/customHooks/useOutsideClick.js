import { useEffect } from "react";

const useOutsiteClick = (ref, callback) => {
  useEffect(() => {
    const handleOutsideClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return document.addEventListener("mousedown", handleOutsideClick);
  }, [ref, callback]);
};

export default useOutsiteClick;
