/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: []
    };
  }

  componentDidMount() {
      var url = 'http://127.0.0.1:5000/main?url=';
      chrome.tabs.query({
              active: true,
              currentWindow: true
          },
          (tabs) => {
              url+=tabs[0].url;
              console.log("Vo ComponentDidMount :  " + tabs[0].url);
              this.fetchData(url);

          });
  }

  fetchData(url){
      fetch(url).then(result => {
          console.log('Resault from fetch url: ');
          console.log(result);
          return result.json();
      }).then(data => {
          console.log('Data vo then od fetch: ');
          console.log(data);
          this.setState({data: data.summary});
          console.log('State: ')
          console.log(this.state.data)
      })
  }

  render() {

    return (
        <div class='jumbotron'>
            <h1 class='display-4'>Text Summary for the current page</h1>
            <hr class='my-4'></hr>
            <p> {this.state.data} </p>
        </div>
    );
  }
}

export default App;