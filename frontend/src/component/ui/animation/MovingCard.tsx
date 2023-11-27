import {CSSProperties, ReactNode, useState} from "react";
import "@ui/css/moving-card.css"

interface Props {
    children: ReactNode,
    style?: CSSProperties
}

export function MovingCard({children, style}: Props) {
    const [movingStyle, setMovingStyle] = useState({
        transform: "perspective(500px) rotateX(0deg) rotateY(0deg)",
    })

    return (
        <div className="moving-card"
             style={{...style, ...movingStyle}}
             onMouseMove={(event) => {
                 const maxValue = 15;

                 const element = event.currentTarget
                 const elementRect = element.getBoundingClientRect();
                 const offsetY = event.clientY - (elementRect.top + elementRect.height / 2);
                 const offsetX = event.clientX - (elementRect.left + elementRect.width / 2);


                 setMovingStyle({
                     transform:
                         `perspective(500px)
                             rotateX(${offsetY > 0 ? Math.min(offsetY, -maxValue) : Math.max(offsetY, maxValue)}deg)
                             rotateY(${offsetX > 0 ? Math.min(offsetX, maxValue) : Math.max(offsetX, -maxValue)}deg)`
                 })
             }}
        >
            {children}
        </div>

    );
}