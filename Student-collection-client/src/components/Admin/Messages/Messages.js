import React, { useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
    // try {
    //     axiosInstance.get('/message/allMessages')
    //         .then(data => console.log(data, '===data from message'))

    // } catch (error) {
    //     console.error(error,'error from messages');
    // }
    useEffect(()=>{
        axios.get('http://localhost:5000/message/allMessages')
        .then(data=>console.log(data,'data in message'))
    },[])
    return (
        <div>
            Here is incoming message
        </div>
    );
};

export default Messages;