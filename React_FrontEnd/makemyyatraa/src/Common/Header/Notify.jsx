import { IoIosNotifications } from 'react-icons/io';
import { MdNotificationsActive } from 'react-icons/md';
import './Header.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Client, client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const Notify = () => {
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const socket = new SockJS('http://localhost:9000/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log("connected");
                stompClient.subscribe('/topic/notifications', (message) => {
                    const noti = JSON.parse(message.body);
                    setNotifications((prevNot) => [...prevNot, noti]);
                    setCount((prev) => prev + 1)
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
        });
        stompClient.activate();

        // callApi();
        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleIconClick = () => {
        // Display notifications
        console.log(notifications);
        setCount(0); // Reset the notification count
      };

    return(
        <div>{ notifications ? (
            <IoIosNotifications size={28} onClick={handleIconClick}/>
        ): (
            <MdNotificationsActive size={28} />
        )
}
<div>
        {notifications.map((notification, index) => (
          <div key={index}>{notification.message}</div>
        ))}
      </div>
        </div>
    )
}
export default Notify;