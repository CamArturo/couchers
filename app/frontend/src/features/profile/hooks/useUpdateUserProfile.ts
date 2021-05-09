import { useAuthContext } from "features/auth/AuthProvider";
import useCurrentUser from "features/userQueries/useCurrentUser";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { routeToUser } from "routes";
import { service, UpdateUserProfileData } from "service/index";
import { SetMutationError } from "utils/types";

interface UpdateUserProfileVariables {
  profileData: UpdateUserProfileData;
  setMutationError: SetMutationError;
}

export default function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { data: user } = useCurrentUser();
  const userId = useAuthContext().authState.userId;
  const { mutate: updateUserProfile, status, reset } = useMutation<
    Empty,
    Error,
    UpdateUserProfileVariables
  >(({ profileData }) => service.user.updateProfile(profileData), {
    onError: (error, { setMutationError }) => {
      console.error({
        error,
      });
      setMutationError(error.message);
    },
    onMutate: async ({ setMutationError }) => {
      setMutationError(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      if (user) {
        history.push(routeToUser(user.username, { tab: "about" }));
      }
    },
  });

  return { reset, status, updateUserProfile };
}
