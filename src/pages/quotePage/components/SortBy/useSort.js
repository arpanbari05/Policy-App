import { useRef, useState } from "react";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";

function useSortByDD({ onSortByChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Relevance");

    const dropdownRef = useRef(null);
    useOutsiteClick(dropdownRef, () => setIsOpen(false));

    const toggleList = () => {
        setIsOpen(!isOpen);
    };
    const handleSelect = title => {
        setSelected(title);
        setIsOpen(!isOpen);
        onSortByChange(title);
    };

    return {
        dropdownRef,
        toggleList,
        isOpen,
        selected,
        handleSelect,
    };
}

export default useSortByDD;
