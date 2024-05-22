#include <iostream>
#include <string>
using namespace std;

void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

string caesarCipher(string message, int shift) {
    string result = "";
    for (char c : message) {
        if (isalpha(c)) {
            char base = islower(c) ? 'a' : 'A';
            c = (c - base + shift) % 26 + base;
        }
        result += c;
    }
    return result;
}

int main() {
    string message;
    int choice;
    int shift_key;
    do {
        clearScreen();