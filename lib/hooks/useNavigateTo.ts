import { useRouter } from "next/router";
import { useCallback } from "react";
import { AppPagesNames } from "../types/core";

export function useNavigateTo() {
  const nextRouter = useRouter();
  return useCallback(
    (to: AppPagesNames) => {
      return nextRouter.push(`/${to}`);
    },
    [nextRouter]
  );
}
