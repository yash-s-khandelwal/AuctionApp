// src/frontend/src/hooks/useOutsideClick.js

import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click occurred outside the referenced element
            // We also check if the target is not the button that opens the modal itself
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        // Attach the listener to the whole document when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup: Remove the listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideClick;