import { Navigate, useLocation } from "react-router-dom";
//import routeComponents from "../../routes";

const ProtectedRoute=({children}:any)=>{
    const location=useLocation();
    if (localStorage.getItem('user') === null || localStorage.getItem('token') === null) {
        console.log("Cache empty - Return to login")
        localStorage.removeItem('user');    
        localStorage.removeItem('token'); 
        localStorage.removeItem('stationsData'); 
        return <Navigate to="/" replace state={{from:location}}/>
    }
    return children;
}

export default ProtectedRoute;

/*
import { Navigate, useLocation } from "react-router-dom";
import routeComponents from "../../routes";

const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();
  
    // Vérifier si l'utilisateur est authentifié
    if (localStorage.getItem('user') === null || localStorage.getItem('token') === null) {
      console.log("Cache empty - Return to login");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('stationsData');
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  
    // Vérifier si la route actuelle est protégée
    const currentPath = location.pathname;
    const isProtectedRoute = routeComponents.some(route => {
      if (route.path === currentPath || (route.routes && route.routes.some(subRoute => subRoute.path === currentPath))) {
        return route.protected;
      }
      return false;
    });
  
    // Si la route est protégée et l'utilisateur est authentifié, afficher les enfants
    if (isProtectedRoute) {
      return children;
    } else {
      // Rediriger vers la page 404 si la route n'est pas trouvée dans routeComponents
      return <Navigate to="/404" replace />;
    }
  };
  
  export default ProtectedRoute;

*/
