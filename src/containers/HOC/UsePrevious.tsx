import { useEffect, useRef } from "react";
import deepEqual from "deep-equal";

// Hook
function UsePrevious(value: any) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        if(!deepEqual(ref.current, value)) {
            ref.current = value;
        }
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export default UsePrevious;