
//
// Disclaimer:
// ----------
//
// This code will work only if you selected window, graphics and audio.
//
// Note that the "Run Script" build phase will copy the required frameworks
// or dylibs to your application bundle so you can execute it on any OS X
// computer.
//
// Your resource files (images, sounds, fonts, ...) are also copied to your
// application bundle. To get the path to these resources, use the helper
// function `resourcePath()` from ResourcePath.hpp
//

#include <fstream>
#include <iostream>
#include <cctype>
#include <string>
#include <SFML/Audio.hpp>
#include <SFML/Graphics.hpp>
#include "player.h"

//The directions for a player
sf::Vector2f up = sf::Vector2f(0, -1);
sf::Vector2f down = sf::Vector2f(0,1);
sf::Vector2f right = sf::Vector2f(1, 0);
sf::Vector2f left = sf::Vector2f(-1, 0);


int main(){
    //Creating the map

    //Imports text file
    std::ifstream map("/Users/JulianVidal/Documents/terminal-code/Pac-man/Pac-man/map.txt");
    
    //Declares the texture for the sprite
    sf::Texture tileTexture;
    //Declares the sprite that will have the texture
    sf::Sprite tiles;
    
    //Tiles of the map
    sf::Vector2i mapArr[100][100];
    sf::Vector2i loadCounter = sf::Vector2i(0, 0);
    
    if (map.is_open()) {
        
        //Declares the string that will hold the location of the image with the texture
        //std::string mapImage;
        
        //Gives the string mapImage the image location
        //map >> mapImage;
        std::ifstream mapImage("/Users/JulianVidal/Documents/terminal-code/Pac-man/Pac-man/wall.png");
                     
        //Loads the image texture into tileTexture
        //tileTexture.loadFromFile(mapImage);
        
        //Sets the texture of the sprite
        tiles.setTexture(tileTexture);
        
        while (!map.eof()) {
            //Declares the string were the tiles of the txt file will be stored
            std::string tiles;
            
            //Stores the txt files tiles into the string
            map >> tiles;
            
            //Storing the cordinates of the tiles into variables
            char x = tiles[0];
            char y = tiles[2];
            
            //Checks if the tiles has a cordinate
            if (!isdigit(x) || !isdigit(y)) {
                
                //If tile doesn't have a cordinate then it doesn't give it one
                mapArr[loadCounter.x][loadCounter.y] = sf::Vector2i(-1, -1);
                
            }
            else {
                
                //If tile does have a cordinate then it gives it one
                mapArr[loadCounter.x][loadCounter.y] = sf::Vector2i(x - '0', y - '0');
                
            }
            
            if (map.peek() == '\n') {
                
                //Where to place the tiles on the array if there is a new line
                loadCounter.x = 0;
                loadCounter.y++;
                
            }
            else {
                
                //Where to place the tiles on the array if you aren't done with current line
                loadCounter.x++;
                
            }
        }
        loadCounter.y++;
    } else {
        std::cout << "It failed again!\n\n";
    }
    
    //Creates main window
    sf::RenderWindow window(sf::VideoMode(600, 600), "Pac-Man");
    
    //Sets Vsync one
    window.setVerticalSyncEnabled(true);
    
    //Creates the player
    player pac;
    
    //Window continous loop
    while (window.isOpen()){
        
        //Puts the events in a variable
        sf::Event event;
        
        while (window.pollEvent(event)) {
            
            //Checks wether or not the user has closed the window
            if (event.type == sf::Event::Closed) {
                
                window.close();
                
            }
            
            //Checks what keys the user has pressed
            if (event.type == sf::Event::KeyPressed) {
                
                if (event.key.code == sf::Keyboard::Right) {
                    
                    pac.vel = right;
                    
                }
                if (event.key.code == sf::Keyboard::Left) {
                    
                    pac.vel = left;
                    
                }
                if (event.key.code == sf::Keyboard::Up) {
                    
                    pac.vel = up;
                    
                }
                if (event.key.code == sf::Keyboard::Down) {
                    
                    pac.vel = down;
                    
                }
            }
        }
        
        //Window functions

        //Background, clears the screen
        sf::Color color(15, 15, 15);
        window.clear(color);
        
        //Loops that will go throgh the map array
        for (int x = 0; x < loadCounter.x; x++)
        {
            for (int y = 0; y < loadCounter.y; y++)
            {
                if (mapArr[x][y].x != -1 && mapArr[x][y].y != -1) {
                    //Sets the position of each tile
                    tiles.setPosition((x * 16), (y * 16));
                    //Sets the texture for the tiles based on the map array
                    tiles.setTextureRect(sf::IntRect((mapArr[x][y].x * 16), (mapArr[x][y].y * 16), 16, 16));
                    //Draws the sprite
                    window.draw(tiles);
                }
            }
        }
        
        //Updates the position of the player
        pac.update();
        
        //Draws player on the window
        window.draw(pac.body);
        
        //Shows the frame of the window
        window.display();
        
    }
}
