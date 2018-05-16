import _ from 'lodash'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
// }));

export default class CustomSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortedLots: null,
            isLoading: false,
            results: [],
            value: ''
        }

    };

    componentWillMount() {
        this.resetComponent();
        if (this.props.lots) {
            const sortedLots = this.props.lots.map((lot, i) => {
                return {
                    title: lot.lot_name,
                    description: lot.description,
                    image: lot.image,
                    price: lot.price,
                    id: lot.lot_id,
                }
            });
            this.setState({sortedLots: sortedLots});
        }
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.setState({ value: result.title });

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.sortedLots, isMatch),
            })
        }, 300)
    };

    render() {

        const { isLoading, value, results, sortedLots } = this.state;
        if (!sortedLots) return null;

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}