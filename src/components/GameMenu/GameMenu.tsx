import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import './GameMenu.css';

interface GameMenuProps {
    open: boolean;
    onClose: () => void;
    onRestartLevel: () => void;
    onResetGame: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({
                                                      open,
                                                      onClose,
                                                      onRestartLevel,
                                                      onResetGame,
                                                  }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!open) return null;

    return (
        <div className="game-menu-overlay" onClick={onClose}>
            <div className="game-menu" onClick={(e) => e.stopPropagation()}>
                <h2>Меню</h2>
                <button onClick={onRestartLevel}>🔄 Перезапустить уровень</button>
                <button onClick={onResetGame}>🧨 Сбросить прогресс</button>
                <button onClick={() => navigate("/levels")}>🗺 Выбор уровня</button>
                <button onClick={onClose}>❌ Закрыть</button>
            </div>
        </div>
    );
};