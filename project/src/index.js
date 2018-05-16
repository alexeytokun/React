import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { LoadingView } from "./components/LoadingView";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
