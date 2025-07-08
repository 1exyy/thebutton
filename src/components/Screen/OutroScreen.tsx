import {VideoScene} from "../VideoScene/VideoScene.tsx";
import {useLocation, useNavigate} from "react-router";

export const OutroScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <VideoScene
            videoSrc="/videos/outro.mp4"
            onEnd={() => navigate('/win', {replace: true, state: {
                    ...location.state
                }})}
        />
    );
};