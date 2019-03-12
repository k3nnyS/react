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

export default ({ deleteCategory, handleClose, handleSubmit, category: { initial, name, active } }) => {
    return <Fragment>
        <Dialog open={deleteCategory} onClose={handleClose} >
            <DialogTitle id="form-dialog-title">
                Delete Category
              </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure to delete?
                </DialogContentText>
                <form>
                    <TextField label="Initial" value={initial} margin="normal" disabled={true}/>
                    <br />
                    <TextField label="Name" value={name} margin="normal" disabled={true}/>
                    <br />
                    <FormControlLabel
                        label="Active"
                        disabled
                        control={
                            <Switch
                                checked={active}
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
                    Delete
                    </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}