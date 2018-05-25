import React, { Component } from 'react';
import { Search, Grid, Image } from 'semantic-ui-react';
import defaultImage from '../no_image.png';
import { Redirect } from 'react-router-dom';
import '../css/Search.css';

class CustomSearch extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React',
            isLoading: false,
            value: '',
            results: [],
            options: null,
            redirect: false
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.resultRenderer = this.resultRenderer.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            const re = new RegExp(this.state.value, 'i');
            const isMatch = result => re.test(result.title);

            const results = this.state.options.filter(isMatch).map(result => ({ ...result, key: result.id }));

            this.setState({
                isLoading: false,
                results: results,
            });
        }, 500)
    };

    resultRenderer(item) {
        return(
            <Grid>
                <Grid.Column width={6}>
                    <Image size='huge' src={item.image || defaultImage}/>
                </Grid.Column>
                <Grid.Column width={9}>
                    <p>{item.title}</p>
                    <p>{item.price}$</p>
                </Grid.Column>
            </Grid>
        );
    };

    handleResultSelect(e, data) {
        this.setState({redirect: data.result.id.toString()});
    }

    mapLots(lots) {
        return lots.map((lot) => {
            return {
                id: lot.lot_id,
                title: lot.lot_name,
                description: lot.description,
                image: (lot.images.length && lot.images[0].path) || '',
                price: lot.price ? lot.price.toString() : '0'
            }
        });
    }

    componentWillMount() {
        if (this.props.lots) {
            const searchableArray = this.mapLots(this.props.lots);
            this.setState({options: searchableArray});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            const searchableArray = this.mapLots(this.props.lots);
            this.setState({options: searchableArray});
        }
    }

    componentDidUpdate() {
        if(this.state.redirect) {
            this.setState({redirect: false});
        }
    }

    render() {
        const { isLoading, value, results, options } = this.state;
        if (!options) return null;

        if(this.state.redirect) {
            return <Redirect push to={'/lot/' + this.state.redirect}/>
        }

        return (
                <Search
                    loading={isLoading}
                    resultRenderer={this.resultRenderer}
                    onSearchChange={this.handleSearchChange}
                    onResultSelect = {this.handleResultSelect}
                    results={results}
                    value={value}
                    size='mini'
                    fluid
                    className='search_input'
                />
        );
    }
}

export default CustomSearch;