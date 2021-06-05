#include <bits/stdc++.h>

using namespace std;

vector<string> split_string(string);

// Complete the minimumBribes function below.
void minimumBribes(vector<int> q) {
    int bribes = 0;
    int maxPosition = 0;
    list<int> start;
    int size = q.size();

    // Initialises un-bribed array
    for (int i = 1; i <= q.size(); i++) {
        start.push_back(i);
    }

    auto it1 = start.begin();

    // Goes through the bribed array
    for (int i = 0; i < size - 1; i++) {
        int num = q[i];
        // If the bribed array is not equal to unbribe
        // Then there was a bribe
        if (*it1 != num) {
            
            // The index of the number of the unbribed array
            // That is the same as number in the bribed array
            int position;
            auto it2 = start.begin();
            std::advance (it2, i);
            for (int j = i; j < size; j++) {
                if (*it2 == num) {
                    position = j;
                    if (maxPosition < position) maxPosition = position;
                    break;
                }
                if (j == maxPosition) {
                    int d = (num - 1) - j - 1;
                    std::advance (it2,  d);
                    j += d;
                }
                it2++;
            }
            
            // The distance between the position of the
            // number on the bribed array from where it
            // is supposed to be, that is how many bribes it took
            int bribe = position - i;
            if (bribe > 2) {
                cout << "Too chaotic" << endl;
                return;
            }
            
            // Switch in unbribed array to keep track
            // of the bribes needed
            start.insert(it1, *it2);
            start.erase(it2);
            it1--;
            bribes += bribe;
        }
        it1++;
    }

    cout << bribes << endl;
}

int main()
{
    int t;
    cin >> t;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    for (int t_itr = 0; t_itr < t; t_itr++) {
        int n;
        cin >> n;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        string q_temp_temp;
        getline(cin, q_temp_temp);

        vector<string> q_temp = split_string(q_temp_temp);

        vector<int> q(n);

        for (int i = 0; i < n; i++) {
            int q_item = stoi(q_temp[i]);

            q[i] = q_item;
        }

        minimumBribes(q);
    }

    return 0;
}

vector<string> split_string(string input_string) {
    string::iterator new_end = unique(input_string.begin(), input_string.end(), [] (const char &x, const char &y) {
        return x == y and x == ' ';
    });

    input_string.erase(new_end, input_string.end());

    while (input_string[input_string.length() - 1] == ' ') {
        input_string.pop_back();
    }

    vector<string> splits;
    char delimiter = ' ';

    size_t i = 0;
    size_t pos = input_string.find(delimiter);

    while (pos != string::npos) {
        splits.push_back(input_string.substr(i, pos - i));

        i = pos + 1;
        pos = input_string.find(delimiter, i);
    }

    splits.push_back(input_string.substr(i, min(pos, input_string.length()) - i + 1));

    return splits;
}
