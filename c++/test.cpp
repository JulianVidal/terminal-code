#include <curses.h>
#include <iostream>
#include <vector>
#include <stdlib.h>


int main()
{
    initscr();
    clear();
    noecho();
    cbreak();
    curs_set(0);

    clear();
    int height = 10;
    int width = 10;
    int stagex = 0;
    int stagey = 0;
    int playerHealth = 10;
    int playerDamage = 10;
    int enemyState = 0;
    int enemyHealth = 10;
    int enemyDamage = 10; 
    
    std::vector<int> playerPos;
    playerPos.push_back(0);
    playerPos.push_back(0);
    std::vector<int> chestPos;
    chestPos.push_back(0);
    chestPos.push_back(0);

    std::vector<int> enemyPos;
    enemyPos.push_back(0);
    enemyPos.push_back(0);

    std::vector<int> traderPos;
    traderPos.push_back(0);
    traderPos.push_back(0);

    std::string groundChar = "#";
    std::string playerChar = "o";
    std::string enemyChar = "€";
    std::string chestChar = "@";
    std::string traderChar = "$";
    std::string deadEnemyChar = "#";

    /*std::string groundChar    = "🌿";
  std::string playerChar    = "🤠";//😮
  std::string enemyChar     = "👹";

  std::string deadEnemyChar = "💀";  std::string chestChar     = "📦";
  std::string traderChar    = "💰";*/

    int positiony = 0;

    for (int j = 0; j < height; j++)
    {

        int positionx = 0;

        for (int i = 0; i < width; i++)
        {

            if ((playerPos[0] - (stagex * width)) == positionx && playerPos[1] - (stagey * height) == positiony)
            {
                //std::cout << playerChar;
                mvprintw(5, 6, "5, 6");
                mvprintw(0, 0, "0, 0");
            }
            else if (positionx == (enemyPos[0]) && positiony == (enemyPos[1]))
            {

                if (enemyState == 0)
                {

                    //std::cout << enemyChar;
                }
                else
                {

                    //std::cout << deadEnemyChar;
                }
            }
            else if (positionx == (chestPos[0]) && positiony == (chestPos[1]))
            {

                //std::cout << chestChar;
            }
            else if (positionx == traderPos[0] && positiony == traderPos[1] && stagex % 10 == 0 && stagey % 10 == 0)
            {

                //std::cout << traderChar;
            }
            else
            {

                //std::cout << groundChar;
            }

            positionx++;
        }

        //std::cout << std::endl;

        positiony++;
    }
    refresh();
    return 0;
}
