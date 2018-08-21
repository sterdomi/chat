package ch.lorien.chat.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import ch.lorien.chat.model.User;
import ch.lorien.chat.model.Message;

@ServerEndpoint(value = "/chat/{username}/{color}", decoders = ch.lorien.chat.websocket.MessageDecoder.class, encoders = ch.lorien.chat.websocket.MessageEncoder.class)
public class ChatEndpoint {
    private Session session;
    private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
    private static HashMap<String, User> users = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username, @PathParam("color") String color) throws IOException, EncodeException {
        if(users.values().stream().filter(user -> user.getName().equals(username)).findAny().isPresent()){
            Message message = new Message();
            message.setContent(String.format("username: %s already in use, use another",username));
            message.setColor("#ff0000");
            session.getBasicRemote().sendObject(message);
        }else {
            this.session = session;
            chatEndpoints.add(this);
            User user = new User(username, color);
            users.put(session.getId(), user);
            Message message = new Message();
            message.setFrom(user.getName());
            message.setColor(user.getColor());
            message.setContent("Connected!");
            broadcast(message);
        }
    }


    @OnMessage
    public void onMessage(Session session, Message message) throws IOException, EncodeException {
        User user=users.get(session.getId());
        user.setColor(message.getColor());
        message.setFrom(user.getName());
        message.setColor(user.getColor());
        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) throws IOException, EncodeException {
        chatEndpoints.remove(this);
        Message message = new Message();
        User user=users.get(session.getId());
        users.remove(session.getId());
        message.setFrom(user.getName());
        message.setColor(user.getColor());
        message.setContent("Disconnected!");
        broadcast(message);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        // Do error handling here
    }

    private static void broadcast(Message message) throws IOException, EncodeException {
        chatEndpoints.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote()
                        .sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }

}
