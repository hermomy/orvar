/**
*
* PopupDialog
*
*/

import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class PopupDialog extends React.PureComponent {
    render() {
        return (
            <div>
                <Dialog open={this.props.display} onClose={this.props.onClose} fullWidth={this.props.fullWidth}>
                    <DialogTitle id="alert-dialog-title">
                        <span>{this.props.title}</span>
                        {
                            this.props.onClose &&
                                <IconButton
                                    aria-label="Close"
                                    onClick={this.props.onClose}
                                    style={{
                                        position: 'absolute',
                                        right: '0rem',
                                        top: '0.8rem',
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                        }
                    </DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        {
                            this.props.onCancel &&
                                <Button onClick={this.props.onCancel} color="primary">
                                    Cancel
                                </Button>
                        }
                        {
                            this.props.onUpdate &&
                                <Button onClick={this.props.onUpdate} color="primary">
                                    Update
                                </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
