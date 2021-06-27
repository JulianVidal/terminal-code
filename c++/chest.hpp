#include <vector>

class chest 

{

private:

  //Wheter a chest is closed(0) or opened(1)
  int state;

  //Position of the chest
  std::vector<int> pos;

public:

  //Constructor (position in x and position in y)
  chest(int x, int y) 
  
  {
    
    //Pushes the position passed in into the pos vector
    pos.push_back(x);
    pos.push_back(y);

    //Chest will always start at close
    state = 0;
  
  }

  void make(int width, int height) 
  
  {
    int x, y;

    x = random() % width;

    //Pushes the position passed in into the pos vector
    pos.push_back(x);
    pos.push_back(y);

    //Chest will always start at close
    state = 0;
  }

  /* Methods to manipulate the variables of the class */
  int getState()

  {
  
    return state;
  
  }
  
  void setState(int x) 
  
  {
  
    state = x;
  
  }

  std::vector<int> getPos() 
  
  {
  
    return pos;
  
  }

  void setPos(int x, int y) 
  
  {
  
    pos[0] = x;
    pos[1] = y;
  
  }


};
