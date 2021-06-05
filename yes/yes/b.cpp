//
//  b.cpp
//  yes
//
//  Created by Julian Vidal on 15.04.2021.
//

#include <iostream>
#include <stdio.h>
#include <cmath>


using namespace std;

typedef long long int ll;



int main(int argc, char *argv[]) {
    int T; cin >> T;
    
    for (int t = 0; t < T; ++t) {
        ll length; double k; cin >> length >> k;
        
        ll total; cin >> total;
        ll change = 0;
        for (int i = 1; i < length; i++){
            double p; cin >> p;

            if (p * 100 > k * total) {
                ll newTotal = ceil(100 * p / k);

                change += newTotal - total;
                total += p + newTotal - total;
            } else {
                total += p;
            }
        }
        
        cout << change << endl;
    }
    
    return 0;
}
