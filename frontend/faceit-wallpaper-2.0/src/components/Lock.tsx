import { FaLock } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';

function Lock({
    isLocked,
    setIsLocked
}:{
    isLocked: boolean,
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>
}){
    const stylesForLock : React.CSSProperties = {
        cursor: 'pointer',
        color: 'white',
        position: 'absolute',
        top: '1.5vw',
        right: '1.5vw',
        zIndex: 100000,
        opacity: 0.25
    }

    const handleClick = () => {
        localStorage.setItem('isLocked', (!isLocked).toString());
        setIsLocked(prev => !prev);
    };

    return (
        <div style={stylesForLock}>
            {isLocked ? (
                <FaLock onClick={handleClick} size={'2.5vw'} />
            ) : (
                <FaUnlock onClick={handleClick} size={'2.5vw'} />
            )}
        </div>
    )
}

export default Lock
