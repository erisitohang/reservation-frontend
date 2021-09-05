
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
          <CssBaseline />
          { children }
        </React.Fragment>
      );
};

Layout.propTypes = {
    children: PropTypes.any
};

export default Layout;
