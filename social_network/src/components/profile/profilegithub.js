import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetGithubrepos } from "../../actions/profile";
import "./profile.css";

function Profilegithub({ username, GetGithubrepos,githubaccount, repos }) {
  useEffect(() => {
    GetGithubrepos(username);
  }, [GetGithubrepos, username]);
  return (
    <Fragment>
      {githubaccount ? <div>
        {repos.map((repo) => (
          <div key={repo.id}>
            <div className="Card">
              <div className="profile_github">
                <div className='repo_name'>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <hr className="hr_style"/>
                  <p>{repo.description}</p>
                </div>
                <div className='repo_info'>
                  <ul>
                    <li>Stars: {repo.stargazers_count}</li>
                    <li>Watchers: {repo.watchers_count}</li>
                    <li>Forks: {repo.forks_count}</li>
                  </ul>
                </div>
              </div>
            </div>
            <br/>
          </div>
        ))}
      </div> : <h2>github account dosen't exist</h2> }
    </Fragment>
  );
}

Profilegithub.propTypes = {
  GetGithubrepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  githubaccount:PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  githubaccount:state.profile.githubaccount
});
export default connect(mapStateToProps, { GetGithubrepos })(Profilegithub);
