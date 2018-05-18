import React, { Component } from 'react';
import { Search, Grid, Image } from 'semantic-ui-react';
import defaultImage from '../default_product.jpg';
import { Redirect } from 'react-router-dom';

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
                <Grid.Column width={7}>
                    <Image size='huge' src={item.image || defaultImage}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <p>{item.title}</p>
                    <p>{item.price}$</p>
                </Grid.Column>
            </Grid>
        );
    };

    handleResultSelect(e, data) {
        this.setState({redirect: data.result.id.toString()});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            const searchableArray = this.props.lots.map((lot) => {
                return {
                    id: lot.lot_id,
                    title: lot.lot_name,
                    description: lot.description,
                    image: lot.image,
                    price: lot.price ? lot.price.toString() : '0'
                }
            });
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
            <div style={{width: 300}}>
                <Search
                    loading={isLoading}
                    resultRenderer={this.resultRenderer}
                    onSearchChange={this.handleSearchChange}
                    onResultSelect = {this.handleResultSelect}
                    results={results}
                    value={value}
                    size='mini'
                    fluid
                />
            </div>
        );
    }
}

export default CustomSearch;