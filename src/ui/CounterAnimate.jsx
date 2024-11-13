import React, { useState, useEffect } from 'react';

const Counter = ({ targetNumber, parametrs }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const target = parseInt(targetNumber, 10);

        if (isNaN(target)) {
            console.error("Не корректное число!");
            return;
        }

        const increment = target / 100;
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount + increment >= target) {
                    clearInterval(interval);
                    return target;
                }
                return prevCount + increment;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [targetNumber]);

    return (
        <p style={{display:"flex",alignItems:"center",gap:"5px",justifyContent:"center"}}>
            {Math.floor(count)}
            <span>{parametrs}</span>
        </p>
    );
};

export default Counter;