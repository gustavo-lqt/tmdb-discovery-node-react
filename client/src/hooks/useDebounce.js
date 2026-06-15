import { useState, useEffect } from "react";

// Returns a delayed version of `value` that only updates
// after the user stops changing it for `delay` ms.

export function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() =>{
        const timer = setTimeout(() => setDebounced(value), delay);

        return () => clearTimeout(timer);
    }, [value, delay])
    return debounced;
}


