/**
*
* PopupDialog
*
*/

import React from 'react';

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import './style.scss';

class PopupDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popup: false,
    }

    handleClickOpen = () => {
    }

    handleClose= () => {
    }

    handleEntering = () => {
        if (this.radioGroupRef.current != null) {
            this.radioGroupRef.current.focus();
        }
    }

    handleCancel = () => {
    }

    handleUpdate = () => {
    }

    handleChange = () => {
    }

    renderPopupDialog = () => {
    }

    render() {
        return (
            <div>
                {this.renderPopupDialog()}
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
