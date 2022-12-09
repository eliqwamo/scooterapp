import React, {useState, useEffect, useCallback} from "react";
import Style from './style';
import { View, Text } from 'react-native';
import firebase from '../../utilis/firebase.js';
import { GiftedChat } from 'react-native-gifted-chat';

const db = firebase.firestore();
const chatRef = db.collection('chats');

const Chatroom = () => {

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        
        readUser();

        const unsubscribe = chatRef.onSnapshot((query) => {
            const messageFirestore = query
            .docChanges()
            .filter(({type}) => type === 'added')
            .map(({doc}) => {
                const message = doc.data()
                return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messageFirestore);
        })
        return () => unsubscribe();
    },[]);


    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    }, [messages]);

    const readUser = async() => {
        const user = firebase.auth().currentUser;
        if(user){
  
            const _id = user.uid;
            const name = user.email;
            const account = {_id,name};
            setUser(account);
        }
    }

    const sendHandler = async(messages) => {
        const newMessage = messages.map((m) => chatRef.add(m));
        await Promise.all(newMessage);
    }

    console.log(user);

    return(
        <GiftedChat messages={messages} user={user} onSend={sendHandler}  />
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Chatroom',
        headerShown: true
    }
}

export default Chatroom;