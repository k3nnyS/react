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

import { Add } from '@material-ui/icons';

export default ({ createNew, handleToggle, handleClose, handleChange, handleChangeCheckBox, handleSubmit, category: { initial, name, active } }) => {
    return <Fragment>
        <Button variant='contained' color='primary' onClick={handleToggle} mini>
            <Add />
        </Button>
        <Dialog open={createNew} onClose={handleClose} >
            <DialogTitle id="form-dialog-title">
                Create new Category
              </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below!
                </DialogContentText>
                <form>
                    <TextField label="Initial" value={initial} onChange={handleChange('initial')} margin="normal" />
                    <br />
                    <TextField label="Name" value={name} onChange={handleChange('name')} margin="normal" />
                    <br />
                    <FormControlLabel
                        label="Active"
                        control={
                            <Switch
                                checked={active}
                                onChange={handleChangeCheckBox('active')}
                                value="active"
                                color="primary"
                            />
                        }
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                    variant='raised'>
                    Cancel
                    </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant='raised'>
                    Create
                    </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}