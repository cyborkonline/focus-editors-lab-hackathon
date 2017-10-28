import React, { Component } from 'react';
import PropTypes from 'prop-types';

import homes from '../dev/homes.json';
import stories from '../dev/stories.json';

const data = { homes, stories };
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: localStorage.focusAppLogin || false,
    };
    this.data = data;
    this.storyMode = props.storyMode || '';
    this.regionId = props.regionId;
  }

  organizeStories(storyMode) {
    const filteredStories = this.data.stories[storyMode];
    const organizedStories = [];
    for (const story of filteredStories) { // eslint-disable-line
      if (!story.date && story.date !== 0) {
        organizedStories.push(story);
      } else {
        const componentIndex = organizedStories.findIndex(
          c => (c.date || c.date === 0) && c.date >= story.date,
        );
        if (this.regionId !== 0) {
          if (story.id === this.regionId) {
            organizedStories.splice(
              componentIndex < 0 ? organizedStories.length : componentIndex,
              0,
              story,
            );
          }
        } else {
          organizedStories.splice(
            componentIndex < 0 ? organizedStories.length : componentIndex,
            0,
            story,
          );
        }
      }
    }
    return organizedStories;
  }

  generateStoryComponent(userStories) {
    const storyElements = [];
    let storyData = [];
    if (userStories.length === 1) {
      storyData = userStories;
    } else {
      for (let i = 0; i < userStories.length; i += 1) {
        for (let j = 0; j < userStories[i].length; j += 1) {
          storyData.push(userStories[i][j]);
        }
      }
    }
    return (<h1> hey </h1>);
  }

  render() {
    let userStories = [];
    if (this.storyMode === '') {
      const reportStories = this.organizeStories('report');
      const speakStories = this.organizeStories('speak');
      userStories.push(reportStories);
      userStories.push(speakStories);
    } else {
      userStories = this.organizeStories(this.storyMode);
    }
    const storyComponent = this.generateStoryComponent(userStories);
    return (
      <div className="Timeline">
        {storyComponent}
      </div>
    );
  }
}

Timeline.propTypes = {
  storyMode: PropTypes.string,
  regionId: PropTypes.number,
};
Timeline.defaultProps = {
  storyMode: '',
  regionId: '',
};
