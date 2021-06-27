class stage {
  private:
    std::vector <int> pos;
    chest    stageChest;
    enemy    stageEnemy;
    merchant stageMerchant;
    std::vector<object> items;

    public : stage(int x, int y, int width, int height, std::vector<object> itemsObject)

    {
      pos.push_back(x);
      pos.push_back(y);

      for (int e = 0; e < itemsObject.size(); e++)
      {
        items.push_back(itemsObject[e]);
      }

      stageChest.make(width, height);
      stageEnemy.make(width, height);
      stageMerchant.make(width, height, items);
    }

    chest getChest() {
      return stageChest;
    }

    enemy getEnemy() {
      return stageEnemy;
    }

    merchant getMerchant() {
      return stageMerchant;
    }
};
