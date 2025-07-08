import {useEffect, useRef} from 'react';
import type {FC} from 'react';
import styles from './VideoScene.module.css';

interface IVideoScene {
    videoSrc: string,
    onEnd: () => void;
}

export const VideoScene: FC<IVideoScene> = ({videoSrc, onEnd}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play();
            video.onended = onEnd;
        }
    }, []);

    return (
        <div className={styles.videoscene} onContextMenu={(event) => event.preventDefault()}>
            <video
                ref={videoRef}
                src={videoSrc}
                className={styles.fullscreen}
                muted={true}
                autoPlay
            />
        </div>
    );
};
