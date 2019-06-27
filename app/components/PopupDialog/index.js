/**
*
* PopupDialog
*
*/

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class PopupDialog extends React.PureComponent {
    render() {
        return (
            <div>
                <Dialog open={this.props.display} fullWidth={true}>
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.onUpdate} color="primary" autoFocus={true}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
