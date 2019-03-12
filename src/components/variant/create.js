import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {Add, DialpadOutlined} from '@material-ui/icons';

export default ({ createNew, handleClose, handleToggle, handleChange, handleChangeCheckBox, handleSubmit, variant: {categoryId ,initial, name, active}, variants }) => {
    return <Fragment>
        <Button variant="contained" color="primary" onClick={handleToggle} mini>
            <Add />
        </Button>
        <Dialog open={createNew} onClose={handleClose} >
            <DialogTitle id="form-dialog-title">
                Create New Variant
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the from bellow
                </DialogContentText>
                <form>
                    <TextField label="Category ID" value={categoryId} onChange={handleChange('categoryId')} margin="normal"/>
                    <br/>

                    <Select
                        value=''
                        onChange={handleChange}
                        inputProps={{
                        name: 'age',
                        id: 'age-simple',
                        }}
                    >
                    <MenuItem value="">
                        <em>None</em> </MenuItem>
                    {variants.map(n => {
                            return (
                                <MenuItem key={n._id} value={n.categoryId}>{n.category.name}</MenuItem>

                            )
                        })}
                        
 
                    </Select>
                
                    <br/>
                    <TextField label="Initial" value={initial} onChange={handleChange('initial')} margin="normal"/>
                    <br />
                    <TextField label="Name" value={name} onChange={handleChange('name')} margin="normal"/>
                    <br />
                    <FormControlLabel label="Active" control={
                        <Switch
                            checked={active}
                            onChange={handleChangeCheckBox('active')}
                            value="active"
                            color="primary"
                        />
                    } />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="raised" >Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="raised" >Create</Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}