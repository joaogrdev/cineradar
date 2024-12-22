import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Error from './Pages/Error/Error.jsx';
import MovieDetails from './Pages/MovieDetails/MovieDetails.jsx';
import Search from './Pages/Search/Search.jsx';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Error/>
    },
    {
      path: "/filme/:id",
      element: <MovieDetails />,
    },
    {
      path: "/pesquisa/:filter",
      element: <Search />,
      loader: ({ params, search }) => ({ filter: params.filter, id: new URLSearchParams(search).get('q') }),
    }
  ],
  {
    basename: "/cineradar", // Define o caminho base
  }
);

  return (
    <RouterProvider router={router} />  
  )
}

export default App
