# GraphQL

* A "data query language"
* Facebook 2012, powers mobile apps, open sourced in 2015



## vs. REST

* stop useless round-trips
* easier to work with nested resources
* request only necessary data, REST gives you everything



## Features

* queries mirror their response (predictable data shape)
* lots of client flexibility

```
//request
query {
  articles {
    date,
    title,
  }
}

//response
{
  data: [
    {
      date: '2017-01-29',
      title: 'How to use GraphQL',
    }
  ]
}
```


* strongly typed ( GraphQLString, GraphQLEnum, GraphQLList, GraphQLObject)

```
const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: {
    title: GraphQLString,
    ...
  }
});
```



## Defining a Schema

* root object type contains `query` and `mutation` properties
* difference between query and mutation is convention, mutations have *side-effects*
```
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({ ... }),
  mutation: new GraphQLObjectType({ ... })
});
```



* types have `fields`, each field can support `args` and `resolve`

```
  fields: {
    body: {
      type: GraphQLString,
      args: {
        numOfChars: {
          type: GraphQLInt,
        }
      },
      resolve: (__, args) => // substring article to number of chars, return
    }
  }
```


* even scalar fields, i.e. (GraphQLInt), can declare args, e.g. `inch`, `cm`
* `resolve` can return a `Promise`



## Constructing Queries

* POST string queries to the graphql endpoint
* include variables inline
* better is to include them as a variable
* also, use variables to supply data for mutations
```
// OK
query {
  article(id: 'abcd-1234') {}
}

// Better
query ($articleId: GraphQLString!) {
  article(id: $articleId) {}
}

variables {
  articleId: 'abcd-1234'
}
```



## More features
* directives on fields, `@include()`, `@skip()`
* inline fragments for querying interface types
* extract type when querying interfaces using `__typename`

```
query {
  articles {
    title,
    ... on BlogType {
      comments {
        user
      }
    },
    ... on AlbumType {
      images {
        url
      }
    }
  }
}
```

## GraphQL Client -- Apollo
* provide functionality for querying graphql server



### Features
* caching queries
* batching requests
* query deduplication
* uses `redux` store under the hood



### (Apollo) Integrating with `react`
* prebuild queries
* wrap components using Higher Order Components
```
import React       from 'react';
import gql         from 'graphql-tag';
import { graphql } from 'react-apollo';

const articleData = gql`
query {
  articles {}
}
`;

class Article extends React.Component {}

export default articleWithData = graphql(articleData)(Article);
```



* `react-apollo` handles fetching
* `react-apollo` provides properties to component
```
  render() {
    /** react-apollo provided props */
    const { data, errors, loading } = this.props;
    const articles = data.articles;
  }
```



* inject query variables by configuring wrapped component
```
const articleWithData = graphql(articleData, {
  options: (ownProps) => ({
    variables: {
      articleId: ownProps.id
    }
  })
})(Article);
```



* mutations are less well defined, preferable (to me) to use the client directly
```
import client            from './apollo-client':
import { createArticle } from './mutations';

const newArticle = { title: 'Fizzbuzz', body: 'Lorem ipsum...' };

client.mutate({
  mutation: createArticle;
  variables {
    article: newArticle
  }
}).then(data => // ... )
  .catch(data => // ...);
```
