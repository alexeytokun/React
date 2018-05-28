import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';
import '../css/FilterSelect.css';

const options = [
        {key: 1, value: 1, text: 'Default'},
        {key: 2, value: 2, text: 'Lot name'},
        {key: 3, value: 3, text: 'Price ascending'},
        {key: 4, value: 4, text: 'Price descending'},
        {key: 5, value: 5, text: 'Start time'},
        {key: 6, value: 6, text: 'End time'},
        {key: 7, value: 7, text: 'Only pending'},
        {key: 8, value: 8, text: 'Only active'},
        {key: 9, value: 9, text: 'Only finished'},
    ];

class FilterSelect extends Component {

    handleSelectChange(e, values) {
        const value = values.value;
        this.props.onSelect(value);
    }

    render() {
        return (
            <span className='lots_filter_container'>
                <span className='lots_filter_text'>Sort by: </span>
                <Select className='lots_filter_select' placeholder='Default' options={options} onChange={this.handleSelectChange.bind(this)}/>
            </span>
        );
    }
}

export default FilterSelect;