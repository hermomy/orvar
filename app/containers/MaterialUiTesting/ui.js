import purple from '@material-ui/core/colors/purple';

const styles = {
    btntrue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'blue',
        height: 50,
        padding: '0 30px',
    },
    btnfalse: {
        background: 'linear-gradient(to right, rgb(188, 78, 156), rgb(248, 7, 89))',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'blue',
        height: 50,
        padding: '0 30px',
    },
    dollarrule: {
        '&$disabled': {
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            height: 50,
        },
    },
    disabled: {},
    colorSwitchBase: {
        color: purple[300],
        '&$colorChecked': {
            color: purple[500],
            '& + $colorBar': {
                backgroundColor: purple[500],
            },
        },
    },
    colorBar: {},
    colorChecked: {},
};


export default styles;
