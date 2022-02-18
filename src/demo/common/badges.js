import React from 'react';
import styled from 'styled-components';

export const BugFixBadge = styled.div`
  height: 20px;
  background-color: #ef5350;
  border-radius: 30px;
  text-align: center;
  margin: 8px;
  font-size: 16px;
  padding: 2px;
`;

export const ImprovementBadge = styled.div`
  height: 20px;
  background-color: #3ca6d4;
  border-radius: 30px;
  text-align: center;
  margin: 8px;
  font-size: 16px;
  padding: 2px;
`;

export const NewFeatureBadge = styled.div`
  height: 20px;
  background-color: #81c784;
  border-radius: 30px;
  text-align: center;
  margin: 8px;
  font-size: 16px;
  padding: 2px;
`;

const LogDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const JiraLink = styled.a`
  margin: 8px;
`;

export const BugFix = ({ message, jira }) => (
  <LogDiv>
    {message}
    <JiraLink href={`https://jira.atlassian.net/browse/${jira}`}>
      {jira}
    </JiraLink>
    <BugFixBadge>BugFix</BugFixBadge>
  </LogDiv>
);

export const ImprovementFix = ({ message, jira }) => (
  <LogDiv>
    {message}
    <JiraLink href={`https://jira.atlassian.net/browse/${jira}`}>
      {jira}
    </JiraLink>
    <ImprovementBadge>Improvement</ImprovementBadge>
  </LogDiv>
);

export const NewFeatureFix = ({ message, jira }) => (
  <LogDiv>
    {message}
    <JiraLink href={`https://jira.atlassian.net/browse/${jira}`}>
      {jira}
    </JiraLink>
    <NewFeatureBadge>New Feature</NewFeatureBadge>
  </LogDiv>
);
