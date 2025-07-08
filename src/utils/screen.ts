import type {IPos} from "../types.ts";

export const getScreenCenter = (elementWidth: number = 0, elementHeight: number = 0):IPos => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    return {
        x: Math.round((screenWidth - elementWidth) / 2),
        y: Math.round((screenHeight - elementHeight) / 2)
    };
};