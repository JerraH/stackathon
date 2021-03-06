import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, BlockFeed, BlogEntry, WriteBlogEntry, MessageThread, AllMessages, WriteMessage, UserProfile, PublicMessages} from './components'
import {me} from './store'
import ErrorBoundary from './components/ErrorBoundary';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

              {/* Routes placed here are only available after logging in */}
        <Route path="/home" component={UserHome} />
        <Route path="/block-feed" component={BlockFeed} />
        <Route path="/write-blog-post" component={WriteBlogEntry} />
        <Route path="/posts/:postid" component={BlogEntry} />
        <Route exact path="/messages" component={AllMessages} />
        <Route exact path="/messages/:userId/publicmessages" component={PublicMessages} />
        <Route path="/messages/:channelId" component={MessageThread} />
        <Route exact path="/users/:userId" component={UserProfile} />
        {/* <Route path="/messages/:userId/:messagethread" component={MessageThread} /> */}


        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
