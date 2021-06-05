#include <stdio.h>
#include <wchar.h>
#include <locale.h>
#include <curses.h>
#include <unistd.h>

char block[] = "▀\n";

void line(int x1, int y1, int x2, int y2)
{
  // y = mx + b
  int rise = (y2 - y1);
  int run = x2 - x1;

  mvprintw(x1, y1, block);
  mvprintw(x2, y2, block);

  int x_start;
  int x_end;

  if (x1 < x2)
  {
    x_start = x1 + 1;
    x_end = x2;
  }
  else
  {
    x_start = x2 + 1;
    x_end = x1;
  }

  int x = x_start;

  while (x < x_end)
  {
    int y = (int) (x * (rise / run));
    mvprintw(x1 + 1, y, block);
    x++;
  }

}