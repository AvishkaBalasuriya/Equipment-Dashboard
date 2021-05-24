import React from 'react'
import { LoadPanel as LoadingPanel } from "devextreme-react/load-panel";

const LoadPanel = (props) => {
    return (
        <LoadingPanel
            shadingColor="rgba(0,0,0,0.4)"
            position={props.position}
            visible={props.status}
            showIndicator={props.status}
            shading={false}
            showPane={props.status}
            message="Processing.... Please, wait..."
            closeOnOutsideClick={false}
        />
    )
}

export default LoadPanel