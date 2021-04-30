import { render } from '@testing-library/react'
import React from 'react'


 class NameTask extends React.Component {
      constructor(props) {
          super(props);
          this.state = {  
              name: props.name
          }
      }
      render() { 
          return ( 
            <p>Name task: {this.state.name}</p>
           );
      }
  }
   
  export default NameTask;