import { useEffect } from "react";

export function useDidMount(cb: () => void) {
    return useEffect(cb, [])
}