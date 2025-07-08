import {NextButton} from "../Button/Button.tsx";
import React, {useContext, useRef, useState} from "react";
import {levelContext} from "../../context/LevelContext.ts";
import {LEVEL_COMMENTS, LOGIC, LOGIC_BY_LEVEL} from "../../data/levels.ts";
import {useButtonPosition} from "../../hooks/useButtonPosition.ts";
import {useButtonLogic} from "../../hooks/useButtonLogic.ts";
import './GameScreen.css';
import {clsx} from "clsx";
import {GameMenu} from "../GameMenu/GameMenu.tsx";
import {useNavigate} from "react-router";

export const GameScreen = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const {currentLevel} = useContext(levelContext);
    const currentLogic = LOGIC_BY_LEVEL[currentLevel];
    const {next, reset} = useContext(levelContext);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const {position, setPosition, setVisible, visible} = useButtonPosition(currentLogic);
    const [isClickable, setIsClickable] = useState<boolean>(false);

    const handleClick = () => {
        if (!isClickable) return;
        next();
    };

    useButtonLogic({
        logic: currentLogic,
        setPosition,
        setVisible,
        currentPosition: position,
        buttonRef,
        setIsClickable
    });

    const getButtonStyle = (): React.CSSProperties | undefined => {
        let style: React.CSSProperties = {
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            visibility: visible ? 'visible' : 'hidden',
            transition: 'all 0.3s ease'
        };

        if (currentLogic === LOGIC.INVISIBLE_BUTTON) {
            style.transition = 'none';
            style.opacity = 0;
            style.pointerEvents = 'auto';
        }

        return style;
    };


    const restartLevel = () => {
        navigate(`/levels/${currentLevel}`, {replace: true});
        setMenuOpen(false);
    };

    const resetGame = () => {
        reset();
        setMenuOpen(false);
    };

    return (
        <div className={clsx('game_screen', {'hover_button': currentLogic === LOGIC.INVISIBLE_BUTTON})}
             onContextMenu={(event) => event.preventDefault()}>
            <div className="level_info">
                <strong>
                    LEVEL {currentLevel}
                </strong>
                <span>{LEVEL_COMMENTS[currentLevel]}</span>
            </div>
            <NextButton
                ref={buttonRef}
                onClick={handleClick}
                style={getButtonStyle()}
                disabled={!isClickable}
            >Click Me</NextButton>
            <GameMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onRestartLevel={restartLevel}
                onResetGame={resetGame}
            />
            <button className="menu-button" onClick={() => setMenuOpen(true)}>
                <span/>
                <span/>
                <span/>
            </button>
            {/*<Hint/>*/}
        </div>
    );
};