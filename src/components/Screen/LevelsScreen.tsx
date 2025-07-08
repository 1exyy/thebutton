import {Link} from "react-router";
import './LevelsScreen.css'
import {MAX_LEVELS} from "../../data/levels.ts";

const LockIcon = () => (
    <div className='lock'>
        <svg
            width="64"
            height="64"
            fill="gray"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 5c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 5v7H6v-7h12z"/>
        </svg>
    </div>
);

const Level = ({level, isLocked}: { level: number; isLocked: boolean }) => {
    if (isLocked) {
        return (
            <div className="level level_locked">
                <span>{level}</span>
                <LockIcon/>
            </div>
        );
    }

    return (
        <Link to={`/levels/${level}`} className="level">
            {level}
        </Link>
    );
};

export const LevelsScreen = () => {
    const maxLevel = Number(localStorage.getItem("maxLevel"));
    const levels = Array.from({length: MAX_LEVELS}, (_, i) => i + 1);

    return (
        <div className="levels_container" onContextMenu={(event) => event.preventDefault()}>
            {levels.map((level) => (
                <Level key={level} level={level} isLocked={level > maxLevel}/>
            ))}
        </div>
    );
};