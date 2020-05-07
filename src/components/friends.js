import React from 'react';
import ReactSearchBox from 'react-search-box';

export default class Friends extends Component {
    data = [
    {
        key: 'kat',
        value: 'Katherine Lasonde',
    }
]

render() {
    <ReactSearchBox
        placeholder="hi"
        value="Kat Lasonde is cool"
        data={this.data}
        callback={record => console.log(record)}
      />
}
}