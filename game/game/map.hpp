#include <iostream>
#include <stdlib.h>
#include <ncurses.h>

/*
  It prits the map on the screen
  Height of the map
  Width of the map
  Player position
  Chest position
  Enemy position
  enemy state(alive 0 or dead 1)
  merchant position
  */
void terrain(
              int height,
              int width,
              int stagex,
              int stagey,
              std::vector<int> playerPos,
              std::vector<int> chestPos,
              std::vector<int> enemyPos,
              int enemyState,
              std::vector <int> traderPos
            )
            {


  //Holds the char that is going to be printed for a player, chest, enemy and trader
  const char *groundChar     = "#";
  const char *playerChar     = "o";
  const char *chestChar      = "@";
  const char *enemyChar      = "E";
  const char *traderChar     = "$";
  const char *deadEnemyChar  = "#";

  /*std::string groundChar    = "🌿";
  std::string playerChar    = "🤠";//😮
  std::string enemyChar     = "👹";

  std::string deadEnemyChar = "💀";  std::string chestChar     = "📦";
  std::string traderChar    = "💰";*/

  //Keeps track of what y axis the loop is on
  int positiony = 0;

  //Loops through the y axis
  for (int j = 0; j < height; j++) {

    //Keeps track of the x axis the loop is on
    int positionx = 0;

    //Loops through the x axis
    for (int i = 0; i < width; i++) {

      //Checks if the position of the player matches the position the loop is on
      if ((playerPos[0] - (stagex * width)) == positionx && playerPos[1] - (stagey * height) == positiony) 
      
      {

        //Prints the player character
        mvprintw(positiony, positionx, "%s", playerChar);

      } 
      
      //Checks if the enemy position matches the loop position
      else if (positionx ==  (enemyPos[0]) && positiony ==  (enemyPos[1])  ) 
      
      {

          if (enemyState == 0) 
          
          {

            //Prints enemy char
            mvprintw(positiony, positionx, "%s", enemyChar);

          } 
          
          else 
          
          {

            //Prints dead enemy char
            mvprintw(positiony, positionx, "%s", groundChar);
          
          }

      } 
      
      //Checks if the position of the chest matches the position of the loop
      else if (positionx ==  (chestPos[0]) && positiony ==  (chestPos[1]) )
      
      {

        //Prints the chest character
        mvprintw(positiony, positionx, "%s", chestChar);

      } 
      
      //Checks if the position of the trader macthes the position of the loop
      else if (positionx == traderPos[0] && positiony == traderPos[1] && stagex % 10 == 0 && stagey % 10 == 0) 
      
      {

        //Prints trader char
        mvprintw(positiony, positionx, "%s", traderChar);

      } 
      
      else 
      
      {

        //Prints the char of the ground
        mvprintw(positiony, positionx, "%s", groundChar);

      }

      positionx++;

    }

    positiony++;

  }

}
