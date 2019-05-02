const styles = {
    root: {
        flexGrow: 1,
    },
    side: {
        textAlign: 'center',
    },
    middle: {
        textAlign: 'center',
    },
    avatar: {
        margin: 10,
    },
    menubutton: {
        marginLeft: -12,
        marginRight: 20,
    },
    btn: {
        background: 'linear-gradient(45deg, #CCC 30%, #CCAA00 90%)',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 80,
        padding: '0 30px',
    },
    dollarrule: {
        '&$disabled': {
            background: 'linear-gradient(45deg, #94352 30%, #CCAA00 90%)',
            height: 20,
        },
    },
    disabled: {},
};

export default styles;
