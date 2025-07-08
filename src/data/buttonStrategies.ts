import { LOGIC } from "./levels.ts";
import type { IPos } from "../types.ts";
import React from "react";

export type StrategyParams = {
    currentPosition: IPos;
    setPosition: (pos: IPos) => void;
    setVisible: (v: boolean) => void;
    setIsClickable: (v: boolean) => void;
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

export type StrategyFn = (params: StrategyParams) => () => void;

export const buttonStrategies: Record<LOGIC, StrategyFn> = {
    [LOGIC.SLIDE_LEFT]: ({ currentPosition, setPosition, buttonRef }) => {
        if (!buttonRef?.current) return () => {};
        const el = buttonRef.current;
        const handleHover = () => {
            setPosition({ x: currentPosition.x - 350, y: currentPosition.y });
        };
        el.addEventListener("mouseenter", handleHover);
        return () => el.removeEventListener("mouseenter", handleHover);
    },

    [LOGIC.DISAPPEAR_RANDOM]: ({ setPosition, setVisible }) => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;

        const move = () => {
            const newX = Math.random() * (window.innerWidth - 300);
            const newY = Math.random() * (window.innerHeight - 56);

            setVisible(false);

            setTimeout(() => {
                setPosition({ x: newX, y: newY });
                setVisible(true);

                timeout1 = setTimeout(() => {
                    setVisible(false);
                    timeout2 = setTimeout(move, 3000 + Math.random() * 4000);
                }, 500);
            }, 50);
        };

        move();

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    },

    [LOGIC.BOUNCE_AWAY]: ({ currentPosition, setPosition, buttonRef }) => {
        if (!buttonRef?.current) return () => {};

        let cooldown = false;

        const handleMouseMove = (e: MouseEvent) => {
            const el = buttonRef.current;
            if (!el || cooldown) return;

            const rect = el.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = centerX - mouseX;
            const dy = centerY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                cooldown = true;

                const angle = Math.atan2(dy, dx);
                const offset = 100 + Math.random() * 100;

                const newX = Math.min(
                    Math.max(currentPosition.x + Math.cos(angle) * offset, 0),
                    window.innerWidth - 300
                );
                const newY = Math.min(
                    Math.max(currentPosition.y + Math.sin(angle) * offset, 0),
                    window.innerHeight - 56
                );

                setPosition({ x: newX, y: newY });

                setTimeout(() => {
                    cooldown = false;
                }, 200);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    },

    [LOGIC.HIDE_ON_HOVER]: ({ setVisible, buttonRef }) => {
        if (!buttonRef?.current) return () => {};
        const el = buttonRef.current;
        let timeout: NodeJS.Timeout;
        const handleMouseEnter = () => {
            setVisible(false);
            timeout = setTimeout(() => setVisible(true), 1500);
        };
        el.addEventListener("mouseenter", handleMouseEnter);
        return () => {
            clearTimeout(timeout);
            el.removeEventListener("mouseenter", handleMouseEnter);
        };
    },

    [LOGIC.INVISIBLE_BUTTON]: ({ setPosition, setVisible }) => {
        const x = Math.random() * (window.innerWidth - 300);
        const y = Math.random() * (window.innerHeight - 56);
        setPosition({ x, y });
        setVisible(true);
        return () => {};
    },

    [LOGIC.RUNS_AWAY]: ({ currentPosition, setPosition, buttonRef }) => {
        const SAFE_DISTANCE = 120;
        const handleMouseMove = (e: MouseEvent) => {
            const el = buttonRef?.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < SAFE_DISTANCE) {
                const angle = Math.atan2(dy, dx);
                const offset = 150;
                setPosition({
                    x: currentPosition.x - Math.cos(angle) * offset,
                    y: currentPosition.y - Math.sin(angle) * offset,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    },

    [LOGIC.BLINKING_BUTTON_RANDOM]: ({ setVisible }) => {
        let timeout: NodeJS.Timeout;
        const runBlinkCycle = () => {
            setVisible(true);
            timeout = setTimeout(() => {
                setVisible(false);
                timeout = setTimeout(runBlinkCycle, 1500 + Math.random() * 3500);
            }, 100);
        };
        runBlinkCycle();
        return () => clearTimeout(timeout);
    },

    [LOGIC.DELAYED_CLICK_TIMED]: ({ setVisible, setIsClickable }) => {
        setVisible(true);
        setIsClickable(false);
        let openTimer: NodeJS.Timeout;
        let cycleTimer: NodeJS.Timeout;
        const runCycle = () => {
            setIsClickable(true);
            openTimer = setTimeout(() => {
                setIsClickable(false);
                cycleTimer = setTimeout(runCycle, 3000);
            }, 100);
        };
        runCycle();
        return () => {
            clearTimeout(openTimer);
            clearTimeout(cycleTimer);
        };
    },

    [LOGIC.MIRRORED_MOVEMENT]: ({ setPosition, setVisible, setIsClickable }) => {
        setVisible(false);
        setIsClickable(false);

        let hasMovedFar = false;
        let startX = 0;
        let startY = 0;

        const DISTANCE_THRESHOLD = 100;
        const RANDOM_OFFSET = 30;

        const handleMouseMove = (e: MouseEvent) => {
            if (!hasMovedFar) {
                if (startX === 0 && startY === 0) {
                    startX = e.clientX;
                    startY = e.clientY;
                }

                const dx = Math.abs(e.clientX - startX);
                const dy = Math.abs(e.clientY - startY);
                if (dx + dy > DISTANCE_THRESHOLD) {
                    hasMovedFar = true;
                    setVisible(true);
                    setIsClickable(true);
                } else {
                    return;
                }
            }

            const halfWidth = window.innerWidth / 2;
            const halfHeight = window.innerHeight / 2;

            let mirrorX = halfWidth - (e.clientX - halfWidth);
            let mirrorY = halfHeight - (e.clientY - halfHeight);

            // Добавляем случайную погрешность
            mirrorX += Math.random() * RANDOM_OFFSET * 2 - RANDOM_OFFSET;
            mirrorY += Math.random() * RANDOM_OFFSET * 2 - RANDOM_OFFSET;

            const newX = Math.min(Math.max(mirrorX - 150, 0), window.innerWidth - 300);
            const newY = Math.min(Math.max(mirrorY - 28, 0), window.innerHeight - 56);

            setPosition({ x: newX, y: newY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            setIsClickable(false);
        };
    },

    [LOGIC.DISAPPEAR_HARDCORE]: ({ setPosition, setVisible, setIsClickable }) => {
        let showTimeout: NodeJS.Timeout;
        let hideTimeout: NodeJS.Timeout;
        const startCycle = () => {
            const x = Math.random() * (window.innerWidth - 300);
            const y = Math.random() * (window.innerHeight - 56);
            setPosition({ x, y });
            setVisible(true);
            setIsClickable(true);
            hideTimeout = setTimeout(() => {
                setVisible(false);
                setIsClickable(false);
                showTimeout = setTimeout(startCycle, 500 + Math.random() * 1000);
            }, 500);
        };
        startCycle();
        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    },
};
