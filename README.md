# Animal Crossing GraphQL API

This project provides a GraphQL API around various pieces of data in Animal Crossing. It wraps the [Animal Crossing: New Horizons API](http://acnhapi.com/).

[Click Here](https://animal-crossing-graphql.azurewebsites.net/) for a live demo.

## Running Locally

The image being run for the demo can be found on [DockerHub](https://hub.docker.com/r/cr0wst/animal-crossing-graphql).

```sh
docker pull cr0wst/animal-crossing-graphql:latest
docker run --rm -p 3000:3000 cr0wst/animal-crossing-graphql:latest
```

By default, the server listens on port 3000, but this can be changed by passing in the `PORT` environment variable.

## Query for Villagers

Villagers can be queried for by sending a `POST` request to `https://animal-crossing-graphql.azurewebsites.net` with the following body:

```graphql
query {
  villagers(personality: Cranky, species: [Cat, Frog]) {
    name,
    catchPhrase,
    birthday
  }
}
```

In this example, I'm querying for the name, catch-phrase, and birthday of all of the Cranky Cat and Frog villagers.

## Contribution

This project was created for me to refine my skills using [TypeScript](https://www.typescriptlang.org/), [Apollo Server](https://www.apollographql.com/server/), [TypeGraphQL](https://typegraphql.com/), and [GraphQL](https://graphql.org/). 

Contributions are welcome in the form of issues and pull requests, but I can't guarantee a timely response.