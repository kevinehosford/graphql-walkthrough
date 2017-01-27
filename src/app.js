import React              from 'react';
import ReactDOM           from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient       from 'apollo-client';
import gql                from 'graphql-tag';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools }          from 'redux-devtools-extension/developmentOnly';

const client = new ApolloClient();

const composeEnhancers = composeWithDevTools({});

const reducers = combineReducers({
  apollo: client.reducer(),
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(client.middleware())));

const root = document.getElementById('root');

const App = () => (
  <p>Hello, world!</p>
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  root,
);
