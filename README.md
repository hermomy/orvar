# Developing
- Fork this repo
- Clone it with `git clone git@github.com:<your_github_username>/orvar`
- Start developing
## Linux 
```
sudo apt install libpng-dev
npm i && npm start
```
# Readme

Orvar
----------

Documentation:
Type of enzyme test coverage:
* functions: check if the return value from function matches expectation
* branches: every outcome from a code module is tested. For example, if the outcomes are binary, you need to test both True and False outcomes. (if else)
* Statement: Statement coverage is a white box test design technique which involves execution of all the executable statements in the source code at least once
* lines: Make sure every line is run without error

Assummed TDD flow:
1. Come our with basic MVP wireframe
2. Function test:
    - Write out expected functionality
    - create function
    - feed in hardcoded data and output result
    - test whether funtion return expected result
    - work on the function logic
    - run test script again to make sure things work
3. Branches test
    - Define all the possible branches (if else switch case)
    - write out all the cases
    - hard code all the cases
    - feed in hardcoded data and output result
    - make sure each and every branch have their own test
    - run some sample use case to make sure it is working correctly

======
