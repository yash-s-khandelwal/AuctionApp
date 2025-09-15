import { useEffect, useState } from 'react';

const useRazorpayScript = (src) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [scriptError, setScriptError] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        script.onload = () => {
            setScriptLoaded(true);
        };
        script.onerror = () => {
            setScriptError(true);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);

    return [scriptLoaded, scriptError];
};

export default useRazorpayScript;