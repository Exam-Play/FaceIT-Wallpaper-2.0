import { FaLock, FaUnlock } from 'react-icons/fa';
import { MdRestartAlt } from 'react-icons/md';

function Lock({
    isLocked,
    setIsLocked
}:{
    isLocked: boolean,
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const stylesForButton: React.CSSProperties = {
        cursor: 'pointer',
        color: 'white',
        opacity: 0.25,
        transition: 'opacity .2s'
    };

    const wrapperStyle: React.CSSProperties = {
        position: 'absolute',
        top: '1.5vw',
        right: '1.5vw',
        zIndex: 100000,
        display: 'flex',
        gap: '1vw',
        alignItems: 'center'
    };

    const handleLock = () => {
        localStorage.setItem('isLocked', (!isLocked).toString());
        setIsLocked(prev => !prev);
    };

    const handleReset = () => {
        const nickname = localStorage.getItem('nickname');
        const backgroundColor = localStorage.getItem("background_color");
        const backgroundImage = localStorage.getItem("background_image");
        const backgroundVideo = localStorage.getItem("background_video");

        localStorage.clear();

        localStorage.setItem('nickname', nickname || '');
        localStorage.setItem('background_color', backgroundColor || '');
        localStorage.setItem('background_image', backgroundImage || '');
        localStorage.setItem('background_video', backgroundVideo || '');
        window.location.reload();
    };

    return (
        <div style={wrapperStyle}>
            <MdRestartAlt
                size="3.25vw"
                style={stylesForButton}
                onClick={!isLocked ? handleReset : undefined}
            />

            {isLocked ? (
                <FaLock
                    size="2.5vw"
                    style={stylesForButton}
                    onClick={handleLock}
                />
            ) : (
                <FaUnlock
                    size="2.5vw"
                    style={stylesForButton}
                    onClick={handleLock}
                />
            )}
        </div>
    );
}

export default Lock;