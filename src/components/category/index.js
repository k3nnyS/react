import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import { Edit, Delete } from '@material-ui/icons';

import { config } from '../base/config';
import axios from 'axios';

import CreateCategory from './create';
import EditCategory from './edit';
import DeleteCategory from './delete';

class Categories extends React.Component {

    categoryModel = {
        _id: '',
        initial: '',
        name: '',
        active: true
    }

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            createNew: false,
            editCategory: false,
            deleteCategory: false,
            category: this.categoryModel,
            load: true
        }
    }

    reloadCategoryData = () => {
        axios.get(config.url + '/category', { headers: { "x-access-token": config.token } })
            .then(res => {
                this.setState({
                    categories: res.data,
                    createNew: false,
                    editCategory: false,
                    deleteCategory: false,
                    load: false
                })
                console.log(res.data);
            })
            .catch((error) => {
                alert(error);
            })
    }

    componentDidMount() {
        this.reloadCategoryData();
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
            category: this.categoryModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editCategory: false,
            deleteCategory: false
        })
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            category: {
                ...this.state.category,
                [name]: value
            }
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({
            category: {
                ...this.state.category,
                [name]: event.target.checked
            }
        });
    }

    handleSubmit = () => {
        const { category, createNew } = this.state;

        let newCategory = {
            initial: category.initial,
            name: category.name,
            active: category.active
        }

        if (createNew) {
            axios.post(config.url + '/category', newCategory, { headers: { "x-access-token": config.token } })
                .then(res => {
                    this.reloadCategoryData();
                    alert('Category has been saved.');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/category/' + category._id, newCategory, { headers: { "x-access-token": config.token } })
                .then(res => {
                    this.reloadCategoryData();
                    alert('Category has been saved.');
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    handleEdit = (_id) => {
        this.setState({
            load: true
        });

        axios.get(config.url + '/category/' + _id, { headers: { "x-access-token": config.token } })
            .then(res => {
                this.setState({
                    category: res.data,
                    createNew: false,
                    editCategory: true,
                    load: false
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    handleDelete = (_id) => {
        this.setState({
            load: true
        });
        axios.get(config.url + '/category/' + _id, { headers: { "x-access-token": config.token } })
            .then(res => {
                this.setState({
                    category: res.data,
                    createNew: false,
                    deleteCategory: true,
                    load: false
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    handleDeleteConfirm = () => {
        const { Categories, category } = this.state;
        axios.delete(config.url + '/category/' + category._id, { headers: { "x-access-token": config.token } })
            .then(res => {
                this.reloadCategoryData();
                alert('Category has been deleted.');
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {

        const { categories, load } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <h1>List of Category</h1>
                <CreateCategory createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} category={this.state.category} />
                <EditCategory editCategory={this.state.editCategory} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} category={this.state.category} />
                <DeleteCategory deleteCategory={this.state.deleteCategory} handleClose={this.handleClose} handleSubmit={this.handleDeleteConfirm} category={this.state.category} />
                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Initial</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{n.initial}</TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>
                                        <Checkbox disabled checked={n.active} value="active" />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleEdit(n._id)} variant='contained' color='primary'><Edit /></Button>
                                        <Button
                                            onClick={() => this.handleDelete(n._id)}
                                            variant='contained' color='secondary'><Delete /></Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const styles = theme => ({
    progress: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        left: '50%',
        alignItem: 'center',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

Categories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);