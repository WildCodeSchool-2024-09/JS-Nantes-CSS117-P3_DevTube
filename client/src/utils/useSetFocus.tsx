import { useEffect, useRef } from "react";

export function useSetFocus<T extends HTMLElement>() {
  const refInputElement = useRef<T>(null);

  useEffect(() => {
    refInputElement.current?.focus();
  }, []);

  return refInputElement;
}
