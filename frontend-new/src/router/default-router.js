import React, {useEffect, useState} from 'react'
import Index from '../views/dashboard/index'
import {Switch, Route, useLocation} from 'react-router-dom'

//TransitionGroup
import {TransitionGroup,CSSTransition} from "react-transition-group";
//Special Pages

import jwtDecode from "jwt-decode";
import routes from "./route-list";

const DefaultRouter = () => {
    const jwt =sessionStorage.getItem('userToken');
    const allowRoleList = jwtDecode(jwt).roles;
   const [allowRouteList,setAllowRouteList]=useState([]);

    useEffect(()=>{
        //routes.filter(r=>r.role.includes(allowRoleList))
        if(allowRoleList.includes("ROLE_SUPERADMIN")){
            setAllowRouteList(routes.filter(r=>r.role.includes('ROLE_SUPERADMIN')))
        }
        else if(allowRoleList.includes("ROLE_ADMIN") && allowRoleList.includes("ROLE_USER")){
            setAllowRouteList(routes.filter(r=>r.role.includes('ROLE_ADMIN') && r.role.includes('ROLE_USER')))
        }
        else if(allowRoleList.includes("ROLE_ADMIN")){
            setAllowRouteList(routes.filter(r=>r.role.includes('ROLE_ADMIN')))
        }
        else if(allowRoleList.includes("ROLE_USER")){
            setAllowRouteList(routes.filter(r=>r.role.includes('ROLE_USER')))
        }

    },[])

    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    <Route path="/dashboard" exact component={Index} />
                    {/* user */}
                    {allowRouteList.map(r => <Route key={r.key} exact path={r.route} component={r.component} />)}

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DefaultRouter
