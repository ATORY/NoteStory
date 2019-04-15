import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Externals
// import { Chart } from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
// import { chartjs } from './helpers';

// Theme
// import theme from './theme';

// Styles
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import './assets/scss/index.scss';

// Routes
import theme from 'components/admin/theme';
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

// // Configure ChartJS
// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

/*
function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;
*/
