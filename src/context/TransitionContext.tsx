import { createContext, useContext, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface TransitionContextValue {
  isTransitioning: boolean;
  phase: "idle" | "enter" | "active" | "exit";
  destination: string;
  triggerTransition: (to: string) => void;
  onAnimationComplete: () => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
  phase: "idle",
  destination: "",
  triggerTransition: () => {},
  onAnimationComplete: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"idle" | "enter" | "active" | "exit">("idle");
  const [destination, setDestination] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerTransition = useCallback((to: string) => {
    if (phase !== "idle") return;
    setDestination(to);
    setPhase("enter");

    // After overlay is visible → navigate → then exit
    timerRef.current = setTimeout(() => {
      setPhase("active");
      timerRef.current = setTimeout(() => {
        navigate(to);
        setPhase("exit");
        timerRef.current = setTimeout(() => {
          setPhase("idle");
          setDestination("");
        }, 500);
      }, 1700);
    }, 300);
  }, [phase, navigate]);

  const onAnimationComplete = useCallback(() => {}, []);

  return (
    <TransitionContext.Provider value={{
      isTransitioning: phase !== "idle",
      phase,
      destination,
      triggerTransition,
      onAnimationComplete,
    }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionNavigate() {
  const { triggerTransition, phase } = useContext(TransitionContext);
  return { navigate: triggerTransition, isTransitioning: phase !== "idle" };
}

export { TransitionContext };
