# Idempotency Tutorial
A simple server side code for my blog on idempotency. 
https://devpiku.com/post-requests-playing-among-us-try-idempotency
Its written in NodeJS and uses redis as a state store for the requests.

![1x-2023-12-10-1702](https://github.com/piku98/idempotency-tutorial/assets/43680169/5a7bb1ee-5af8-423d-a996-350d7726a319)


## Steps to run:
You would need docker to make things simple.
Just pull the code and run `docker compose up`.

If you dont use docker install redis and node. Then in the project file run `npm install` blah, blah, blah. Just install docker and run the command written above.
