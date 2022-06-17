import PropTypes from "prop-types";
import React, { useState } from "react";
import useSWR from "swr";

import useIssuesApi from "../useIssuesClient";

function useUserIssues({
  token,
  args = {},
}) {
  const issuesClient = useIssuesClient({ token });
  const { data, error, mutate } = useSWR(
    token && [token, "user/issues"],
    () => {
      const {
        state,
        labels,
        milestones,
        q,
        priorityRepoId,
        type,
        since,
        before,
        assigned,
        created,
        mentioned,
        reviewRequested,
        page,
        limit,
        options,
      } = args;
      return issuesClient
        .issueSearchIssues(
          state,
          labels,
          milestones,
          q,
          priorityRepoId,
          type,
          since,
          before,
          assigned,
          created,
          mentioned,
          reviewRequested,
          page,
          limit,
          options
        )
        .then(({ data }) => data);
    }
  );

  return {
    setIssue: mutate,
    issues: data,
    isLoading: !error && !data && token,
    isError: error,
  };
}

export default useUserIssues;
