/**
*
* Checkbox
*
*/

import React from 'react';
// import styled from 'styled-components';
// import { dataChecking } from 'globalUtils';
import './style.scss';

class Checkbox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        defaultData: null,
        newSelection: null,
    }

    componentWillMount() {
        const tempUserChoice = { ...this.state.defaultData };
        this.props.userselect.forEach((select) => {
            tempUserChoice[select.id] = select;
        });
        this.setState({ defaultData: tempUserChoice, newSelection: tempUserChoice });
    }

    saveSelectToState = (item) => {
        const tempUserChoice = { ...this.state.newSelection };
        if (tempUserChoice[item.id] && tempUserChoice[item.id].id === item.id) {
            delete tempUserChoice[item.id];
        } else {
            tempUserChoice[item.id] = item;
        }
        this.props.saveDataToContainer(tempUserChoice);
        this.setState({ newSelection: tempUserChoice });
    }

    render() {
        return (
            <div>
                {
                    this.props.choice.map((item) => (
                        <div key={item.id}>
                            <input
                                name="skin_concern"
                                type="checkbox"
                                value={item}
                                onChange={() => this.saveSelectToState(item)}
                                defaultChecked={this.state.defaultData[item.id] || false}
                            />{item.name}
                        </div>
                    ))
                }
            </div>
        );
    }
}

Checkbox.propTypes = {

};

export default Checkbox;
