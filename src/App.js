import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom';

import { checkUserSession } from "./redux/user/userActions";


import WithAuth from "./hoc/withAuth";

import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from "./pages/Homepage/Homepage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Reset from "./pages/Reset/Reset";
import Dashboard from "./pages/Dashboard/Dashboard";

import './default.scss'


const App = ()  => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUserSession())
    }, [])


    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => (
                    <HomepageLayout>
                        <Homepage />
                    </HomepageLayout>
                )}/>
                <Route path="/registration"
                    render={() => (
                        <MainLayout>
                            <Registration />
                        </MainLayout>
                    )}
                />
                <Route path="/login"
                    render={() => (
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    )}
                />
                <Route path="/reset"
                       render={() => (
                           <MainLayout>
                               <Reset />
                           </MainLayout>
                       )}
                />
                <Route path="/dashboard"
                       render={() => (
                           <WithAuth>
                               <MainLayout>
                                   <Dashboard />
                               </MainLayout>
                           </WithAuth>
                       )}
                />
            </Switch>
        </div>
    );


}


export default App;
