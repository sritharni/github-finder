import React, { Fragment, useEffect } from 'react'
import Spinner from '../Layouts/Spinner';
import PropTypes from 'prop-types'
import { Repos } from '../Repos/Repos';
import { Link } from 'react-router-dom';

const User = ({user, loading, getUser,getUserRepos,repos,match}) => {
    useEffect(() => {
        getUserRepos(match.params.login);
        getUser(match.params.login);
        //eslint-disabled-next-line
    },[])
    
    
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            company,
            followers,
            following,
            public_repos,
            public_gists,
            hirable
        } = user;

        if (loading) return <Spinner />

        return <Fragment>
            <Link to='/' className='btn btn-light'> Back To Search </Link>
            Hirable : {''}
            {hirable ? (<i className='fas fa-check text-success' />) : (<i className='fas fa-times-circle text-danger' />)}
            <div className='card grid-2'>
                <div className='all-centre'>
                    <img src={avatar_url} alt='' className='round-img' style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>

                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'> Visit Github Profile</a>
                    <ul>
                        <li>
                            {login &&  <Fragment>
                                <strong> Username:</strong> {login}
                                 </Fragment>}
                        </li>
                        <li>
                            {company &&  <Fragment>
                                <strong> Company:</strong> {company}
                                 </Fragment>}
                        </li>
                        <li>
                            {blog &&  <Fragment>
                                <strong> Blog:</strong> {blog}
                                 </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'> Followers: {followers} </div>
                <div className='badge badge-success'> Following: {following} </div>
                <div className='badge badge-danger'> Public Repos: {public_repos} </div>
                <div className='badge badge-dark'> Public Gists: {public_gists} </div>
            </div>
            <Repos repos={repos}/>
        </Fragment>

  
}
User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired
}
export default User
