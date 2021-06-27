#include <vector>
#include <math.h>

class enemy {

private:
  // 0 if the enemy is alive, 1 if it is dead
  int state;

  //Health of the enemy
  int health;

  //Damage the enemy does
  int damage;

  //The position of the enemy
  std::vector<int> pos;

public:

  //Constructor (position in x, position in y, stage enemy is on)
  enemy(int x, int y, int stage = 1) 
  
  {

    //Starts the position of the enemy with the give x, y
    pos.push_back(x);
    pos.push_back(y);

    //Health of the enemy is based on the stage
    health = stage;

    //Damage is that the enemy does stage + 1 / 2
    damage = floor((stage + 1) / 2);

    //Enemy will always start alive
    state = 0;
  
  }

  void make(int x, int y, int stage = 1)

  {

    //Starts the position of the enemy with the give x, y
    pos.push_back(x);
    pos.push_back(y);

    //Health of the enemy is based on the stage
    health = stage;

    //Damage is that the enemy does stage + 1 / 2
    damage = floor((stage + 1) / 2);

    //Enemy will always start alive
    state = 0;
  }

  /* Methods to manipulate the variables of the class */

  std::vector<int> getPos() 
  
  {
  
    return pos;
  
  }

  void setPos(int x, int y) 
  
  {
  
    pos[0] = x;
    pos[1] = y;
  
  }

  int getHealth() 
  
  {
  
    return health;
  
  }

  void changeHealth(int i) 
  
  {
  
    health += i;
  
    if (health < 0) 
    
    {
  
      health = 0;
  
    }
  
  }

  int getDamage() 
  
  {
   
    return damage;
  
  }

  int getState() 
  
  {
  
    return state;
  
  }

  void setState(int i)
  
  {
  
    state = i;
  
  }


};
