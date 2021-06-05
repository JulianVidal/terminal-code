#include <stdio.h>
#include <wchar.h>
#include <locale.h>
#include <curses.h>
#include <unistd.h>
#include "shape.h"

int gameLoop = 1;

int x = 0;
int fps = 60;

int main()
{

  setlocale(LC_CTYPE, "");

  initscr();
  cbreak();
  noecho();

  line(1, 1, 4, 10);
  move(10, 10);
  // sleep(1 / fps);

  getch();
  endwin();
  return 0;

  // if (gameLoop == 1)
  // {
  //   main();
  // }
  // else
  // {
  //   endwin();
  //   return 0;
  // }
}
