import React from 'react';
import PropTypes from 'prop-types';
/**
 * Get repository from DCS.
 * @param {Object} params - Token needed to make secure requests.
 * @param {string} params.ownerName - Owner name (user, organization).
 * @param {string} params.repositoryName - Repository name
 * @param {Object} params.options
 */
export function useRepository() {
  return <></>;
};

useRepository.propTypes = {
  params: PropTypes.shape({
    ownerName: PropTypes.string,
    repositoryName: PropTypes.string,
    /** see https://swr.vercel.app/docs/options#options */
    options: PropTypes.object,
    /** *dcs-js* instance config */
    config: PropTypes.object
  }),
};