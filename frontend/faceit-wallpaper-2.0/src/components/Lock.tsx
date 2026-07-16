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
        top: '1vw',
        right: '1vw',
        opacity: 0.25
    }

    const handleClick = () => {
        localStorage.setItem('isLocked', (!isLocked).toString());
        setIsLocked(prev => !prev);
    };

    return (
        <div style={stylesForLock}>
            {isLocked ? (
                <FaLock onClick={handleClick} size={'2vw'} />
            ) : (
                <FaUnlock onClick={handleClick} size={'2vw'} />
            )}
        </div>
    )
}

export default Lock
