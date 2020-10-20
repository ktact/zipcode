import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ zipcode: e.target.value });
  }

  handleSubmit(e) {
    fetch(`https://api.zipaddress.net/?zipcode=${this.state.zipcode}`, {
      mode: 'cors'
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ address: json.data.fullAddress });
      });
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <p>
              <input type="text" value={this.state.zipcode} onChange={this.handleChange}/>
              <input type="submit" value="検索"/>
            </p>
          </form>
          <p>{this.state.address}</p>
        </header>
      </div>
    );
  }
}

export default App;
