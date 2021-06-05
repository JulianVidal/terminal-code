//
//  main.cpp
//  yes
//
//  Created by Julian Vidal on 14.04.2021.
//

#include <iostream>
#include <stdio.h>
#include <cmath>


using namespace std;

typedef long long int ll;


int main(int argc, const char * argv[]) {
    int T; cin >> T;

    for (int t = 0; t < T; ++t) {
        ll n, k; cin >> n >> k;


        ll r = n % k;
        k = (r == 0) ? n : n + (k - r);
        ll out = ceil((double)k / (double)n);
 
        cout << out << endl;
    }
    
    
//    int cases;
//
//    cin >> cases;
//
//    int i = 0;
//    double input[cases * 2];
//    while (i < cases * 2) {
//        double n, k;
//
//        cin >> n;
//        cin >> k;
//
//        input[i] = n;
//        input[i + 1] = k;
//
//        i += 2;
//    }
//
//    i = 0;
//
//    while (i < cases * 2) {
//        double n, k, j = 1;
//
//        n = input[i] ;
//        k = input[i + 1];
//
//        while (n > k * j) j++;
//
//        int out = ceil((k * j) / n);
//
//        cout << out << endl;
//
//        i += 2;
//    }

    return 0;
}
