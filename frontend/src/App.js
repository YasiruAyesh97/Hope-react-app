import { Routes, Route } from 'react-router-dom';
//router
// import IndexRouters from "./router/index"
import Layout from './components/Layout';
import DashboardLayOut from '../src/layouts/dashboard/default2';
//Public
import Login from './views/public/login';
import Reset from './views/public/reset-password';
import ConfirmMail from './views/public/confirm-mail';
import Error404 from './views/public/errors/error404';
import Error401 from './views/public/errors/error401';

//Super Admin
import SuperAdminAdd from './views/super-admin/manage-users/admin-add';
import SuperAdminList from '../src/views/super-admin/manage-users/admin-list';
import CompanyAdd from './views/super-admin/company/company-add';
import CompanyList from './views/super-admin/company/company-list';
//Admin
import UserAdd from './views/admin/manage-user/user-add';
import UsersList from './views/admin/manage-user/user-list';
import CatalogDataAdd from './views/admin/catalog/catalog-data-add';
import CatalogList1 from './views/admin/catalog/catalog-list1';
import CatalogList2 from './views/admin/catalog/catalog-list2';
import CatalogList3 from './views/admin/catalog/catalog-list3';


//Admin User
import DocumentAdd from './views/admin/document/document-add';
import DocumentList from './views/admin/document/document-list';


//scss
import "./assets/scss/hope-ui.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/customizer.scss"

import RequireAuth from "./components/RequireAuth";



const ROLES = {
    'SuperAdmin':'ROLE_SUPERADMIN',
    'Admin':'ROLE_ADMIN',
    'User': 'ROLE_USER',

}

function App() {
  return (


      <Routes>

          <Route path="/" element={<Layout />}>
              {/* public routes */}

              <Route path="auth" element={<Login />} />
              <Route path="auth/reset" element={<Reset />} />
              <Route path="auth/reset/confirm-mail" element={<ConfirmMail />} />
              <Route path="unauthorized" element={<Error401 />} />

              {/*we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin,ROLES.Admin,ROLES.User]} />}>
                  <Route path="/" element={<DashboardLayOut />} >
                      <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
                          <Route path="admin-list" element={<SuperAdminList />} />
                          <Route path="admin-add" element={<SuperAdminAdd />} />
                          <Route path="company-add" element={<CompanyAdd />} />
                          <Route path="company-list" element={<CompanyList />} />
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                          <Route path="user-add" element={<UserAdd />} />
                          <Route path="user-list" element={<UsersList />} />
                          <Route path="catalog-add" element={<CatalogDataAdd />} />
                          <Route path="catalog-list1" element={<CatalogList1 />} />
                          <Route path="catalog-list2" element={<CatalogList2 />} />
                          <Route path="catalog-list3" element={<CatalogList3 />} />



                      </Route>
                      <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.User]} />}>
                          <Route path="document-add" element={<DocumentAdd />} />
                          <Route path="document-list" element={<DocumentList />} />
                      </Route>
                  </Route>
              </Route>

               {/*super admin*/}
              {/*<Route path="dashboard" element={<DashboardLayOut />} >*/}
              {/*    <Route path="adminlist"  element={<SuperAdminList />}/>*/}
              {/*    <Route path="adminadd"  element={<SuperAdminAdd />}/>*/}

              {/*    <Route path="catalog" element={<CatalogDataAdd />} />*/}
              {/*    <Route path="cataloglist1" element={<CatalogList1 />} />*/}

              {/*    <Route path="doc" element={<DocumentAdd />} />*/}
              {/*</Route>*/}

              {/*admin*/}


              {/*<Route path="dashboard/app/user-list"  element={<UserList />}/>*/}
              {/*</Route>*/}

              {/*<Route path="/dashboard/app/user-list"  element={<UserList />} />*/}


              {/* catch all */}
              <Route path="*" element={<Error404 />} />
          </Route>
      </Routes>
  );
}

export default App;
