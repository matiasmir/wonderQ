## Usage

- Simply run `yarn` and then `yarn start` to get WonderQ up and running!
- Once WonderQ is running you can check the docs at `/docs`

## Scaling

- One of the first steps to scale WonderQ is to start using a real database in order to have the data stored and secured in a safe location outside of the memory of the instance to prevent data loss in case of a crash, restart, etc.
- To scale it I'll recommend dockerizing the application in order to host it in a Serverless environment or in a Kubernetes Cluster where the application will be monitored and can be scaled easily depending in different variables like cpu usage, requests per minute.

## Potential issues

- One of the things that we have to take into consideration is the rate at which messages are going to be saved/polled/deleted, the database of choice will have to be selected with this in mind, Looking at the type of application and the purpose that it has I'd choose an in-memory store that can make transactions at a very high phase like Redis.
