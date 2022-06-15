import React from 'react';
import PropTypes from 'prop-types';
/**
 * Uses DCS User API.
 * @param {Object} config - Object containing information required for Basic authorization
 * @param {string} config.username - The username
 * @param {string} config.password - The user password
 */
export function useUserApi() {
  return <></>;
};

useUserApi.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  }),
};