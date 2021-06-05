#include <vector>

class warrior 

{

private:
  
  //Health of the player
  int health;

  //Damage that the player does
  int damage;

  //Position of the player
  std::vector<int> pos;

  //Direction of the player
  std::vector<int> dir;

public:

  //Constructor(position in the x axis and position in the y axis)
  warrior(int x, int y) 
  
  {
    
    //Position initialized with give parameters
    pos.push_back(x);
    pos.push_back(y);

    //Health of 2
    health = 2;

    //player will deal 1 damage
    damage = 1;

    //Player will start with no direction
    dir.push_back(0);
    dir.push_back(0);
  
  }

  /* Methods to manipulate the variables of the class */

  std::vector<int> getPos() 
  
  {
  
    return pos;
  
  }

  void move() 
  
  {
    
    //Move will add direction to the position
    pos[0] += dir[0];
    pos[1] += dir[1];
  
  }

  int getHealth() 
  
  {
  
    return health;
  
  }

  int getDamage() 
  
  {
  
    return damage;
  
  }

  void changeHealth(int i) 
  
  {
  
    health += i;
  
  }

  void changeDamage(int i) 
  
  {
  
    damage += i;
  
  }

  void setDamage(int i) 
  
  {
  
    damage = i;
  
  }

  void changeDir(int x, int y) 
  
  {
  
    dir[0] = x;
    dir[1] = y;
  
  }
  
};
