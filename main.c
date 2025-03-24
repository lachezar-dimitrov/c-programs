#include <stdio.h>

int main(int argc, char *argv[])
{
    int a = 5;
    _Bool is_true = 1;

    short b = 10;
    char c = 'A';
    float d = 3.14;
    double e = 3.14159;
    long f = 1000000000;
    long long g = 1000000000000000000;

    unsigned int h = 10;
    unsigned short i = 10;
    unsigned char j = 'A';
    unsigned long k = 1000000000;
    unsigned long long l = 1000000000000000000;

    const int m = 5;
    volatile int n = 5;
    // What is volatile?
    // The volatile keyword is a type qualifier used to declare that an object can be modified in the program by something such as the operating system, the hardware, or a concurrently executing thread.

    // Creating an object Mutex with name and age
    struct Mutex
    {
        int id;
        _Bool is_locked;
    };

    // Creating an object Person with name and age
    struct Person
    {
        char name[50];
        int age;
    };
    // Lets write some hightly efficient C code
    struct Person person;
    person.age = 25; // Assigning a value to the age of the object Person
    strcpy(person.name, "John Doe");

    // Assigning a value to the name of the object Person

    printf("Hello, WHello, WHello, WHello, World!\n");

    return 0;
}