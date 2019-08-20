/**
*
* PopupDialog
*
*/

import React from 'react';

import {
    Dialog,
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
                </Dialog>
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
