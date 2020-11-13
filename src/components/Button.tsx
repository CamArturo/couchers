import {
  makeStyles,
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
  Box,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {},
});

type AppButtonProps = ButtonProps & {
  loading?: boolean;
};

export default function Button(props: AppButtonProps) {
  const {
    children,
    disabled,
    onClick,
    className,
    loading,
    ...otherProps
  } = props;

  const clicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const styles = useStyles();
  return (
    <MuiButton
      {...otherProps}
      disabled={disabled ? true : loading}
      onClick={onClick ? clicked : undefined}
      className={`${styles.root} ${className}`}
    >
      {children}
      {loading && (
        <Box marginLeft="8px">
          <CircularProgress />
        </Box>
      )}
    </MuiButton>
  );
}
