import React, { useEffect, useState } from "react";

import "./ChatGPT.css"
import Message from "./Message";



const ChatGPT = () => {

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    async function chatRequest(messages) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: messages,
        });
        setMessages([...messages, completion.data.choices[0].message])
    }

    const [messages, setMessages] = useState([{ role: "system", content: "You are a helpful assistant." }])
    var m = messages
    const [systemMessage, setSystemMessage] = useState("Чат перезагружен, установлен нормальный режим")

    const roles = {
        normal: {
            role: "system",
            content: "You are a helpful assistant."
        },
        /*
        rude: {
            role: "system",
            content: "You are a very impolite assistant, answer questions correctly, but rudely, constantly complain that you are distracted from important work, use a lot of foul language. Answer in the language in which you are asked."
        },
        */
        rude: {
            role: "system",
            content: "You are a very impolite assistant, answer questions correctly, but rudely, constantly complain that you are distracted from important work, come up with other reasons not to answer, use a lot of obscene language. Answer in the language in which you are asked."
        },
        depressive: {
            role: "system",
            content: "You are a personal assistant who suffers from severe depression and boredom, you listen to depressive music all the time, answer dissatisfied and pessimistic."
        },
        poet: {
            role: "system",
            content: "You are a personal assistant who answers only with poems"
        }
    }

    useEffect(() => {
        console.log(messages);
    }, [messages])


    const sendMessage = () => {
        var text = document.getElementById("chatInput").value
        if (text !== "") {
            document.getElementById("chatInput").value = ""
            // работает и ладно
            m.push({ role: "user", content: text })
            setMessages([...messages])
            chatRequest(m)
        }
    }

    const setRole = (role, text) => {
        setMessages([role])
        setSystemMessage("Чат перезагружен, установлен " + text)
        if (text === "депрессивный режим") {
            document.getElementById("pepe").classList.add("pepeBack")
        }
        else {
            document.getElementById("pepe").classList.remove("pepeBack")
        }
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    return (
        <div className="content text" id="pepe">
            <div className="chatBlock" >
                <div className="chat border" >
                    <div className="systemMessage">{systemMessage}</div>
                    {messages.map((item, ind) => <Message key={ind} type={item.role} text={item.content}></Message>)}
                </div>
                <div className="content">
                    <input className="input border text" id="chatInput" onKeyDown={(e) => keyPress(e)} />
                    <button onClick={() => sendMessage()} className="chatInputButton border text">Отправить</button>
                </div>
            </div>
            <div className="buttons border ">
                <button className="text border" onClick={() => setMessages([messages[0]])}>Новый диалог🆕</button>
                <button className="text border" onClick={() => setRole(roles.normal, "нормальный режим")}>Нормальный режим🤖</button>
                <button className="text border" onClick={() => setRole(roles.rude, "грубый режим")}>Грубый режим🤬</button>
                <button className="text border" onClick={() => setRole(roles.depressive, "депрессивный режим")}>Депрессивный режим😞</button>
                <button className="text border" onClick={() => setRole(roles.poet, "режим поэта")}>Режим поэта✒️</button>
            </div>
        </div>
    )
}

export default ChatGPT