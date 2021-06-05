//
//  Game.c
//
//x
//  Created by Julian Camilo on 3/28/19.
//

#include "Game.h"
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdlib.h>


int main() {
  //Initializes the variable that will contain the size of the talbe
  int size;

  //Asks for table size in the terminal
  printf("\n\n Table size: ");
  scanf("%d \n", &size);

  //Create columns
  int sizeLength = floor(log10(abs(size))) + 1;
  for (int i = 0; i < size; i++) {
    int currentNumCol = 1 + i;
    int colSize = floor(log10(abs(currentNumCol))) + 1;
    if (i < size - 1) {
      printf(" %d", currentNumCol);
      for (int g = 0; g < sizeLength - colSize; g++) {
        printf(" ");
      }
    } else {
      printf(" %d \n", currentNumCol);
    }
  }

  //Create rows
  for (int i = 0; i < size - 1; i++) {
    int currentNumRow = 2 + i;

    if (i < size) {
      printf("\n %d", currentNumRow);
      //Does the multiplication
      for (size_t j = 0; j < size; j++) {
        int currentNumCol = 2 + j;
        //The multiplication
        int multiplication = currentNumCol * currentNumRow;
        //The length of the multiplication
        int numberLength = floor(log10(abs(multiplication))) + 1;
        //The lenght of the biggest multiplication
        int numBiggest = floor(log10(abs(size * size))) + 1;


        //Prints the multiplications
        if (currentNumCol < size + 1) {

        //Creates spaces for every number
          for (int n = 0; n < numBiggest - numberLength; n++) {
            printf(" ");
          }

          printf("  %d", multiplication);

        } else {
          printf(" %d \n", multiplication);
        }

      }
    } else {
      printf(" %d  \n\n", currentNumRow);
    }
  }
  return 0;
}
