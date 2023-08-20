import React from "react";

const Message = ({ text, type }) => {

    return (
        <pre className={type} >
            {text}
        </pre>
    )
}

export default Message