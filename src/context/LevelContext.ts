import {createContext} from "react";

export interface ILevelContext {
    currentLevel: number;
    next: () => void;
    reset: () => void;
    clickCount: number;
    startTime: number;
    setClickCount: (n: number) => void;
}

export const levelContext = createContext<ILevelContext>({
    currentLevel: 1,
    reset: () => {},
    next: () => {},
    clickCount: 0,
    startTime: Date.now(),
    setClickCount: () => {}
})

export default levelContext.Provider;

