//
//  c.cpp
//  yes
//
//  Created by Julian Vidal on 16.04.2021.
//

#include <stdio.h>

#include <iostream>
#include <stdio.h>
#include <cmath>


using namespace std;

typedef long long int ll;

int main(int argc, char *argv[]) {
    int T; cin >> T;
    cout << endl;
    
    for (int t = 0; t < T; t++) {
        
        // Total Chains
        int C; cin >> C;
//        cout << C << endl;
        
        int chains[C];
        
        // Length of each chain
        for (int c = 0; c < C; c++) {
            cin >> chains[c];
//            cout << chains[c];
        }
//        cout << endl;

        int linksT[C];
        // Connection of each chain
        for (int c = 0; c < C; c++) {
            cin >> linksT[c];
//          cout << linksT[c];
        }
//            cout << endl;
        
        int linksB[C];
        // Connection of each chain
        for (int c = 0; c < C; c++) {
            cin >> linksB[c];
//          cout << linksB[c];
        }
//            cout << endl;
        

        int length = 0;

        length += chains[C - 1] - 1;
        
        int stop = 1;
        
        int remainingChain = 0;
        
        for (int c = 0; c < C; c++) {
            remainingChain += chains[c];
        }

        cout << endl;
        for (int j = C - 1; j > 0; j--) {
            remainingChain -= chains[j];
            if (linksT[j] == linksB[j]) {
                stop = j;
                length += 2;
                break;
            }

//            cout << chains[j] << endl;
            if (remainingChain < abs(linksT[j + 1] - linksB[j + 1])) {
                cout << 1234 << endl;
                stop = j + 1;
//                length += 2;
                break;
            }
            
            int stepsToEdges = 0;
            
            if (linksT[j] <= chains[j] / 2) {
                stepsToEdges += 1 - linksT[j];
            } else {
                stepsToEdges += chains[j - 1] - linksT[j];
            }

            if (linksB[j] <= chains[j] / 2) {
                stepsToEdges += 1 - linksB[j];
            } else {
                stepsToEdges += chains[j - 1] - linksB[j];
            }

            length += stepsToEdges + 2;
        }
        
        length += abs(linksT[stop] - linksB[stop]);
              
        
        cout << length;
        cout << endl;
    }
    cout << endl;
    return 0;
}
