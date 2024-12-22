// import './App.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Home from './Pages/Home/Home.jsx';
// import Error from './Pages/Error/Error.jsx';
// import MovieDetails from './Pages/MovieDetails/MovieDetails.jsx';
// import Search from './Pages/Search/Search.jsx';

// function App() {
  
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home/>,
//       errorElement: <Error/>
//     },
//     {
//       path: "/filme/:id",
//       element: <MovieDetails />,
//     },
//     {
//       path: "/pesquisa/:filter",
//       element: <Search />,
//       loader: ({ params, search }) => ({ filter: params.filter, id: new URLSearchParams(search).get('q') }),
//     }
//   ],
//   {
//     basename: "/cineradar", // Define o caminho base
//   }
// );

//   return (
//     <RouterProvider router={router} />  
//   )
// }

// export default App


import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from 'react';
import Home from './Pages/Home/Home.jsx';
import Error from './Pages/Error/Error.jsx';
import MovieDetails from './Pages/MovieDetails/MovieDetails.jsx';
import Search from './Pages/Search/Search.jsx';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />
      },
      {
        path: "/filme/:id",
        element: <MovieDetails />,
      },
      {
        path: "/pesquisa/:filter",
        element: <Search />,
        loader: ({ params, search }) => ({
          filter: params.filter,
          id: new URLSearchParams(search).get('q')
        }),
      }
    ],
    {
      basename: "/cineradar", // Caminho base para o GitHub Pages
    }
  );

  // Lida com redirecionamento vindo do 404.html
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const redirectedPath = query.get("redirect");
    
    if (redirectedPath) {
      const decodedPath = decodeURIComponent(redirectedPath);
      // Substitui a URL no histórico sem o parâmetro `redirect`
      window.history.replaceState({}, '', decodedPath);
    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

