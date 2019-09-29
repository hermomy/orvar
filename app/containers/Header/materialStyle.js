const styles = {
    navLink: {
        color: 'black',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': { color: '#603' },
    },
    icon: {
        height: 23,
        width: 23,
    },
    header: {
        boxShadow: '0 4px 2px -2px #ccc',
        padding: '1rem',
        backgroundColor: 'white',
    },
    headerMobile: {
        boxShadow: '0 4px 2px -2px #ccc',
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
        color: '#000',
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
    cardCart: {
        width: '35rem',
    },
    // arrowDiv: {
    //     position: 'absolute',
    //     fontSize: 14,
    //     width: '3em',
    //     height: '3em',
    //     top: 0,
    //     left: 0,
    //     marginTop: '-0.9em',
    //     '&::before': {
    //         content: '""',
    //         margin: 'auto',
    //         display: 'block',
    //         width: 0,
    //         height: 0,
    //         borderWidth: '0 1em 1em 1em',
    //         borderColor: 'transparent transparent #F2F2F2 transparent',
    //         borderStyle: 'solid',
    //     },
    // },
};

export default styles;
