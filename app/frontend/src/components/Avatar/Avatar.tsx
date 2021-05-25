import { Avatar as MuiAvatar, Box, BoxProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import classNames from "classnames";
import { User } from "pb/api_pb";
import { Link } from "react-router-dom";
import { routeToUser } from "routes";

import { getProfileLinkA11yLabel } from "./constants";

const useStyles = makeStyles({
  avatar: {
    height: "100%",
    position: "absolute",
    top: 0,
    width: "100%",
    maxWidth: "288px",
    maxHeight: "288px",
  },

  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  defaultSize: {
    height: "3rem",
    width: "3rem",
  },

  grow: {
    height: 0,
    paddingTop: "min(288px, 100%)",
    width: "100%",
  },

  root: {
    flexShrink: 0,
    position: "relative",
  },
});

export interface AvatarProps extends BoxProps {
  user?: User.AsObject;
  grow?: boolean;
  className?: string;
  isProfileLink?: boolean;
}

export default function Avatar({
  user,
  grow,
  className,
  isProfileLink = true,
  ...otherProps
}: AvatarProps) {
  const classes = useStyles();

  return (
    <Box
      className={classNames(
        className,
        { [classes.defaultSize]: !className },
        classes.root,
        { [classes.grow]: grow }
      )}
      {...otherProps}
    >
      {user ? (
        isProfileLink ? (
          <Link
            className={classes.link}
            aria-label={getProfileLinkA11yLabel(user.name)}
            to={routeToUser(user.username)}
          >
            <MuiAvatar
              className={classes.avatar}
              alt={user.name}
              src={user.avatarUrl}
            >
              {user.name.split(/\s+/).map((name) => name[0])}
            </MuiAvatar>
          </Link>
        ) : (
          <MuiAvatar
            className={classes.avatar}
            alt={user.name}
            src={user.avatarUrl}
          >
            {user.name.split(/\s+/).map((name) => name[0])}
          </MuiAvatar>
        )
      ) : otherProps.children ? (
        <MuiAvatar className={classes.avatar}>{otherProps.children}</MuiAvatar>
      ) : (
        <Skeleton variant="circle" className={classes.avatar} />
      )}
    </Box>
  );
}
