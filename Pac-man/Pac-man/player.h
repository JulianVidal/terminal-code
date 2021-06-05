	//
//  player.hpp
//  Pac-man
//
//  Created by Julian Camilo on 4/1/19.
//  Copyright © 2019 Julian Camilo. All rights reserved.
//

#include </usr/local/include/SFML/Graphics.hpp>

class player {
public:
    //Constructor function
    player();
    
    //Variables for the constructor
    sf::CircleShape body;
    sf::Vector2f pos;
    sf::Vector2f vel;
    
    //Functions for the constructor
    void update();
};

