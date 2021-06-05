#include <string.h>
#include <time.h>

class object 

{

  private:
  
   //Name of the object
   std::string name;

   //How much health the object gives
   int health;

   //How much damage the object does
   int damage;

   //Type of object it is based on the array in pro.cpp
   std::string type;

   //The quality of the object based on the array in pro.cpp
   std::string quality;

   //Value of the object when bought or sold
   float value;

 public:

  /*
  Constructor
  Name of the object
  How much health it gives
  Type of object based on the array in pro.cpp
  Value of the object
  Quality of the object based on the array in pro.cpp(Default = "none")
  */
   object(
          std::string nameObject,
          int healthObject,
          int damageObject,
          std::string typeObject,
          float valueObject,
          std::string qualityObject = "none"
        )
        {

     //Initializes all variables based on parameter
     name    =  nameObject;
     health  =  healthObject;
     damage  =  damageObject;
     type    =  typeObject;
     quality =  qualityObject;
     value   = valueObject;
    }

  /* Methods to manipulate the variables of the class */

    std::string getName() 
    
    {
    
      return name;
    
    }

    //When called will give the item a random quality
    //Used to randomize Chest and merchant items
    void randomQuality() 
    
    {
    
      std::string qualityObjectArr[]       =  {"Excellent", "Good", "Ok", "Bad", "Almost broken"};
    
      if (quality.compare("none") != 0) {
        srand(time(0));
        quality = qualityObjectArr[rand() % ( sizeof(qualityObjectArr)/sizeof(qualityObjectArr[0]) ) ];
    
      }
    
    }

    std::string getQuality() 
    
    {
    
      return quality;
    
    }

    int getHealth() 
    
    {
    
      return health;
    
    }
    
    int getDamage() 
    
    {
    
      return damage;
    
    }

    void setQuality(std::string qualityObject) 
    
    {
    
      quality = qualityObject;
    
    }

    float getValue() 
    
    {
    
      return value;
    
    }

};
