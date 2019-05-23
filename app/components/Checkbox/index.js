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
        if (this.props.needSelectedOptionName) {
            let temp = '';
            Object.values(tempUserChoice).forEach((choice) => {
                temp += `${choice.name},`;
            });
            temp = temp.substring(0, temp.length - 1);
            this.props.saveDataNameToContainer(temp);
        }
        this.setState({ newSelection: tempUserChoice });
    }

    render() {
        return (
            <div>
                {
                    this.props.choice.map((item) => (
                        !this.props.noTickDesign ?
                            <div key={item.id}>
                                <input
                                    name="skin_concern"
                                    type="checkbox"
                                    value={item}
                                    onChange={() => this.saveSelectToState(item)}
                                    defaultChecked={this.state.defaultData[item.id] || false}
                                />{item.name}
                            </div>
                        :
                            <div
                                onClick={() => { this.saveSelectToState(item); }}
                                key={item.id}
                            >
                                <i className={`${this.state.newSelection[item.id] ? 'fa fa-check' : 'fa fa-square'}`} aria-hidden="true"></i>
                                <span>{item.name}</span>
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
