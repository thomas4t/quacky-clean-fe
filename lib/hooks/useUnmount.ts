import { useEffect } from "react";

export function useUnmount(cb: () => void) {
    return useEffect(() => {
        return cb;
    }, [])
}