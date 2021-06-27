class merchant {
private:
  std::vector <int> pos;
  std::vector <object> items;

public:
  merchant(int x, int y, std::vector<object> itemsObject){
    pos.push_back(x);
    pos.push_back(y);

    for (int e = 0; e < itemsObject.size(); e++)
    {
      items.push_back(itemsObject[e]);
    }
  }

  void make(int x, int y, std::vector<object> itemsObject)

  {
    
    pos.push_back(x);
    pos.push_back(y);

    for (int e = 0; e < itemsObject.size(); e++)
    {
      items.push_back(itemsObject[e]);
    }

  }

  std::vector<int> getPos() {
    return pos;
  }

  std::vector <object> getItems() {
    return items;
  }

  void setItems(std::vector <object> itemsObject) {
    items.clear();
    for (int e = 0; e < itemsObject.size(); e++) {
      items.push_back(itemsObject[e]);
    }
  }

  void setPos(int x, int y) {
    pos[0] = x;
    pos[1] = y;
  }

};
