import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CoverScreen from './pages/CoverScreen';
import HomeScreen from './pages/HomeScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import FullPost from './pages/FullPost';
import CreatePost from './components/CreatePost';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={CoverScreen} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={HomeScreen} />
                    <Route path="/posts/:slug" component={FullPost} />
                    <Route path="/newpost" component={CreatePost} />
                    {/* <Route path="/ui" component={UIComponents} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/form" component={FormPage} />
                    <Route path="/rhform" component={ReactHookForm} />
                    <Route path="/styled" component={StyledCompsPage} />
                    <Route path="/theme" component={ThemeCompsPage} />
                    <Route path="/redux" component={ReduxCounter} />
                    <Route path="/people" component={PeopleProfile} /> */}
                    {/* <Route path="/404" component={PageNotFound} />
                    <Redirect to="/404" /> */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
