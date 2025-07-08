import React, {useEffect} from "react";
import {LOGIC} from "../data/levels.ts";
import type {IPos} from "../types.ts";
import {buttonStrategies} from "../data/buttonStrategies.ts";

type UseButtonLogicProps = {
    logic: LOGIC;
    currentPosition: IPos;
    setPosition: (pos: IPos) => void;
    setVisible: (v: boolean) => void;
    setIsClickable: (v: boolean) => void;
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

export const useButtonLogic = ({
                                   logic,
                                   currentPosition,
                                   setPosition,
                                   setVisible,
                                   setIsClickable,
                                   buttonRef,
                               }: UseButtonLogicProps) => {
    useEffect(() => {
        setVisible(true);
        setIsClickable(true);

        const strategyFn = buttonStrategies[logic];
        if (typeof strategyFn !== "function") return;

        const cleanup = strategyFn({
            currentPosition,
            setPosition,
            setVisible,
            setIsClickable,
            buttonRef,
        });

        return () => {
            if (typeof cleanup === "function") {
                cleanup();
            }
        };
    }, [logic]);
};
