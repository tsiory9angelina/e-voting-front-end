import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./service/provider/AuthProvider";
import routeComponents from "./routes";
import ProtectedRoute from "./service/provider/ProtectedRoute";

type RouteType = {
  path: string;
  component: React.ComponentType;
  protected?: boolean;
  routes?: RouteType[];
};

function App() {
  const renderRoutes = (routes: RouteType[], isProtected: boolean) => {
    return routes.map((route, index) => {
      const RouteComponent = route.component;
      const render = (
        <Route
          key={index}
          path={route.path}
          element={
            isProtected ? (
              <ProtectedRoute>
                <RouteComponent />
              </ProtectedRoute>
            ) : (
              <RouteComponent />
            )
          }
        />
      );

      // Rendu récursif pour les sous-routes
      if (route.routes) {
        return (
          <Route key={index} path={route.path} element={<RouteComponent />}>
            {renderRoutes(route.routes, route.protected ?? false)}
          </Route>
        );
      }

      return render;
    });
  };

  return (
    <>
      <React.Fragment>
        <Router>
          <AuthProvider>
            <Routes>{renderRoutes(routeComponents, false)}</Routes>
          </AuthProvider>
        </Router>
      </React.Fragment>
    </>
  );
}
export default App;
