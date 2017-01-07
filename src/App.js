//@flow
import React, { Component } from 'react';
import { BaseRestProvider } from '@imp_pat/ui-kit/components';
import { Route, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import store from './configureStore';
import { Provider } from 'react-redux';
import Container from './MainContainer';
import allRoutes from './routes';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const history = syncHistoryWithStore(browserHistory, store)

const routes = <Route path="/" component={Container}>
  {allRoutes}
</Route>

export class Application extends Component {
	render(){
		return <Provider store={store}>
    	<BaseRestProvider dispatch={store.dispatch}>
    		<Router history={history}>
    			{routes}
 			  </Router>
 		</BaseRestProvider>
    </Provider>
	}
}

const DnDApp = DragDropContext(HTML5Backend)(Application);

export class App extends Component {
  render() {
    return (
	    <DnDApp />
    );
  }
}

