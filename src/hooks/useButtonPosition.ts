import React, {useCallback, useEffect, useState} from "react";
import type {SetStateAction} from 'react';
import {getScreenCenter} from "../utils/screen.ts";
import {LOGIC} from "../data/levels.ts";
import type {IPos} from "../types.ts";

type TButtonPosition = (
    logic: LOGIC,
    options?: {
        buttonSize?: { width: number; height: number };
        allowOverflow?: boolean;
    }
) => {
    position: IPos;
    visible: boolean;
    setPosition: (newPos: IPos) => void;
    setVisible: React.Dispatch<SetStateAction<boolean>>;
};

export const useButtonPosition: TButtonPosition = (logic, options) => {
    const buttonSize = options?.buttonSize ?? {width: 300, height: 56};
    const allowOverflow = options?.allowOverflow ?? false;

    const [pos, setPos] = useState<IPos>(
        getScreenCenter(buttonSize.width, buttonSize.height)
    );
    const [visible, setVisible] = useState(true);

    const setPosition = useCallback((newPos: IPos) => {
        if (allowOverflow) {
            setPos({...newPos});
        } else {
            const maxX = window.innerWidth - buttonSize.width;
            const maxY = window.innerHeight - buttonSize.height;

            const clampedX = Math.max(0, Math.min(newPos.x, maxX));
            const clampedY = Math.max(0, Math.min(newPos.y, maxY));

            setPos({x: clampedX, y: clampedY});
        }
    }, [logic, allowOverflow]);

    useEffect(() => {
        const center = getScreenCenter(buttonSize.width, buttonSize.height);
        setPos(center);
    }, [logic])

    return {
        position: pos,
        visible,
        setPosition,
        setVisible,
    };
};
