package ch.lorien.chat.model;
public class User{
    String name;
    String color;

    public User(String name, String color) {
        this.name = name;
        this.color = "#"+color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "User{" +
                "name='" + name + '\'' +
                '}';
    }
}
