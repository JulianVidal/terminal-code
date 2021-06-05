#include <iostream>
#include <SFML/Graphics.hpp>

sf::Vector2f pos(300, 300);
sf::Vector2f vel(0, 0);

int main(){
    sf::RenderWindow window(sf::VideoMode(600,600), "Hello");
    window.setVerticalSyncEnabled(true);
    
    while (window.isOpen()) {
        sf::Event event;
        while(window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left)) {
            vel = sf::Vector2f(-1, 0);
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right)) {
            vel = sf::Vector2f(1, 0);
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Up)) {
            vel = sf::Vector2f(0, -1);
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down)) {
            vel = sf::Vector2f(0, 1);
        }
        
        window.clear(sf::Color::Black);
        sf::RectangleShape rectangle(sf::Vector2f(120.f, 50.f));
        rectangle.setOutlineThickness(2.f);
        rectangle.setOutlineColor(sf::Color::White);
        rectangle.setFillColor(sf::Color(0,0,0,0));
        rectangle.setPosition(pos.x, pos.y);
        window.draw(rectangle);
        pos += vel;
        
        window.display();
    }
}

