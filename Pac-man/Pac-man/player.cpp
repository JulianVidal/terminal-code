#include "player.h"
#include <iostream>
#include </usr/local/include/SFML/Graphics.hpp>


player::player(){
    //Prints to the console if the function ran and a player has been created
    std::cout << "New player has been created\n";
    
    //Defines the shapes of the player
    this->body = sf::CircleShape(5.f);
    body.setFillColor(sf::Color::Yellow);
    
    //Defines the position of the player
    this->pos = sf::Vector2f(100, 100);
    //Defines the velocity of the player
    this->vel = sf::Vector2f(0, 0);
}

void player::update() {
    //Changes the player's position
    pos += vel;
    //Updates the player's postion
    body.setPosition(pos.x, pos.y);
}


