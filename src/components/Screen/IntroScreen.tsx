import {VideoScene} from "../VideoScene/VideoScene.tsx";
import {useNavigate} from "react-router";

export const IntroScreen = () => {
    const navigate = useNavigate();

    return (
        <VideoScene
            videoSrc="/videos/intro.mp4"
            onEnd={() => navigate("/levels/1")}
        />
    );
};