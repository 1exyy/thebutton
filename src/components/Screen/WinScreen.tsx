import "./WinScreen.css";
import {useLocation, useNavigate} from "react-router";
import {NextButton} from "../Button/Button.tsx";
import {useEffect} from "react";

export const WinScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {time, clicks} = location.state || {};

    const formatTime = (ms: number) => {
        const sec = Math.floor(ms / 1000);
        const min = Math.floor(sec / 60);
        const remain = sec % 60;
        return `${min}:${remain.toString().padStart(2, "0")}`;
    };

    const getRank = (ms: number) => {
        if (ms < 60000) return "🥇 Gold";
        if (ms < 120000) return "🥈 Silver";
        return "🥉 Bronze";
    };

    const handleRestart = () => {
        localStorage.removeItem("clicks");
        localStorage.removeItem("maxLevel");
        localStorage.removeItem("startTime");
        navigate("/", {replace: true});
    };

    useEffect(() => {
        const max = Number(localStorage.getItem("maxLevel") || 1);
        if (max < 10) {
            navigate(`/levels/${max}`);
        }
    }, []);

    return (
        <div className="win-screen" onContextMenu={(event) => event.preventDefault()}>
            <h1 className="win-title">🎉 You Win!</h1>

            <div className="stats">
                <div className="stat-block">
                    <span className="label">⏱ Time</span>
                    <span className="value">{formatTime(time)}</span>
                </div>
                <div className="stat-block">
                    <span className="label">🖱 Clicks</span>
                    <span className="value">{clicks}</span>
                </div>
                <div className="stat-block rank">
                    <span className="label">🏆 Rank</span>
                    <span className="value">{getRank(time)}</span>
                </div>
            </div>

            <NextButton onClick={handleRestart}>Restart</NextButton>
        </div>
    );
};
