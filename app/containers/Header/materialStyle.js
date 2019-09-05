const styles = {
    navLink: {
        color: 'black',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': { color: '#603' },
    },
    header: {
        boxShadow: '0 4px 2px -2px #ccc',
        padding: '1rem',
        backgroundColor: 'white',
    },
    leadTitle: { fontWeight: 600 },
    normalFont: { color: '#969696' },
    leftMegaMenu: {
        backgroundColor: '#f2f2f2',
        textTransform: 'uppercase',
        padding: '2rem',
    },
    leftMegaMenuTextActive: {
        color: '#603',
        fontWeight: 600,
        borderBottom: '2px solid #603',
    },
    urlLink: { textDecoration: 'none' },
    headText: {
        textTransform: 'uppercase',
        textDecoration: 'none',
        '&:hover': { color: '#603' },
    },
    childDrawer: {
        paddingLeft: '2rem',
        backgroundColor: '#ccc',
    },
    mobileSearch: {
        width: '100%',
    },
    popper: {
        top: '10px !important',
        zIndex: 1,
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: 'transparent transparent #F2F2F2 transparent',
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: '#F2F2F2 transparent transparent transparent',
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: 'transparent #F2F2F2 transparent transparent',
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: 'transparent transparent transparent #F2F2F2',
            },
        },
    },
    arrow: {
        position: 'absolute',
        fontSize: 14,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
};

export default styles;
