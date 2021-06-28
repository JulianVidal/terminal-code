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
//#include "stage.hpp"

//Height and width of the map
#define HEIGHT 5
#define WIDTH 7

//Keeps track if the game is over, if so the program will stop
bool gameOver = false;

/**
* The variables ending with show keep track
* of what is being printed into the screen
*/

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

/*
* Choice is global variable that will keep track
* of the key pressed by the user when choosing an item (buying, selling, using)
*/
int choice;

//Keeps track of what to print after buying, selling and using.
int type;

//Array holding different types of items for futures expansion
std::string typesOfItems[] = {"Potion", "Item", "useItem", "Currency"};

//Array holding the qualities that an item can have if any.
std::string quality[] = {"Excellent", "Good", "Ok", "Bad", "Almost broken"};
int qualityAmount = (sizeof(quality) / sizeof(quality[0]));

/*All items in the game stored on the array, each with a
** Name
** Health gained from item
** Damage done by the item
** Type of item based on the typesOfItems array
** Value of the object
** Quality of the object based on the quality array, "none" by defaut
*/
object items[] =
    {
        object(
            "Iron Sword",
            0,
            3,
            typesOfItems[2],
            3,
            quality[rand() % qualityAmount]),
        object(
            "Golden Sword",
            0,
            2,
            typesOfItems[2],
            2,
            quality[rand() % qualityAmount]),

        object(
            "Golden Coin",
            0,
            0,
            typesOfItems[3],
            1),

        object(
            "Health Potion",
            1,
            0,
            typesOfItems[0],
            2),
        object(
            "Piece of flesh",
            0,
            0,
            typesOfItems[1],
            1),

        object(
            "Eye",
            0,
            0,
            typesOfItems[1],
            1)};

//Holds the items of a chest based on the items array
object chestContent[] = {
    items[0],

    items[1],

    items[2],

    items[3]};

//Holds the items an enemy drops based on the items array
object enemyContent[] = {
    items[4],
    items[5]};

//Variables that holds what a merchant will sell
std::vector<object> buyItems;

//Stores all items found by the player(chest, merchant, enemy)
std::vector<object> inventory;

//How much of each item
std::vector<int> inventoryQuantity;

//Stores the item being use(sword)
std::vector<object> hotBar;

//Variables starting with current hold what should be printed based on the stage
int currentStage[] = {0, 0};

int currentChest[] = {0, 0};

int currentEnemy[] = {0, 0};

int currentTrader[] = {0, 0};

//Holds all the stages visited by the player, helps with adding new stages
std::vector<std::vector<int> > stagesVisited;


//A vector that will hold all the chests
std::vector< std::vector <merchant> > tradersVec;
std::vector< std::vector <chest> > chestsVec;
std::vector< std::vector <enemy> > enemyVec;


//The initial position of the player
warrior player((WIDTH / 2), (HEIGHT / 2));

//2D Vectors that will hold what entity to print based on current variables
/*std::vector< std::vector <merchant> > tradersVec;
std::vector< std::vector <chest> > chestsVec;
std::vector< std::vector <enemy> > enemyVec;*/

//std::vector<std::vector<stage> > stagesVec;

/* 
A function that will check if and how much of an item there is inside the inventory vector
Used when buying items from the merchant and checking for coins
Needs an object to be passed in
*/
int checkInventory(object item)

{

  //Loop through every item in the inventory
  for (int k = 0; k < inventory.size(); k++)

  {

    //Compares the item name with the one passed in the function parameters
    if (item.getName().compare(inventory[k].getName()) == 0)

    {

      //If the item is found then the quantity is returned
      int amountOfItem = inventoryQuantity[k];
      return amountOfItem;

      //No need to continue the loop
      break;
    }
  }

  //If the item is not found a 0 is returned
  return 0;
}

//Function that will remove an item
//Needs an object and amount to remove to be passed in
void removeItemFromInventory(object item, int amount)

{

  //Loops through the inventory
  for (int j = 0; j < inventory.size(); j++)

  {

    //Compares the name of the object passed in with an item on the inventory
    if (inventory[j].getName().compare(item.getName()) == 0 && inventory[j].getQuality().compare(item.getQuality()) == 0)

    {

      //Removes amount from the quantity of the object
      inventoryQuantity[j] -= amount;

      //Checks if the inventory quantity is equal or lower than 0
      if (inventoryQuantity[j] <= 0)

      {

        //If it is equal or lower that 0 then there is no more of that item
        //That item will be deleted
        inventoryQuantity.erase(inventoryQuantity.begin() + j);
        inventory.erase(inventory.begin() + j);
      }

      //If the item was found no need to continue the loop
      break;
    }
  }
}

/*Prints the inventory of the player
*Type passed in specifies if it needs to be printed for user selection
** 0: Item1
** 1: Item2
*/
void inventoryPrint(int usePrint = 0)

{

  //Count will keep track of how many spaces in the y axis have been used
  int count = 0;

  //Loops through the inventory
  for (int q = 0; q < inventory.size(); q++)

  {

    //Variavles starting with items hold the properties of the object in the inventory
    //Needs to be turned into const char* for mvprintw
    const char *itemQuality = inventory[q].getQuality().c_str();
    const char *itemName = inventory[q].getName().c_str();
    int itemQuantity = inventoryQuantity[q];

    //Checks which way it should print the inventory
    if (usePrint == 1)

    {

      //Will print the item quality and name if it has any, if none then it will only print the name
      if (inventory[q].getQuality().compare("none") != 0)

      {

        //Prints the index, quality, name and quantity of the item
        mvprintw(q + 1, 0, "%d: %s %s %d ", q, itemQuality, itemName, itemQuantity);
      }

      else

      {

        //Prints the index, name and quantity of the item
        mvprintw(q + 1, 0, "%d: %s %d ", q, itemName, itemQuantity);
      }
    }

    else

    {

      //Will print the item quality and name if it has any, if none then it will only print the name
      if (inventory[q].getQuality().compare("none") != 0)

      {

        //Prints the quality, name and quantity of the item
        mvprintw(q + 1, 0, "%s %s %d ", itemQuality, itemName, itemQuantity);
      }

      else

      {

        //Prints the name and quantity of the item
        mvprintw(q + 1, 0, "%s %d ", itemName, itemQuantity);
      }
    }

    count++;
  }

  //Checks if there is an item in the hotbar
  if (hotBar.size() > 0)

  {

    //Variables starting with hotbar hold the properties of the item in the hotbar
    //Needs to be turned into const char* for mvprintw
    const char *hotbarItem = hotBar[0].getName().c_str();
    const char *hotbarQuality = hotBar[0].getQuality().c_str();

    mvprintw(count + 2, 0, "In your hotbar: ");

    //Prints quality and name of the item
    mvprintw(count + 3, 0, "%s %s", hotbarQuality, hotbarItem);
  }
}

void terrainFunc()
{

  /*
  Runs the terrain function inside map.hpp
  It prints the map on the screen
  It needs
  Height of the map
  Width of the map
  Player position
  Chest position
  Enemy position
  enemy state(alive 0 or dead 1)
  merchant position
  */
  terrain(
      HEIGHT,
      WIDTH,
      currentStage[0],
      currentStage[1],
      player.getPos(),
      chestsVec[currentChest[0]][currentChest[1]].getPos(),
      enemyVec[currentEnemy[0]][currentEnemy[1]].getPos(),
      enemyVec[currentEnemy[0]][currentEnemy[1]].getState(),
      tradersVec[currentTrader[0]][currentTrader[1]].getPos());

  //Prints the amount of health the player has
  for (int d = 0; d < player.getHealth(); d++)

  {

    mvprintw(HEIGHT, d, "H"); //💚
  }

  //Prints damage of the player
  //If the player is using an item then the item damage will be displayed
  //If hotbar size is bigger than 0 then the player is using an item
  if (hotBar.size() > 0)

  {

    for (int d = 0; d < hotBar[0].getDamage(); d++)

    {

      mvprintw(HEIGHT + 1, d, "W"); //⚔
    }
  }

  else

  {

    for (int d = 0; d < player.getDamage(); d++)

    {

      mvprintw(HEIGHT + 1, d, "W"); //⚔
    }
  }
}

//Fix for items being the same on every instance of the game
//Called before pushing new items into the current variables
void randomItemQuality()

{

  //Loops throuhg the items array
  for (int v = 0; v < sizeof(items) / sizeof(items[0]); v++)

  {

    items[v].randomQuality();
  }

  //Re-assigns chest content to update them with new items
  object chestContent[] =

      {
          items[0],

          items[1],

          items[2],

          items[3]};

  //Re-assigns enemy content to update them with new items
  object enemyContent[] =

      {
          items[4],
          items[5]};
}

//Setsup the game by giving its first chest and enemy
//Starts neccesary function for ncurses
void setup()

{

  //Functions for ncurses
  initscr();
  clear();
  noecho();
  cbreak();
  curs_set(0);

  //Changes the seed of random
  //Different number every time
  srand(time(0));

  //Randomises items
  randomItemQuality();

  //Pushes items that will be sold by the merchant
  buyItems.push_back(items[0]);
  buyItems.push_back(items[1]);
  buyItems.push_back(items[3]);

  //creates a trade vector that will be pushed into the trade vector
  std::vector <merchant> traderNewVec;
  traderNewVec.push_back(merchant((WIDTH / 2), 0, buyItems));
  tradersVec.push_back(traderNewVec);


  //Creates a chest vector that will be pushed into the chest vectors array
  std::vector <chest> chestNewVec;
  chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

  //std::vector<stage> stageNewVec;
  //stageNewVec.push_back(stage(currentStage[0], currentStage[1], WIDTH, HEIGHT, buyItems));

  //Checks if the merchant and the chest has the same position
  if (chestNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) 
  
  {

    //If the positions are equal then it chooses a new position
    chestNewVec.erase(chestNewVec.begin());
    chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

  }

  //Pushes a new chest into the chest vector
  chestsVec.push_back(chestNewVec);

  //Creates an enemy vector that will be pushed into the enemy vector
  std::vector<enemy> enemyNewVec;
  enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

  if (enemyNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {

    enemyNewVec.erase(enemyNewVec.begin());
    enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

  }

  //Pushes the enemy vector into the enemy vector
  enemyVec.push_back(enemyNewVec);

  //Checks if the enemy has the position as the chest
  if (enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[0] == chestsVec[currentChest[0]][currentChest[1]].getPos()[0] && enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[1] == chestsVec[currentChest[0]][currentChest[1]].getPos()[1])

  {

  //If the enemy and chest has the same position then the enemy will take 1/2 the position of the chest
  // Chest(6, 4), enemy(6 -> 3, 4 -> 2)
  enemyVec[currentEnemy[0]][currentEnemy[1]].setPos(round(chestsVec[currentChest[0]][currentChest[1]].getPos()[0] / 2), round(chestsVec[currentChest[0]][currentChest[1]].getPos()[1] / 2));

  }

  /*Items used for testing at the begining of the game*/
  inventory.push_back(object("Health Potion", 1, 0, typesOfItems[0], 2));
  inventory.push_back(object("Golden Sword", 0, 2, typesOfItems[2], 2, quality[0]));
  inventory.push_back(object("Iron Sword", 0, 3, typesOfItems[2], 3, quality[0]));
  inventoryQuantity.push_back(20);
  inventoryQuantity.push_back(20);
  inventoryQuantity.push_back(20);

  //Pushes the first visited currentStage which is the one we start with(0, 0)
  std::vector<int> vec(2, 0);
  stagesVisited.push_back(vec);
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

      //Creates trade vector that is pushed into the trade vector
      std::vector <merchant> traderNewVec;
      traderNewVec.push_back(merchant((WIDTH / 2), 0, buyItems));
      tradersVec.push_back(traderNewVec);
    }

    //Adds a new chest to the chests vector
    //Checks if there is a new x axis
    if (currentStage[0] >= chestsVec.size()) {
      std::vector <chest> chestNewVec;
      chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));
      
      //Checks if the chest has the same position as the merchant
      if (chestNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {
        
        //If the merchant and chest have the same position then the chest will chose a new position
        chestNewVec.erase(chestNewVec.begin());
        chestNewVec.push_back(chest(rand() % WIDTH, rand() % HEIGHT));

      }

      //Pushes a new chest into the chest vector
      chestsVec.push_back(chestNewVec);

      //Creates an enemy vector that will be pushed into the enemy vector
      std::vector <enemy> enemyNewVec;
      enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT, (currentStage[0] + currentStage[1])));

      //Checks if the trader has the same position as the enemy
      if (enemyNewVec[0].getPos() == tradersVec[currentTrader[0]][currentTrader[1]].getPos()) {
        
        //If merchant and enemy has the position then the enemy chooses a new position  
        enemyNewVec.erase(enemyNewVec.begin());
        enemyNewVec.push_back(enemy(rand() % WIDTH, rand() % HEIGHT));

      }
      
      //Pushes the enemy vector into the enemy vector
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

void addToInventory(object item)

{

  //repeat keeps track if the item has already been picked up(to stack it)
  int repeat = 0;

  //Holds the index of the item that repeated
  int repeatIndex;

  //Holds the true(1) or false(0) if the item is the first to be repeated
  int first = 0;

  //The amount of one item will always start at 1
  inventoryQuantity.push_back(1);

  for (int n = 0; n < inventory.size(); n++)

  {

    //Checks if the inventory has the item we have picked up
    if (inventory[n].getName() == item.getName() && inventory[n].getQuality() == item.getQuality())

    {

      //Checks if it is the first one
      if (first == 0)
      {

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
  if (first == 1)
  {

    repeat = repeat + inventoryQuantity[repeatIndex];

    inventoryQuantity[repeatIndex] = repeat;
  }

  //If there is no repeat then adds one
  if (repeat == 0)
  {

    inventory.push_back(item);
  }
}

//Opens the chest, adds items into inventory
void openChest(){

  //Checks if the position of the player is on top of the position of the chest
  if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == chestsVec[currentChest[0]][currentChest[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == chestsVec[currentChest[0]][currentChest[1]].getPos()[1])

  {

    //Shows the open chest text(items obtained)
    openChestShow = true;
    interactShow = false;

    //Checks if that chest has been opened
    if (chestsVec[currentChest[0]][currentChest[1]].getState() == 0)
    {

      mvprintw(0, 0, "You have opened a chest");

      //Loops randomly max 4, min 1 times to get multiple items
      for (int i = 0; i < (rand() % 3) + 1; i++) {

        //Different number every time
        srand(time(0));

        //Randomises items
        randomItemQuality();

        //Chooses a random item inside chest content
        int currentItemIndex = rand() % sizeof(chestContent) / sizeof(chestContent[0]);

        //Prints what is on the chest based on the currentItemIndex
        const char *itemName = chestContent[currentItemIndex].getName().c_str();
        const char *itemQuality = chestContent[currentItemIndex].getQuality().c_str();

        //Checks if the item has a quality, if none then no quality will print
        if (chestContent[currentItemIndex].getQuality().compare("none") != 0) {
          //Prints item quality and name
          mvprintw(i + 2, 0, "You have gotten %s %s", itemQuality, itemName);
        } else {

          //Prints item name
          mvprintw(i + 2, 0, "You have gotten %s", itemName);
        }

        //Adds the items obtained into the inventory
        addToInventory(chestContent[currentItemIndex]);
      }

      //Changes the state of the chest to opened
      chestsVec[currentChest[0]][currentChest[1]].setState(1);
    } else {
      mvprintw(0, 0, "You have already opened this chest.");
    }
  }

  else

  {

    mvprintw(0, 0, "Nothing to interact with");
  }
}

//Hits enemy, substract healths from enemy and player
void hitEnemy()

{

  //Different number every time
  srand(time(0));

  //Randomises items
  randomItemQuality();

  //Keeps track of the spaces used on the y-axis
  int spaceCount = 0;

  //Checks if the player and enemy are on the same spot and the enemy is alive
  if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == enemyVec[currentEnemy[0]][currentEnemy[1]].getPos()[1] && enemyVec[currentEnemy[0]][currentEnemy[1]].getState() == 0)
  
  {

    //Prints the hit enemy screen.(Damage done by the player or enemy and items gotten if the enemy died)
    hitEnemyShow = true;
    interactShow = false;

    //Checks if there is an item on the hotbar that will deal more damage than the player
    if (hotBar.size() > 0) 
    
    {

      //Enemy gets damged by substracting it health
      enemyVec[currentEnemy[0]][currentEnemy[1]].changeHealth(-hotBar[0].getDamage());

      mvprintw(spaceCount, 0, "- %d health to the enemy ", hotBar[0].getDamage());
      spaceCount++;

      int qualityIndex;

      //Finds the index of the quality that the item has
      for (qualityIndex = 0; qualityIndex < (sizeof(quality)/sizeof(quality[0])); qualityIndex++) 
      
      {

        if (quality[qualityIndex].compare(hotBar[0].getQuality()) == 0) 
        
        {

          break;

        }

      }

      //The loop will stop at the quality of the item, we need to add one to lower the quality
      qualityIndex++;

      spaceCount++;

      //Variables starting with hot bar are the properties of the item in the hotbar
      const char *hotBarItemName = hotBar[0].getName().c_str();
      const char *hotBarItemQuality = hotBar[0].getQuality().c_str();

      //Checks if the quality has reached the end of the array, thus has broken
      if (qualityIndex + 1 >= (sizeof(quality)/sizeof(quality[0])) ) 
      
      {
        
        mvprintw(spaceCount, 0, "Your %s has broken", hotBarItemName);
        spaceCount++;

        //Removes the item from the hotbar
        hotBar.erase(hotBar.begin());

      } 
      
      else 
      
      {
        
        //Lowers the quality of the weapon
        hotBar[0].setQuality(quality[qualityIndex]);

        //Turns the quality std::string into the const char* ncurses use
        const char *newQuality = quality[qualityIndex].c_str();
        mvprintw(spaceCount, 0, "The quality of your %s has been lowered to %s", hotBarItemName, newQuality);
        spaceCount++;

      }


    } 
    
    else 
    
    {
      
      //When there is no item in the hotbar then the damage from the player is used
      enemyVec[currentEnemy[0]][currentEnemy[1]].changeHealth(-player.getDamage());
      mvprintw(spaceCount, 0, "- %d health to the enemy ", player.getDamage());
      spaceCount++;

    }

    //Checks if the enemy is dead, 0 health
    if (enemyVec[currentEnemy[0]][currentEnemy[1]].getHealth() <= 0) 
    
    {

      //Sets the state of the enemy to 1(dead)
      enemyVec[currentEnemy[0]][currentEnemy[1]].setState(1);

      spaceCount++;

      mvprintw(spaceCount, 0, "The enemy has perished");
      spaceCount++;

      spaceCount++;

      mvprintw(spaceCount, 0, "Reek the profits");
      spaceCount++;

      //currentItemIndex is a random item from the enemy content array
      int currentItemIndex = rand() % sizeof(enemyContent)/sizeof(enemyContent[0]);

      //Name of the randomly slected item
      const char *itemName = enemyContent[currentItemIndex].getName().c_str();

      //Prints what is on the chest based on the currentItemIndex
      mvprintw(spaceCount, 0, "You have gotten ");
      spaceCount++;

      mvprintw(spaceCount, 0, "%s", itemName);
      spaceCount++;

      //Adds the item into the inventory
      addToInventory(enemyContent[currentItemIndex]);

    } 
    
    else 
    
    {

      //If the player doesn't kill the enemy on one hit then the enemy hits the player 
      int enemyDamageToPlayer = -enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage();

      //Hurs the player by substracting it health
      player.changeHealth(enemyDamageToPlayer);

      //terrainFunc();

      mvprintw(spaceCount, 0, "The enemy has dealth %d damage", enemyVec[currentEnemy[0]][currentEnemy[1]].getDamage());
      spaceCount++;

      //Clears the screen and prints the death screen
      if (player.getHealth() <= 0) 
      
      {
        
        clear();

        mvprintw(0, 0, "You have perished with ");
        spaceCount++;

        //Prints what was inside your inventory
        for (int q = 0; q < inventory.size(); q++) 
        
        {

          const char *inventoryItemName = inventory[q].getName().c_str();
          int itemQuantity = inventoryQuantity[q];
          mvprintw(spaceCount + q, 0, "%s (%d)", inventoryItemName, itemQuantity);

        }

        //Ends the game
        gameOver = true;

      }

    }

  }
}

void usePrint()

{

  //Prints the use screen
  useShow = true;
  selectShow = false;

  //Checks if the choice(Number pressed by the player) is inside the inventory
  if (choice >= inventory.size())

  {

    mvprintw(0, 0, "Nothing there");
  }

  else

  {

    //Variables starting with item hold the properties of the item used
    const char *itemName = inventory[choice].getName().c_str();
    const char *itemQuality = inventory[choice].getQuality().c_str();
    int itemHealth = inventory[choice].getHealth();
    int itemDamage = inventory[choice].getDamage();

    //Prints the item used
    if (inventory[choice].getQuality().compare("none") != 0)

    {

      //Prints quality and name of the item
      mvprintw(0, 0, "You are wielding %s %s", itemQuality, itemName);
    }

    else

    {

      //Prints the name of the item
      mvprintw(0, 0, "You used %s", itemName);
    }

    //Checks if the item gives health to the player
    if (itemHealth > 0)

    {

      //Adds health to player and take the item out of the inventory
      player.changeHealth(itemHealth);
      inventoryQuantity[choice]--;
      mvprintw(1, 0, "You now have %d more health", itemHealth);
    }

    //Checks if the item give more damage to the player
    if (itemDamage > 0)

    {

      //Pushes the item into the hotbar
      hotBar.push_back(inventory[choice]);
      inventoryQuantity[choice]--;

      //Removes item from the hotbar if there is an item there
      if (hotBar.size() > 1)

      {

        addToInventory(hotBar[0]);
        hotBar.erase(hotBar.begin());
      }

      mvprintw(1, 0, "You now do %d more damage", itemDamage);
    }
  }
}

void sell()

{

  //Keeps track of the spaces in the y-axis
  int count = 0;

  //Checks if the trader and player have the same position
  // if ((player.getPos()[0] - (currentStage[0] * WIDTH)) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[0] && (player.getPos()[1] - (currentStage[1] * HEIGHT)) == tradersVec[currentTrader[0]][currentTrader[1]].getPos()[1])
  
  // {

    //Removes the selection screen
    selectShow = false;

    //Checks if the choice(Number pressed by the player) is inside the inventory
    if (choice >= inventory.size()) 
    
    {

      mvprintw(count, 0, "Nothing to sell");
      count++;

    } 
    
    else 
    
    {

      removeItemFromInventory(inventory[choice], 1);

      //Variables starting with item hold the item sold properties
      const char *itemName = inventory[choice].getName().c_str();
      const char *itemQuality = inventory[choice].getQuality().c_str();

      //Prints the item sold
      if (inventory[choice].getQuality().compare("none") != 0)
      {

        //Prints quality and name of the item
        mvprintw(count, 0, "You sold a %s %s", itemQuality, itemName);
      
      }
      
      else
      
      {

        //Prints name of the item
        mvprintw(count, 0, "You sold a %s", itemName);

      }

      count++;

      //The value of the item sold
      int itemValue = inventory[choice].getValue();

      mvprintw(count, 0, "For %d golden coins", itemValue);
      count ++;

      //Adds the value of the item sold into the inventory in gold coins
      for (int i = 0; i < itemValue; i++)

      {

        addToInventory(chestContent[2]);

      }
      
    }

  // }

}

void buy()

{
  //Keeps track of the spaces in the y-axis
  int count = 0;

  //Removes the selection screen
  selectShow = false;

  //Checks if the choice(key pressed by the player) is inside the items sold of the merchant
  if (choice < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size())
  {

    //Amount that the item bought is worth
    int coinAmount = checkInventory(items[2]);

    //Checks if the player has enough golden coins to buy the item
    if (coinAmount >= tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getValue())
    
    {
      
      mvprintw(count, 0, "You have bought");
      count++;

      //Variables starting with item hold the properties of the item
      const char *itemName = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getName().c_str();
      const char *itemQuality = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getQuality().c_str();

      //Prints the item bought
      if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getQuality().compare("none") != 0)
      
      {

        //Prints quality and name of he item
        mvprintw(count, 0, "You bought %s %s", itemQuality, itemName);
      
      }

      else

      {

        //Prints the name of the item
        mvprintw(count, 0, "You bought %s", itemName);
      
      }

      count++;

      //Adds the item bouhg to the inventory
      addToInventory(tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice]);
      removeItemFromInventory(items[2], tradersVec[currentTrader[0]][currentTrader[1]].getItems()[choice].getValue());
    
    } 
    
    else 
    
    {
      
      mvprintw(count, 0, "Not enough money");
      count++;

    }

  } 
  
  else 
  
  {

    mvprintw(count, 0, "No item there");
    count++;
  
  }
  
}

void moveStage()

{

    //Checks if the player has moved to a new stage
    //LEFT
    if (player.getPos()[0] <= (WIDTH * currentStage[0]) - 1) 
    
    {

    currentStage[0]--;
    checkStage();

    }

  //RIGHT
  if (player.getPos()[0] >= WIDTH + (WIDTH * (currentStage[0])) ) 
  
  {

    currentStage[0]++;
    checkStage();
  
  }

  //Up
  if (player.getPos()[1] <= (HEIGHT * currentStage[1])) 
  
  {
  
    currentStage[1]--;
    checkStage();
  
  }

  //DOWN
  if (player.getPos()[1] >= (HEIGHT + (HEIGHT * (currentStage[1])))) 
  
  {
  
    currentStage[1]++;
    checkStage();
  
  }

  //Changes what iteem on the vector is used when drawing and interacting
  currentChest[0]  = abs(currentStage[0]);
  currentChest[1]  = abs(currentStage[1]);
  currentEnemy[0]  = abs(currentStage[0]);
  currentEnemy[1]  = abs(currentStage[1]);

  //Traders only appear every 10 stages in every axis
  if (currentStage[0] % 10 == 0 && currentStage[1] % 10 == 0) {
    currentTrader[0]  = currentStage[0] / 10;
    currentTrader[1]  = currentStage[1] / 10;
  }

}

void statsPrint()

{

  /*
  Prints
  * Stages
  * Enemy
  * Player
  */
  
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

void selectPrint()

{
  
  //Prints different words depending on the type
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
    //Prints the items that can be bough
    mvprintw(0, 0, "What do you want to buy: ");

    for (int e = 0; e < tradersVec[currentTrader[0]][currentTrader[1]].getItems().size(); e++)
  
    {
  
      //Variables starting with item hold the properties of the item
      const char *itemName = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getName().c_str();
      const char *itemQuality = tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality().c_str();
  
      //Prints the items that can be bought
      if (tradersVec[currentTrader[0]][currentTrader[1]].getItems()[e].getQuality().compare("none") != 0)
      
      {
      
      //Prints quality and name of the object
      mvprintw(e + 1, 0, "%d: %s %s", e, itemQuality, itemName);
      
      }  
      
      else 
      
      {
      
      //Prints name of the object
      mvprintw(e + 1, 0, "%d: %s", e, itemName);

      }

    }
  
  }

  halfdelay(1);

  //Gets the key that the player pressed
  int key = getch();

  //Checks if the key has been pressed(It won't return a -1)
  if (key != -1)

  {
  
  //Turns the key into a number(code for 0 is 48)
  choice = key;
  choice -= 48;

  //Clears the screen to print next screen
  clear();

  if (type == 0)

  {

    useShow = true;

  }

  if (type == 1)

  {

    sellShow = true;

  }

  if (type == 2) 
  
  {

    buyShow = true;

  }
 }

}

void interactPrint()

{

  //Will print the open chest or the hit enemy screen depending on which one is true
  openChest();
  hitEnemy();
}

void sellPrint()

{

  //Prints the sell screen
  sell();
}

void buyPrint()

{

  //Prints the buy screen
  buy();
}

void draw()

{
  clear();

  //Loops through every item in buyItems, making the merchant always have different items
  for (int v = 0; v < buyItems.size(); v++)
  {

    buyItems[v].randomQuality();
  }

  //Calls the terrain function on map.hpp
  if (mapShow == true)

  {

    //Prints the map on the screen
    terrainFunc();
  }

  if (inventoryShow == true)

  {

    //Prints the inventory onto the screen
    mvprintw(0, 0, "In your inventory: ");
    inventoryPrint();
  }

  if (statsShow == true)

  {

    //Prints the stats into the screen
    statsPrint();
  }

  if (selectShow == true)

  {

    //Prints which item will be selected for buy, sell and use onto the screen
    selectPrint();
  }

  if (useShow == true)

  {

    //Prints what item is going to be used onto the screen
    usePrint();
  }

  if (interactShow == true)

  {

    //Prints what has been interacted with(chest or enemy)
    interactPrint();
  }

  if (sellShow == true)

  {

    //Prints what the player has sold
    sellPrint();
  }

  if (buyShow == true)

  {

    //Prints what the player has bought
    buyPrint();
  }

  refresh();

  /*
  The following if statements will stop the program and let the used read that has happened
  Fix for player not being able to leave the certain screen
  */

  //Item used
  if (useShow == true)

  {

    sleep(1);

    useShow = false;
    mapShow = true;
  }

  //Chest content
  if (openChestShow == true)

  {

    sleep(2);

    openChestShow = false;
    mapShow = true;
  }

  //What has been interacted with
  if (interactShow == true)

  {

    sleep(1);

    interactShow = false;
    mapShow = true;
  }

  //How much damage has been done to the enemy and what rewards were gotten
  if (hitEnemyShow == true)

  {

    sleep(3);

    hitEnemyShow = false;
    mapShow = true;
  }

  //What the has been sold
  if (sellShow == true)

  {

    sleep(1);

    sellShow = false;
    mapShow = true;
  }

  //What has been bought
  if (buyShow == true)

  {
    sleep(1);

    buyShow = false;
    mapShow = true;
  }

}

void listener()
{

  //Enables event listerner for the keyboard
  keypad(stdscr, TRUE);
  halfdelay(1);

  //Gets the key pressed
  int event = getch();

  //Checks which key was pressed and what it should do
  switch (event)

  {

  case KEY_LEFT:
    //Moves player to the left
    player.changeDir(-1, 0);
    player.move();
    moveStage();
    break;

  case KEY_RIGHT:
    //Moves player to the right
    player.changeDir(1, 0);
    player.move();
    moveStage();
    break;

  case KEY_UP:
    //Moves the player up
    player.changeDir(0, -1);
    player.move();
    moveStage();
    break;

  case KEY_DOWN:
    //moves the player down
    player.changeDir(0, 1);
    player.move();
    moveStage();
    break;

  case 'e':
    //For inventory
    if (inventoryShow == false)
    {
      inventoryShow = true;
      mapShow = false;
    }
    else
    {
      inventoryShow = false;
      mapShow = true;
    }
    break;

  case 'w':
    //When using an item
    if (selectShow == false)
    {
      type = 0;
      mapShow = false;
      selectShow = true;
    }
    else
    {
      mapShow = true;
      selectShow = false;
    }
    break;

  case 's':
    //Shows stats
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
    //Ends the game
    gameOver = true;
    break;

  case 'r':
    //Opens chest or kill enemy
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
    //Sells an item to a trader
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
    //Buys an item from a trader
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

  default:

    break;
  }
}

//Main function
int main()
{

  //
  //Does functions that need to be done only once
  //

  //Setsup arrays, vectors and ncurses
  setup();

  //Game loop that will stop when gameOver is equal to true
  while (gameOver == false)

  {

    //Slows down the game slightly
    //sleep(1/2);

    if (selectShow == false)

    {
      //Checks key pressed unless the program is waiting for the user to select an item (buy, sell and use)
      listener();
    }

    //Draws onto the screen depending on which show is true
    draw();
  }

  //When loop has ended, the window will close
  endwin();
}
