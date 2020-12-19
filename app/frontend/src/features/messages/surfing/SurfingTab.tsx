import { Box, BoxProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import * as React from "react";
import { useEffect, useState } from "react";
import Alert from "../../../components/Alert";
import CircularProgress from "../../../components/CircularProgress";
import { GroupChat } from "../../../pb/conversations_pb";
import { HostRequest } from "../../../pb/requests_pb";
import { useAppDispatch, useTypedSelector } from "../../../store";
import HostRequestList from "./HostRequestList";
import { fetchHostRequests } from "./hostRequestsActions";
import HostRequestView from "./HostRequestView";

const useStyles = makeStyles({ root: {} });

export interface GroupChatListProps extends BoxProps {
  groupChats: Array<GroupChat.AsObject>;
}

export default function SurfingTab() {
  const [hostRequest, setHostRequest] = useState<HostRequest.AsObject | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    setError("");
    (async () => {
      setLoading(true);
      try {
        const actionCreator = fetchHostRequests({});
        const action = await dispatch(actionCreator);
        await unwrapResult(action as any);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    })();
  }, [dispatch]);
  const hostRequests = useTypedSelector(
    (state) => state.hostRequests.hostRequests
  );
  console.log(hostRequests);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {hostRequest ? (
        <HostRequestView hostRequest={hostRequest} />
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          {loading ? (
            <CircularProgress />
          ) : (
            hostRequests && (
              <HostRequestList
                hostRequests={hostRequests}
                setHostRequest={setHostRequest}
              />
            )
          )}
        </>
      )}
    </Box>
  );
}
