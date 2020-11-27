import React from 'react';
import { getStates } from './fakeAPI';
import logo from './logo.svg';
import './App.css';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  input: {
    fontStyle: 'italic',
    width: 100,
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },

  button: {
    width: 100,
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },

  ul: {
    marginTop: 20
  },

  li: {
    marginTop: 10,
    borderBottom: '1px solid #e7e7e7',
    fontSize: 12,
    padding: 5
  },

  loading: {
    fontStyle: 'italic',
    fontSize: 20
  }
});

function App() {
  const [searchText, setSearchText] = React.useState('');
  const [filteredStates, setFilteredStates] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  const classes = useStyles()

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = async () => {
    setSearching(true);

    try {
      const states = await getStates(searchText);
      setSearching(false);
      setFilteredStates(states);
    } catch (e) {
      console.error(e);
      setSearching(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Autocom test
        </p>
        <input
          value={searchText}
          onChange={handleOnChange}
          className={classes.input}
        />

        <button
          onClick={handleClick}
          className={classes.button}
        >
          Search
        </button>

        <ul className={classes.ul}>
          {!searching && filteredStates.map((state) => (
            <li
              key={state.id}
              className={classes.li}
            >
              {state.name}
            </li>
          ))}
        </ul>

        {searching && <p className={classes.loading}>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
