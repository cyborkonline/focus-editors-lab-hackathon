import React, { Component } from 'react';
import PropTypes from 'prop-types';

import homes from '../dev/homes.json';
import stories from '../dev/stories.json';

const data = { homes, stories };
export default class Timeline extends Component {
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
    storyData = storyData.sort((a, b) => a.date > b.date);
    for (let i = 0; i < storyData.length; i += 1) {
      const story = storyData[i];
      const storyThumbnail = story.link ? '../../assets/focus_icon_withimg2.png' : '../../assets/focus_icon_withimg1.png';
      let element;
      if (story.link) {
        element = (
          <div className="story" key={i}>
            <a href={story.link} target="_blank">
              <img src={storyThumbnail} alt="focus-marker" className="story-thumbnail" />
            </a>
            <div className="story-details-report">
              <a href={story.link} target="_blank">
                <h4><b>{story.title}</b> in <i>{story.publisher}</i></h4>
              </a>
              <h5>{story.date}</h5>
            </div>
          </div>
        );
      } else {
        element = (
          <div className="story" key={i}>
            <img src={storyThumbnail} alt="focus-marker" className="story-thumbnail" />
            <div className="story-details-speak">
              <h4>{story.title}</h4>
              <h5>{story.date}</h5>
              <p>{story.content}</p>
            </div>
          </div>
        );
      }
      storyElements.push(element);
    }

    return (storyElements);
  }

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
          if (story.id === this.regionId || story.regionId === this.regionId) {
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
    console.log(userStories)
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
