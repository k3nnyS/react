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
import CheckBox from '@material-ui/core/Checkbox';

import {Edit, Delete} from '@material-ui/icons';

import {config} from '../base/config';
import axios from 'axios';

import CreateVariant from './create';
import EditVariant from './edit';
import DeleteVariant from './delete';

class Variants extends React.Component {
    variantModel = {
        _id: '',
        categoryId: '',
        initial: '',
        name: '',
        active: true
    }

    constructor(props) {
        super(props);
        this.state = {
            variants: [],
            createNew: false,
            editVariant: false,
            deleteVariant: false,
            variant: this.variantModel,
            load: true
        }
    }

    reloadVariantData = () => {
        axios.get(config.url + '/variant', {headers: {"x-access-token": config.token} })
            .then(res => {
                this.setState({
                    variants: res.data,
                    createNew: false,
                    editVariant: false,
                    deleteVariant: false,
                    load: false
                })
                console.log(res.data);
            })
            .catch((error) => {
                alert(error);
            })
    }

    componentDidMount() {
        this.reloadVariantData();
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
            variant: this.variantModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editVariant: false,
            deleteVariant: false
        })
    }

    handleChange = name => ({ target: {value} }) => {
        this.setState({
            variant: {
                ...this.state.variant,
                [name]: value
            }
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({
            variant: {
                ...this.state.variant,
                [name]: event.target.checked
            }
        });
    }

    handleSubmit = () => {
        const {variant, createNew} = this.state;

        let newVariant = {
            categoryId:variant.categoryId,
            initial: variant.initial,
            name: variant.name,
            active: variant.active
        }

        if (createNew) {
            axios.post(config.url + '/variant', newVariant, {headers: {"x-access-token": config.token} })
                .then(res => {
                    this.reloadVariantData();
                    alert('Variant has been saved.');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/variant/' + variant._id, newVariant, {headers: {"x-access-token": config.token} })
                .then(res => {
                    this.reloadVariantData();
                    alert('Variant has been updated');
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

        axios.get(config.url + '/variant/' + _id, {headers: {"x-access-token": config.token} })
            .then(res => {
                this.setState({
                    variant: res.data,
                    createNew: false,
                    editVariant: true,
                    laod: false
                });
            })
            .catch((error) => {
                alert(error);
            })
    }

    handleDelete = (_id) => {
        this.setState({
            load: true
        });

        axios.get(config.url + '/variant/' + _id, {headers: {"x-access-token": config.token} })
            .then(res => {
                this.setState({
                    variant: res.data,
                    createNew: false,
                    deleteVariant: true,
                    load: false
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    handleDeleteConfirm = () => {
        const {Variants, variant} = this.state;
        axios.delete(config.url + '/variant/' + variant._id, {headers: {"x-access-token": config.token} })
            .then (res => {
                this.reloadVariantData();
                alert('Variant has been deleted.');
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        const {variants, load} = this.state;
        const {classes} = this.props;

        return (
            <div>
                <h1>List of Variant</h1>
                <CreateVariant createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} variant={this.state.variant} variants={this.state.variants}/>
                <EditVariant editVariant={this.state.editVariant} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} variant={this.state.variant} />
                <DeleteVariant deleteVariant={this.state.deleteVariant} handleClose={this.handleClose} handleSubmit={this.handleDeleteConfirm} variant={this.state.variant} />
                <CircularProgress className={classes.progress} style={{visibility: (load ? 'visible' : 'hidden') }} color="secondary" />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category ID</TableCell>
                            <TableCell>Initial</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {variants.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{n.category.name}</TableCell>
                                    <TableCell>{n.initial}</TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>
                                        <CheckBox disabled checked={n.active} value="active" />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleEdit(n._id)} variant="contained" color="primary" ><Edit /></Button>
                                        <Button onClick={() => this.handleDelete(n._id)} variant="contained" color="secondary" ><Delete /></Button>
                                    </TableCell>
                                </TableRow>
                            )
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

Variants.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Variants);