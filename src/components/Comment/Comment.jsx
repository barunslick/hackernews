import React from 'react';
import './Comment.scss';
import { ITEM, USER_PROFILE } from '../../constants/url';
import mapTimeOfUpload from '../../utilites/mapTimeOfUpload';

export class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {}
    }
    this.controller = new AbortController();
    this.commentId = this.props.commentId;
  }

  async getComments() {
    let storyUrl = `${ITEM + this.commentId}.json`;
    try {
      //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
      let result = await fetch(storyUrl, { signal: this.controller.signal })
        .then(response => response.json())
        .then(data => data);
      this.setState({
        content: result,
        isLoading: false
      })
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.getComments();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const { by, time, text, kids } = this.state.content;
    return (
      <>
        {this.state.isLoading ? '' :
          <div className='Comment'>
            <div className="Comment__sub-content">
              <div className="Comment__header">
                <a className="Comment__username" href={`${USER_PROFILE + by}`}><span dangerouslySetInnerHTML={{ __html: by }} ></span></a>
                <span>&middot;</span>
                <span className="Comment__time">{mapTimeOfUpload(time)}</span>
              </div>
              <p className="Comment__text" dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>
            {(kids || []).map(comment => (
              <Comment key={comment} commentId={comment} type="child" />
            ))
            }
          </div>
        }
      </>
    )
  }
}

export default Comment;
