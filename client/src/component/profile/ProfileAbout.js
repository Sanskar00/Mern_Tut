import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
    skills,
  },
}) => {
  return (
    <Fragment>
      <div class="profile-about bg-light p-2">
        {bio && (
          <div>
            <h2 class="text-primary">{name}'s Bio</h2>
            <p>{bio}</p>
            <div class="line"></div>
          </div>
        )}

        <h2 class="text-primary">Skill Set</h2>
        <div class="skills">
          {skills.map((skill) => (
            <div class="p-1">
              <i class="fa fa-check"></i>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
