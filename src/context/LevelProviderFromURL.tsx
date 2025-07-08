import {useParams, useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import type {FC} from "react";
import {levelContext} from "./LevelContext.ts";
import {MAX_LEVELS} from "../data/levels.ts";


const LevelProviderFromURL: FC<{ children: React.ReactNode }> = ({children}) => {
    const params = useParams<{ number: string }>();
    const navigate = useNavigate();

    const currentLevel = Number(params.number) || 1;

    const [maxLevelReached, setMaxLevelReached] = useState(() =>
        Number(localStorage.getItem("maxLevel") || 1)
    );

    const [clickCount, setClickCount] = useState(() =>
        Number(localStorage.getItem("clicks") || 0)
    );

    const [startTime, setStartTime] = useState(() => {
        const stored = localStorage.getItem("startTime");
        const time = stored ? Number(stored) : Date.now();
        localStorage.setItem("startTime", String(time));
        return time;
    });

    useEffect(() => {
        localStorage.setItem("maxLevel", String(maxLevelReached));
    }, [maxLevelReached]);

    useEffect(() => {
        localStorage.setItem("clicks", String(clickCount));
    }, [clickCount]);

    useEffect(() => {
        const handleClick = () => {
            setClickCount((prev) => prev + 1);
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        if (currentLevel > maxLevelReached) {
            navigate(`/levels/${maxLevelReached}`, {replace: true});
        }
    }, [currentLevel, maxLevelReached, navigate]);

    const next = () => {
        const nextLevel = currentLevel + 1;

        if (nextLevel > MAX_LEVELS) {
            setMaxLevelReached(MAX_LEVELS);
            navigate("/win", {
                state: {
                    time: Date.now() - startTime,
                    clicks: clickCount
                }
            });
            return;
        }

        const updatedMax = Math.max(maxLevelReached, nextLevel);
        setMaxLevelReached(updatedMax);
        navigate(`/levels/${nextLevel}`);
    };

    const reset = () => {
        setClickCount(0);
        setMaxLevelReached(1);

        navigate("/intro", {replace: true});

        setTimeout(() => {
            localStorage.removeItem("clicks");
            localStorage.removeItem("maxLevel");
            localStorage.removeItem("startTime");
            setStartTime(Date.now());
        }, 100);
    };

    return (
        <levelContext.Provider
            value={{
                currentLevel,
                next,
                reset,
                clickCount,
                setClickCount,
                startTime
            }}
        >
            {children}
        </levelContext.Provider>
    );
};

export default LevelProviderFromURL;
