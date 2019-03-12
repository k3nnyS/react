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

export default ({ editVariant, handleClose, handleSubmit, handleChange, handleChangeCheckBox, variant: {categoryId, initial, name, active} }) => {
    return <Fragment>
        <Dialog open={editVariant} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">
                Edit Variant
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Pleas fill our the form bellow!
                </DialogContentText>
                <form>
                <TextField label="Category ID" value={categoryId} onChange={handleChange('categoryId')} margin="normal" />
                    <br />
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
                    variant="raised">
                    Cancel
                    </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="raised">
                    Edit
                    </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}