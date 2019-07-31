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
};

export default styles;
