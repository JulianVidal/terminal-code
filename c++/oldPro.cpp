#include <iostream>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string>
#include <vector>
#include <time.h>
#include <math.h>
#include <cstdlib>
#include <ncurses.h>
#include "map.hpp"
#include "chest.hpp"
#include "enemy.hpp"
#include "warrior.hpp"
#include "object.hpp"
#include "merchant.hpp"
//include "stage.hpp"

//Height and width of the map(marked with #)
#define HEIGHT 5
#define WIDTH  7

int gameOver = 0;

bool inventoryShow = false;

bool mapShow = true;

bool statsShow = false;

bool selectShow = false;

bool useShow = false;

bool interactShow = false;

bool openChestShow = false;

bool hitEnemyShow = false;

bool sellShow = false;

bool buyShow = false;

int choice;

int type;

//The string that will hold the text that the player will enter
std::string action;

//All the strings that will result on an output

//This strings stops the recursion loop
std::string stopAction          =   "stop";

//The next four strings will move the character 'o' on the screen
std::string upAction            =   "up";
std::string downAction          =   "down";
std::string rightAction         =   "right";
std::string leftAction          =   "left";

//This string will open the chest
std::string openChestAction     =   "open_chest";

//This string will show the inventory
std::string inventoryAction     =   "inventory";
std::string healthAction        =   "health";
std::string damageAction        =   "damage";
std::string statsAction         =   "stats";

std::string hitAction           =   "hit";
std::string useAction           =   "use";
std::string hotBarAction        =   "hotbar";
std::string qualityAction       =   "quality";

std::string tradeAction         =   "trade";

std::string balanceAction       =   "balance";

std::string typesOfItems[]  =  {"Potion", "Item", "useItem", "Currency"};
std::string quality[]       =  {"Excellent", "Good", "Ok", "Bad", "Almost broken"};
int qualityAmount = (sizeof(quality)/sizeof(quality[0]));


object items[]   =    {
                                 object(
                                  "Iron Sword",
                                  0,
                                  3,
                                  typesOfItems[2],
                                  3,
                                  quality[rand() % qualityAmount]
                                ),

                                  object(
                                    "Golden Sword",
                                    0,
                                    2,
                                    typesOfItems[2],
                                    2,
                                    quality[rand() % qualityAmount]
                                  ),

                                  object(
                                    "Golden Coin",
                                    0,
                                    0,
                                    typesOfItems[3],
                                    1
                                  ),

                                  object(
                                    "Health Potion",
                                    1,
                                    0,
                                    typesOfItems[0],
                                    2
                                  ),
                                  object(
                                    "Piece of flesh",
                                    0,
                                    0,
                                    typesOfItems[1],
                                    1
                                  ),

                                  object(
                                    "Eye",
                                    0,
                                    0,
                                    typesOfItems[1],
                                    1
                                  )
                              };


//Declares and initilizes an array of strings that will hold the items that will appear on the chest when opened
object  chestContent[]      =  {
                                 items[0],

                                  items[1],

                                  items[2],

                                  items[3]
                              };

object  enemyContent[]      =  {
                                  items[4],
                                  items[5]
                                };

  std::vector <object> buyItems;




//An empty array that will hold an item and how many of that items there are

std::vector <object> inventory;

std::vector <int>    inventoryQuantity;

std::vector <object> hotBar;


//The stage the player is currently on
int currentStage[]  =  {0, 0};


//A vector of a vector that will hold stagex and stagey
std::vector< std::vector<int> > stagesVisited;

//The initial position of the player, the player will start at this position
warrior player((WIDTH / 2), (HEIGHT / 2));


//Hold the value if the setup has happened or not (0 or 1)
int setupBool = 0;

int stepsBool = 0;

int currentChest[]  = {0 , 0};

int currentEnemy[]  = {0 , 0};

int currentTrader[] = {0 , 0};

//A vector that will hold all the chests
std::vector< std::vector <merchant> > tradersVec;
std::vector< std::vector <chest> > chestsVec;
std::vector< std::vector <enemy> > enemyVec;

int checkInventory(object item) {
  for (int k = 0; k < inventory.size(); k++) {
    if (item.getName().compare(inventory[k].getName()) == 0) {
      int amountOfItem = inventoryQuantity[k];
      return amountOfItem;
      break;
    }
  }
  return 0;
}

void removeItemFromInventory(object item, int amount) {

  for (int j = 0; j < inventory.size(); j++) {
    if (inventory[j].getName().compare(item.getName()) == 0) {
      inventoryQuantity[j] -= amount;
      if (inventoryQuantity[j] <= 0) {
        inventoryQuantity.erase(inventoryQuantity.begin() + j);
        inventory.erase(inventory.begin() + j);
      }
      break;
    }
  }
}

void inventoryPrint(int usePrint = 0) {
  int count = 0;
  for (int q = 0; q < inventory.size(); q++) {
    const char *quality       =  inventory[q].getQuality().c_str();
    const char *itemName      =  inventory[q].getName().c_str();
    int         itemQuantity  =  inventoryQuantity[q];
    if (usePrint == 1) {

      if (inventory[q].getQuality().compare("none") != 0)
      {

        mvprintw(q + 1, 0, "%d: %s %s %d ", q, quality, itemName, itemQuantity);
      }
      else
      {

        mvprintw(q + 1, 0, "%d: %s %d ",q , itemName, itemQuantity);
      }
    } else {
      if (inventory[q].getQuality().compare("none") != 0)
      {

        mvprintw(q + 1, 0, "%s %s %d ", quality, itemName, itemQuantity);
      }
      else
      {

        mvprintw(q + 1, 0, "%s %d ", itemName, itemQuantity);
      }
    }



  
    //std::cout << inventory[q].getName() << " (" << inventoryQuantity[q] << ")" << std::endl;
    count++;
  }

  if (hotBar.size() > 0)
  {
    const char *hotbarItem = hotBar[0].getName().c_str();
    const char *hotbarQuality = hotBar[0].getQuality().c_str();

    mvprintw(count + 2, 0, "In your hotbar: ");
  
    mvprintw(count + 3, 0, "%s %s", hotbarQuality, hotbarItem);

  }
}

int checkString(std::string str) {
  /*int boolean;

  for (int w = 0; w < str.size(); w++) {

    if (std::isdigit(str[w]) == 1) {
      boolean = 1;
    }

    if (std::isdigit(str[w]) != 1) {

      boolean = 0;

      break;
    }

  }

  if (boolean == 0) {
    return -1;
  } else {
    return std::stoi(str);
  }*/

  return 1;
}

void terrainFunc() {

  /*for (int s = 0; s < 50; s++) {
    std::cout << std::endl;
  }*/

  terrain(
    HEIGHT,
    WIDTH,
    currentStage[0],
    currentStage[1],
    player.getPos(),
    // player.getHealth(),
    // player.getDamage(),
    chestsVec[currentChest[0]][currentChest[1]].getPos(),
    enemyVec[currentEnemy[0]][currentEnemy[1]].getPos(),
    enemyVec[currentEnemy[0]][currentEnemy[1]].getState(),
    // enemyVec[currentEnemy[0]][currentEnemy[1]].getHealth(),
    // enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage(),
    tradersVec[currentTrader[0]][currentTrader[1]].getPos()
  );

  /*if (stepsBool == 1) {
    std::cout << "Too many steps" << std::endl;
  }
  std::cout << std::endl;*/
  for (int d = 0; d < player.getHealth(); d++) {
    mvprintw(HEIGHT, d, "H"); //💚
  }
  std::cout << std::endl;

  if (hotBar.size() > 0) {
    for (int d = 0; d < hotBar[0].getDamage(); d++) {
      mvprintw(HEIGHT + 1, d, "W"); //⚔
    }
  } else {
    for (int d = 0; d < player.getDamage(); d++) {
      mvprintw(HEIGHT + 1, d, "W"); //⚔
    }
  }

  //std::cout << std::endl;
}

void randomItemQuality() {
  for (int v = 0; v < sizeof(items)/sizeof(items[0]); v++) {
    items[v].randomQuality();
  }
  object chestContent[]      =  {
                               items[0],

                                items[1],

                                items[2],

                                items[3]
                              };

  object enemyContent[]     =  {
                              items[4],
                              items[5]
                        };
}

//Setsup the board by giving its first chest and enemy
void setup() {

  initscr();
  clear();
  noecho();
  cbreak();
  curs_set(0);

  //Changes the seed of random
  srand(time(0));

  randomItemQuality();

  buyItems.push_back(items[0]);
  buyItems.push_back(items[1]);
  buyItems.push_back(items[3]);


  std::vector <merchant> traderNewVec;
  traderNewVec.push_back(merchant((WIDTH / 2), 0, buyItems));
  tradersVec.push_back(traderNewVec);

  std::vector <chest> chestNewVec;
  chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));
  if (chestNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {

    chestNewVec.erase(chestNewVec.begin());
    chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

  }

  //Pushes a new chest into the chest vector
  chestsVec.push_back(chestNewVec);

  std::vector <enemy> enemyNewVec;
  enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

  //Pushes a new enemy into the enemy vector

  if (enemyNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {

    enemyNewVec.erase(enemyNewVec.begin());
    enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

  }

  enemyVec.push_back(enemyNewVec);

  if (enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[0] == chestsVec[currentChest[0]][currentChest[1]].getPos()[0] && enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[1] == chestsVec[currentChest[0]][currentChest[1]].getPos()[1]) {

    enemyVec[currentEnemy[0]][currentEnemy[1]].setPos(round(chestsVec[currentChest[0]][currentChest[1]].getPos()[0]/2) , round(chestsVec[currentChest[0]][currentChest[1]].getPos()[1]/2));

  }


  inventory.push_back(object("Health Potion", 1, 0, typesOfItems[0], 2));
  inventory.push_back(object("Golden Sword", 0, 2, typesOfItems[2], 2, quality[0]));
  inventory.push_back(object("Iron Sword", 0, 3, typesOfItems[2], 3, quality[0]));
  inventoryQuantity.push_back(20);
  inventoryQuantity.push_back(20);
  inventoryQuantity.push_back(20);

  //Pushes the first visited currentStage which is the one we start with(0, 0)
  std::vector<int> vec(2, 0);
  stagesVisited.push_back(vec);

  //Changes the value of setup so the statement only runs once
  setupBool = 1;
}

//Checks the player is on a new stage, if so it will add a chest and enemy
void checkStage() {

  //Hold the value of whether or not the player is on a new stage
  int newStage = 0;

  //Iterates through the stages that have already been visited
  for (int h = 0; h < stagesVisited.size(); h++) {

    //Checks if the stage the player is on is
    if (currentStage[0] != stagesVisited[h][0] || currentStage[1] != stagesVisited[h][1])
    {
      //Adds to newStage if the current stage is different from one of the stages visited
      newStage++;

    }
  }

  //If newstage's value is equal to the amount of stage visited then it is a new stage
  if (newStage == stagesVisited.size()) {
    randomItemQuality();
    if (currentStage[0] % 10 == 0 && currentStage[1] % 10 == 0) {

      std::vector <merchant> traderNewVec;
      traderNewVec.push_back(merchant((WIDTH / 2), 0, buyItems));
      tradersVec.push_back(traderNewVec);
    }
    //Adds a new chest to the chests vector
    if (currentStage[0] >= chestsVec.size()) {

      std::vector <chest> chestNewVec;
      chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

      if (chestNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {

        chestNewVec.erase(chestNewVec.begin());
        chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

      }

      //Pushes a new chest into the chest vector
      chestsVec.push_back(chestNewVec);

      std::vector <enemy> enemyNewVec;
      enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT, (currentStage[0] + currentStage[1])));

      if (enemyNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {

        enemyNewVec.erase(enemyNewVec.begin());
        enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

      }

      enemyVec.push_back(enemyNewVec);



    } else {

      chestsVec[currentStage[0]].push_back(chest(rand() % WIDTH, rand() % HEIGHT));

      enemyVec[currentStage[0]].push_back(enemy(rand() % WIDTH, rand() % HEIGHT, currentStage[0]));
    
    }



    if (enemyVec[currentEnemy[0]][currentEnemy[1]].getPos() == chestsVec[currentChest[0]][currentChest[1]].getPos()) {
      enemyVec[currentEnemy[0]][currentEnemy[1]].setPos(round(chestsVec[currentChest[0]][currentChest[1]].getPos()[0]/2) , round(chestsVec[currentChest[0]][currentChest[1]].getPos()[1]/2));
    }

    //Pushes the current stage into the stagesVisited vector
    std::vector<int> vec;
    vec.push_back(currentStage[0]);
    vec.push_back(currentStage[1]);
    stagesVisited.push_back(vec);
  }

  int extra = (abs(currentStage[1]) - stagesVisited[currentStage[0]].size());
  std::cout << extra;
  for (int h = 0; h < extra; h++)
  {
    chestsVec[currentStage[0]].push_back(chest(rand() % WIDTH, rand() % HEIGHT));

    enemyVec[currentStage[0]].push_back(enemy(rand() % WIDTH, rand() % HEIGHT, currentStage[0]));
  }
}

void addToInventory(object item) {

  //repeat keeps track if the item has already been picked up(to stack it)
  int repeat = 0;

  //Holds the index of the item that repeated
  int repeatIndex;

  //Holds the true(1) or false(0) if the item is the first to be repeated
  int first = 0;

  //The amount of one item will always start at 1
  inventoryQuantity.push_back(1);

  for (int n = 0; n < inventory.size(); n++) {

    //Checks if the inventory has the item we have picked up
    if (inventory[n].getName() == item.getName() && inventory[n].getQuality() == item.getQuality()) {

      //Checks if it is the first one
      if (first == 0) {

        //Stores the repeated item index
        repeatIndex = n;

        //Changes first so it doesn't run again
        first = 1;

      }

      //Adds one to repeat
      repeat += 1;

    }

  }

  //Adds repeat to the amount of the inventory
  if (first == 1) {

    repeat = repeat + inventoryQuantity[repeatIndex];

    inventoryQuantity[repeatIndex] = repeat;

  }

  //If there is no repeat then adds one
  if (repeat == 0) {

    inventory.push_back(item);

  }
}

//Opens the chest, adds items into inventory
void openChest() {

      //Checks if the position of the player is on top of the position of the chest
      if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == chestsVec[currentChest[0]][currentChest[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == chestsVec[currentChest[0]][currentChest[1]].getPos()[1])
  {
    openChestShow = true;
    interactShow = false;

    //Checks if that chest has been opened
    if (chestsVec[currentChest[0]][currentChest[1]].getState() == 0){

      //Prints
      //std::cout << "You have opened a chest" << std::endl;
      mvprintw(0, 0, "You have opened a chest");
      //itemsPrinted++;

      for (int i = 0; i < (rand() % 3) + 1; i++){

        //srand(time(0));
        int currentItemIndex = rand() % sizeof(chestContent)/sizeof(chestContent[0]);

        //Prints what is on the chest based on the currentItemIndex
        //std::cout << "You have gotten a ";
        const char *itemName    = chestContent[currentItemIndex].getName().c_str();
        const char *itemQuality = chestContent[currentItemIndex].getQuality().c_str();

            if (chestContent[currentItemIndex].getQuality().compare("none") != 0)
        {

          //std::cout << chestContent[currentItemIndex].getQuality() << " ";

          mvprintw(i + 2, 0, "You have gotten %s %s", itemQuality, itemName);
        } else {

          mvprintw(i + 2, 0, "You have gotten %s", itemName);
        }

        //std::cout << chestContent[currentItemIndex].getName() << std::endl;

        addToInventory(chestContent[currentItemIndex]);

      }
      //Changes the state of the chest to opened
      chestsVec[currentChest[0]][currentChest[1]].setState(1);
    } else {

      mvprintw(0, 0, "You have already opened this chest.");
      //std::cout << "You have already opened this chest." << std::endl;

    }


  } else {

    //std::cout << "Why are you opening a chest when there isn't one?" << std::endl;
    mvprintw(0, 0, "Nothing to interact with");
  }

}

//Hits enemy, substract healths from enemy and player
void hitEnemy() {
  int spaceCount = 0;
  if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[1] && enemyVec[currentEnemy[0]][currentEnemy[1]].getState() == 0){
    hitEnemyShow = true;
    interactShow = false;

    if (hotBar.size() > 0) {
      enemyVec[currentEnemy[0]][currentEnemy[1]].changeHealth(-hotBar[0].getDamage());

      mvprintw(spaceCount, 0, "- %d health to the enemy ", hotBar[0].getDamage());
      spaceCount++;
      //std::cout << "-" << hotBar[0].getDamage() << " health to the enemy" << std::endl;

      int qualityIndex;
      for (qualityIndex = 0; qualityIndex < (sizeof(quality)/sizeof(quality[0])); qualityIndex++) {

        if (quality[qualityIndex].compare(hotBar[0].getQuality()) == 0) {
          break;
        }

      }

      qualityIndex++;

      //std::cout << std::endl;
      spaceCount++;

      const char *hotBarItemName = hotBar[0].getName().c_str();
      const char *hotBarItemQuality = hotBar[0].getQuality().c_str();
      if (qualityIndex + 1 >= (sizeof(quality)/sizeof(quality[0])) ) {
        mvprintw(spaceCount, 0, "Your %s has broken", hotBarItemName);
        spaceCount++;
        //std::cout << "Your " << hotBar[0].getName() << " has broken" << std::endl;
  
        hotBar.erase(hotBar.begin());

      } else {

        hotBar[0].setQuality(quality[qualityIndex]);
        const char *newQuality = quality[qualityIndex].c_str();
        mvprintw(spaceCount, 0, "The quality of your %s has been lowered to %s", hotBarItemName, newQuality);
        spaceCount++;
        //std::cout << "The quality of your " << hotBar[0].getName() << " has been lowered to " << hotBar[0].getQuality() << std::endl;
      }


    } else {

      enemyVec[currentEnemy[0]][currentEnemy[1]].changeHealth(-player.getDamage());
      mvprintw(spaceCount, 0, "- %d health to the enemy ", player.getDamage());
      spaceCount++;
      //std::cout << "-" << player.getDamage() << " health to the enemy" << std::endl;

    }


    if (enemyVec[currentEnemy[0]][currentEnemy[1]].getHealth() <= 0) {
      enemyVec[currentEnemy[0]][currentEnemy[1]].setState(1);

      //std::cout << std::endl;
      spaceCount++;

      mvprintw(spaceCount, 0, "The enemy has perished");
      spaceCount++;
      //std::cout << "The enemy has perished" << std::endl;

      //std::cout << std::endl;
      spaceCount++;

      mvprintw(spaceCount, 0, "Reek the profits");
      spaceCount++;
      //std::cout << "Reek the profits" << std::endl;

      //currentItemIndex will hold which string on the chest content array will be selcted
      int currentItemIndex = rand() % sizeof(enemyContent)/sizeof(enemyContent[0]);
      const char *itemName = enemyContent[currentItemIndex].getName().c_str();
      //Prints what is on the chest based on the currentItemIndex
      mvprintw(spaceCount, 0, "You have gotten ");
      spaceCount++;

      mvprintw(spaceCount, 0, "%s", itemName);
      spaceCount++;
      //std::cout << "You have gotten " << enemyContent[currentItemIndex].getName() << std::endl;

      addToInventory(enemyContent[currentItemIndex]);
    } else {

      int enemyDamageToPlayer = -enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage();
      player.changeHealth(enemyDamageToPlayer);

      terrainFunc();

      mvprintw(spaceCount, 0, "The enemy has dealth %d damage", enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage());
      spaceCount++;
      //std::cout << "The enemy has dealt " << enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage() << " damage" << std::endl;


      if (player.getHealth() <= 0) {
        clear();
        //std::cout << std::endl;

        mvprintw(0, 0, "You have perished with ");
        spaceCount++;
        //std::cout << "You have perished with" << std::endl;

        for (int q = 0; q < inventory.size(); q++) {
          const char *inventoryItemName = inventory[q].getName().c_str();
          int itemQuantity = inventoryQuantity[q];
          mvprintw(spaceCount + q, 0, "%s (%d)", inventoryItemName, itemQuantity);
          //std::cout << inventory[q].getName() << " (" << inventoryQuantity[q] << ")" << std::endl;

        }

        gameOver = 1;
      }
    }

  } else {

    //std::cout << "I see no enemy here" << std::endl;

  }

}

void usePrint()
{
  useShow = true;
  selectShow = false;

  if (choice >= inventory.size())
  {
    mvprintw(0, 0, "Nothing there");
  } 
  else
  {
    const char *itemName = inventory[choice].getName().c_str();
    const char *itemQuality = inventory[choice].getQuality().c_str();

    int itemHealth = inventory[choice].getHealth();
    int itemDamage = inventory[choice].getDamage();


    if (inventory[choice].getQuality().compare("none") != 0 ) {

      mvprintw(0, 0, "You are wielding %s %s", itemQuality, itemName);
      
    } else {
      
      mvprintw(0, 0, "You used %s", itemName);

    }
  
    if (itemHealth > 0) {
      player.changeHealth(itemHealth);
      inventoryQuantity[choice]--;
      mvprintw(1, 0, "You now have %d more health", itemHealth);
    }

    if (itemDamage > 0) {
        hotBar.push_back(inventory[choice]);
        inventoryQuantity[choice]--;

        if (hotBar.size() > 1) {
          addToInventory(hotBar[0]);
          hotBar.erase(hotBar.begin());
        }
      
        mvprintw(1, 0, "You now do %d more damage", itemDamage);
    }

  }
}

void use() {
  
  std::string useItemIndex;

  std::cout << "Which one will you use? " << std::endl;

  std::cout << std::endl;

  inventoryPrint(1);

  std::cout << std::endl;

  std::cout<< "Use: ";
  std::cin >> useItemIndex;

  terrainFunc();

  if (useItemIndex.compare(stopAction) == 0) {
    gameOver = 1;
  }

  int useItemIndexInt = checkString(useItemIndex);

  if (useItemIndexInt >= inventory.size()) {

    std::cout << "No item there";

  } else {

    int objectHealth = inventory[useItemIndexInt].getHealth();
    int objectDamage = inventory[useItemIndexInt].getDamage();

    std::cout << "You are using the item ";
    if (inventory[useItemIndexInt].getQuality().compare("none") != 0) {
      std::cout << inventory[useItemIndexInt].getQuality() << " ";
    }

    std::cout << inventory[useItemIndexInt].getName() << std::endl;

    if (objectHealth > 0) {
      player.changeHealth(objectHealth);
      inventoryQuantity[useItemIndexInt]--;
      terrainFunc();
      std::cout << "You have gotten " << objectHealth << " extra health" << std::endl;


    }
    if (inventory[useItemIndexInt].getDamage() > 0) {

      if (hotBar.size() > 0) {
        //  if (hotBar[0].getName().compare(inventory[useItemIndexInt].getName()) == 0) {

        //  std::cout << "You already have this item in your hotbar" << std::endl;

        //} else {

        hotBar.push_back(inventory[useItemIndexInt]);
        inventoryQuantity[useItemIndexInt]--;

        if (hotBar.size() > 1) {
          object arrHotBar[] = {hotBar[0]};

          addToInventory(arrHotBar[0]);

          hotBar.erase(hotBar.begin());

        }

        terrainFunc();

        std::cout << "You now do " << objectDamage << " damage" << std::endl;


        //}

      } else {

        hotBar.push_back(inventory[useItemIndexInt]);
        inventoryQuantity[useItemIndexInt]--;
        terrainFunc();

        std::cout << "You now do " << objectDamage << " damage" << std::endl;
      }

    }

    if (inventoryQuantity[useItemIndexInt] == 0) {
      inventory.erase(inventory.begin() + useItemIndexInt);
      inventoryQuantity.erase(inventoryQuantity.begin() + useItemIndexInt);
    }

  }
  
}

void sell() {
  int count = 0;
  if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[1])
  {
    sellShow = true;
    selectShow = false;
    if (choice >= inventory.size()) {
      mvprintw(count, 0, "Nothing to sell");
      count++;
    } else {
      const char *itemName = inventory[choice].getName().c_str();
      const char *itemQuality = inventory[choice].getQuality().c_str();

      if (inventory[choice].getQuality().compare("none") != 0)
      {
        mvprintw(count, 0, "You sold a %s %s", itemQuality, itemName);
      }
      else
      {

        mvprintw(count, 0, "You sold a %s", itemName);
      }
      count++;

      int itemValue = inventory[choice].getValue();

      mvprintw(count, 0, "For %d golden coins", itemValue);
      count ++;

      for (int i = 0; i < itemValue; i++)
      {
        addToInventory(chestContent[2]);
      }
      
    }

    //int sellItemIndexInt;
    //std::string sellItemIndex;

    //std::cout << std::endl;
    //std::cout << "Item: ";
    //std::cin >> sellItemIndex;

    //terrainFunc();

    //int sellIndexInt = checkString(sellItemIndex);

    //if (sellItemIndex.compare(stopAction) == 0) {
    //  gameOver = 1;
    //}

    //if (sellIndexInt < inventory.size()) {

    //std::cout << "You have sold a ";

    //if (inventory[sellIndexInt].getQuality().compare("none") != 0) {

      //std::cout << inventory[sellIndexInt].getQuality() << " ";

  //  }

    //std::cout << inventory[sellIndexInt].getName() << std::endl;

    //removeItemFromInventory(inventory[sellIndexInt], 1);

    //for (int q = 0; q < inventory[sellIndexInt].getValue(); q++) {
      //addToInventory(chestContent[2]);
  //  }

  //} else {
    //std::cout << "No Item there." << std::endl;

  //}
  }
}

void buy() {
  int count;

  if (choice < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size())
  {
    buyShow = true;
    selectShow = false;
    int coinAmount = checkInventory(items[2]);

    if (coinAmount >= tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getValue())
    {
      mvprintw(count, 0, "You have bought");
      count++;

      const char *itemName = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getName().c_str();
      const char *itemQuality = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getQuality().c_str();

      if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getQuality().compare("none") != 0)
      {
        mvprintw(count, 0, "You bought %s %s", itemQuality, itemName);
      }
      else
      {

        mvprintw(count, 0, "You bought %s", itemName);
      }
      count++;

      addToInventory(tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice]);
      removeItemFromInventory(items[2], tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getValue());
    
    } else {
      
      mvprintw(count, 0, "Not enough money");
      count++;
    }
  } else {
    mvprintw(count, 0, "No item there");
    count++;
  }
    /*
  int buyItemIndexInt;
  std::string buyItemIndex;

  std::cout << std::endl;
  std::cout << "Item: ";
  std::cin >> buyItemIndex;

  terrainFunc();

  int buyIndexInt = checkString(buyItemIndex);

  if (buyItemIndex.compare(stopAction) == 0) {
    gameOver = 1;
  }

  if (buyIndexInt < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size()) {

    int coinAmount = checkInventory(items[2]);

  if (coinAmount >= tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt].getValue()) {
    std::cout << "You have bought ";

    if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt].getQuality().compare("none") != 0) {

      std::cout << tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt].getQuality() << " ";

    }

    std::cout << tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt].getName() << std::endl;

    addToInventory(tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt]);
    removeItemFromInventory(items[2], tradersVec[currentTrader[0]][currentTrader[1]].getItems()[buyIndexInt].getValue());

  } else {

    std::cout << "You don't have enough money" << std::endl;

  }

  } else {

    std::cout << "No Item there." << std::endl;

  }
  */

}

//All the actions that need to be shown after drawing the board
void printingActions() { 
  if (action.compare(balanceAction) == 0) {
    int balance = checkInventory(items[2]);
    std::cout << "You have a balance of " << balance << std::endl;
  }

  if (action.compare(tradeAction) == 0) {

    if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT) ) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[1]) {
      terrainFunc();

      std::string choice;
      std::cout << "Do you want to buy or sell: " << std::endl;

      std::cout << std::endl;

      std::cout << "Buy or Sell: ";
      std::cin >> choice;

      if (choice.compare("buy") == 0) {

        terrainFunc();

        std::cout << "What do you want to buy: " << std::endl;

        for (int e = 0; e < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size(); e++) {
          std::cout << e << ": ";
          if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality().compare("none") != 0) {
            std::cout << tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality() << " ";
          }
            std::cout << tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getName() << std::endl;
        }

        buy();

      } else if (choice.compare("sell") == 0) {

        terrainFunc();

        std::cout << "What do you want to sell: " << std::endl;

        inventoryPrint(1);

        sell();

      } else {

        printingActions();

      }
    } else {

      std::cout << "There is no trader here" << std::endl;

    }
  }

  if (action.compare(qualityAction) == 0) {

    if (hotBar.size() > 0) {

      std::cout << "The quality of your " << hotBar[0].getName() << " is " << hotBar[0].getQuality() << std::endl;

    } else {

      std::cout << "You first need an item in your hotbar" << std::endl;

    }

  }

  if (action.compare(hotBarAction) == 0) {
    if (hotBar.size() == 0) {

      std::cout << std::endl;
      std::cout << "No items in your hotbar" << std::endl;

    } else {

      std::cout << std::endl;
      std::cout << "In you hotbar you have: " << std::endl;
      std::cout << hotBar[0].getQuality() << " " << hotBar[0].getName() << std::endl;

    }
  }

  if (action.compare(statsAction) == 0) {

    std::cout << std::endl;

    std::cout << "Current stage: ";
    std::cout << " " << abs(currentStage[0]) << " " << abs(currentStage[1]) << std::endl;

    std::cout << std::endl;
    std::cout << "Enemy";
    if (enemyVec[currentEnemy[0]][currentEnemy[1]].getState() == 1) {
      std::cout << " (dead)";
    }
    std::cout << ": "<< std::endl;
    std::cout << "  Health: ";
    std::cout << "  " << enemyVec[currentEnemy[0]][currentEnemy[1]].getHealth() << std::endl;
    std::cout << "  Damage: ";
    std::cout << "  " << enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage() << std::endl;

    std::cout << std::endl;
    std::cout << "Player: " << std::endl;
    std::cout << "  Health: ";
    std::cout << " " << player.getHealth() << std::endl;
    std::cout << "  Damage: ";
    std::cout << " " << player.getDamage() << std::endl;

  }

  if (action.compare(damageAction) == 0) {
    std::cout << "You deal " << player.getDamage() << " damage" << std::endl;
    if (hotBar.size() > 0) {
      std::cout << "Your item deals " <<  hotBar[0].getDamage() << " damage" << std::endl;
    }
  }

  if (action.compare(healthAction)  ==  0) {
    std::cout << "You have " << player.getHealth() << " health." << std::endl;
  }

  if (action.compare(hitAction)  ==  0) {
    hitEnemy();
  }

  //Checks if the player has tried to open a chest
  if (action.compare(openChestAction)  ==  0) {

    openChest();

  }

  if (action.compare(inventoryAction)  ==  0) {

    std::cout << "In your inventory you have: " << std::endl << std::endl;

    inventoryPrint();

  }

  if (action.compare(useAction) == 0) {

    use();

  }
}

//All the actions that need to done before drawing the board to be smooth
void positionActions() {
  /*std::string stepsStr;
  int steps;

  if (action.compare(upAction)    ==  0) {

    std::cout << "How many steps: ";
    std::cin  >> stepsStr;

    steps = checkString(stepsStr);

    if (steps != -1) {

      if (steps > HEIGHT) {

        stepsBool = 1;
        steps = HEIGHT;
        std::cout << steps;

      } else {

        stepsBool = 0;

      }

      player.changePos(0, -steps);

    } else {

      positionActions();

    }
  }

  if (action.compare(downAction)  ==  0) {

        std::cout << "How many steps: ";
        std::cin  >> stepsStr;

        steps = checkString(stepsStr);

        if (steps != -1) {

          if (steps > HEIGHT) {

            stepsBool = 1;
            std::cout << "Too many steps" << std::endl;
            steps = HEIGHT;

          } else {

            stepsBool = 0;

          }

          player.changePos(0, steps);

        } else {

          positionActions();

        }
  }

  if (action.compare(rightAction) ==  0) {


        std::cout << "How many steps: ";
        std::cin  >> stepsStr;

        steps = checkString(stepsStr);

        if (steps != -1) {

          if (steps > WIDTH) {

            stepsBool = 1;
            std::cout << "Too many steps" << std::endl;
            steps = WIDTH;

          } else {

            stepsBool = 0;

          }

          player.changePos(steps, 0);

        } else {

          positionActions();

        }

  }

  if (action.compare(leftAction)  ==  0) {

            std::cout << "How many steps: ";
            std::cin  >> stepsStr;

            steps = checkString(stepsStr);

            if (steps != -1) {

              if (steps > WIDTH) {

                stepsBool = 1;
                std::cout << "Too many steps" << std::endl;
                steps = WIDTH;

              } else {

                stepsBool = 0;

              }

              player.changePos(-steps, 0);

            } else {

              positionActions();

            }
  }

  if (player.getPos()[0] <= (WIDTH * currentStage[0]) - 1) {
    currentStage[0]--;
    checkStage();
  }

  if (player.getPos()[0] >= WIDTH + (WIDTH * (currentStage[0])) ) {
    currentStage[0]++;
    checkStage();
  }

  if (player.getPos()[1] <= (HEIGHT * currentStage[1])) {
    currentStage[1]--;
    checkStage();
  }

  if (player.getPos()[1] >= (HEIGHT + (HEIGHT * (currentStage[1])))) {
    currentStage[1]++;
    checkStage();
  }*/
}

void moveStage() {

    if (player.getPos()[0] <= (WIDTH * currentStage[0]) - 1) {
    currentStage[0]--;
    checkStage();
  }

  if (player.getPos()[0] >= WIDTH + (WIDTH * (currentStage[0])) ) {
    currentStage[0]++;
    checkStage();
  }

  if (player.getPos()[1] <= (HEIGHT * currentStage[1])) {
    currentStage[1]--;
    checkStage();
  }

  if (player.getPos()[1] >= (HEIGHT + (HEIGHT * (currentStage[1])))) {
    currentStage[1]++;
    checkStage();
  }

  currentChest[0]  = abs(currentStage[0]);
  currentChest[1]  = abs(currentStage[1]);
  currentEnemy[0]  = abs(currentStage[0]);
  currentEnemy[1]  = abs(currentStage[1]);

  if (currentStage[0] % 10 == 0 && currentStage[1] % 10 == 0) {
    currentTrader[0]  = currentStage[0] / 10;
    currentTrader[1]  = currentStage[1] / 10;
  }
}

void shortcut() {
 /*
  if (action.compare("rt") == 0) {
    action = "right";
  }

  if (action.compare("lt") == 0) {
    action = "left";
  }

  if (action.compare("dw") == 0) {
    action = "down";
  }

  if (action.compare("inv") == 0) {
    action = "inventory";
  }

*/
}

void statsPrint() {

    mvprintw(0, 0, "Current stage: ");
    mvprintw(1, 0, " %d %d", abs(currentStage[0]), abs(currentStage[1]));


    if (enemyVec[currentEnemy[0]][currentEnemy[1]].getState() == 1) {
       mvprintw(3, 0, "Enemy (dead): ");
    } else {
       mvprintw(3, 0, "Enemy:");
    }
    
    mvprintw(4, 0, "  Health: %d", enemyVec[currentEnemy[0]][currentEnemy[1]].getHealth());
    mvprintw(5, 0, "  Damage: %d", enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage());

    mvprintw(7, 0, "Player:");

    mvprintw(8, 0, "  Health: %d", player.getHealth());
    mvprintw(9, 0, "  Damage: %d", player.getDamage());
}

void selectPrint() {
  if (type == 0)
  {
    mvprintw(0, 0, "What do you want to use: ");
    inventoryPrint(1);
  }
  if (type == 1)
  {
    mvprintw(0, 0, "What do you want to sell: ");
    inventoryPrint(1);
  }
  if (type == 2)
  {
    mvprintw(0, 0, "What do you want to buy: ");

    for (int e = 0; e < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size(); e++)
    {
      const char *itemName = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getName().c_str();
      const char *itemQuality = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality().c_str();
      //std::cout << e << ": ";
  if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality().compare("none") != 0){
  mvprintw(e + 1, 0, "%d: %s %s", e, itemQuality, itemName);
  //std::cout << tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality() << " ";
  }  else {
   mvprintw(e + 1, 0, "%d: %s", e, itemName);
  }
    }
  }

  halfdelay(1);
  int key = getch();

  if (key != -1)
  {
    choice = key;
    choice -= 48;
    clear();
    if (type == 0)
    {
      useShow = true;
    }
    if (type == 1)
    {
      sellShow = true;
    }
    if (type == 2) {
      buyShow = true;
    }
    }

}

void interactPrint() {
  openChest();
  hitEnemy();
}

void sellPrint() {
  sell();
}

void buyPrint() {
  buy();
}

void draw()
{
  clear();
  for (int v = 0; v < buyItems.size(); v++) {
    buyItems[v].randomQuality();
  }

  //Spaces between the top of the map and the bottom
  /*for (int i = 0; i < 2; i++) {

    //std::cout << "\n";

  }*/

  //Calls the terrain function on map.hpp
  if (mapShow == true) {
    terrainFunc();
  }

  if (inventoryShow == true) {
    mvprintw(0, 0, "In your inventory: ");
    inventoryPrint();
  }

  if (statsShow == true) {
    statsPrint();
  }

  if (selectShow == true)
  {

    selectPrint();
  }

  if (useShow == true) {
    usePrint();
  }

  if (interactShow == true) {
    interactPrint();
  }

  if (sellShow == true) {
    sellPrint();
  }

  if (buyShow == true)
  {
    buyPrint();
  }
  //std::cout << std::endl;

  //Prints the current stage into the screen

  //printingActions();

  /*for (int i = 0; i < 3; i++) {

    //std::cout << "\n";

  }*/

  //std::cout << "Action: ";

  //std::cin >> action;

  //shortcut();

  //positionActions();

  /*if(action.compare(stopAction)   ==  0) {
    gameOver = 1;
  }*/
  refresh();

  if (useShow == true) {
    sleep(1);

    useShow = false;
    mapShow = true;
  }

  if (openChestShow == true)
  {
    sleep(2);

    openChestShow = false;
    mapShow = true;
  }

  if (interactShow == true) {
    sleep(1);

    interactShow = false;
    mapShow      = true;
  }

  if (hitEnemyShow == true)
  {
    sleep(3);

    hitEnemyShow = false;
    mapShow = true;
  }
  if(sellShow == true) {
    sleep(1);

    sellShow = false;
    mapShow = true;
  }
  if (buyShow == true)
  {
    sleep(1);

    buyShow = false;
    mapShow = true;
  }
}

void listener() {
  keypad(stdscr, TRUE);
  halfdelay(1);
  int event = getch();

  switch (event)
  {
  case KEY_LEFT:
      player.changeDir(-1, 0);
      player.move();
      moveStage();
    break;
  case KEY_RIGHT:
    player.changeDir(1, 0);
    player.move();
    moveStage();
    break;
  case KEY_UP:
    player.changeDir(0, -1);
    player.move();
    moveStage();
    break;

  case KEY_DOWN:
    player.changeDir(0, 1);
    player.move();
    moveStage();
    break;
  
  case 'e':
    if (inventoryShow == false) {
      inventoryShow = true;
      mapShow = false;
    } else {
      inventoryShow = false;
      mapShow = true;
    }
    break;
  case 'w':
    if (selectShow == false)
    {
      type = 0;
      mapShow = false;
      selectShow = true;
    } else {
      mapShow = true;
      selectShow = false;
    }
    break;
  case 's':
    if (statsShow == false)
    {
      mapShow = false;
      statsShow = true;
    }
    else
    {
      mapShow = true;
      statsShow = false;
    }
    break;
  
  case 'q':
   gameOver = 1;
    break;

  case 'r':
    if (interactShow == false)
    {
      mapShow = false;
      interactShow = true;
    }
    else
    {
      mapShow = true;
      interactShow = false;
    }
    break;

  case 'd':
    if (selectShow == false)
    {
      type = 1;
      mapShow = false;
      selectShow = true;
    }
    else
    {
      mapShow = true;
      selectShow = false;
    }
    break;

  case 'f':
    if (selectShow == false)
    {
      type = 2;
      selectShow = true;
      mapShow = false;
    }
    else
    {
      selectShow = false;
      mapShow = true;
    }
    break;

  case 'z':
    mapShow = true;
    useShow = false;
    break;
  default:

    break;
  }
}



//Main function
int main() {

  //
  //Does functions that need to be done only once
  //

    setup();

    while (gameOver == 0){
      sleep(5 / 10);
      if (selectShow == false)
      {
        listener();
      }
      draw();
    }

  endwin();
}

