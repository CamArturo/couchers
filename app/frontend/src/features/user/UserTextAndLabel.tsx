import LabelAndText from "components/LabelAndText";
import {
  AGE_GENDER,
  EDUCATION,
  HOMETOWN,
  JOINED,
  LANGUAGES_FLUENT,
  LAST_ACTIVE,
  OCCUPATION,
  REFERENCES,
} from "features/constants";
import {
  LANGUAGES_FLUENT_FALSE,
  LAST_ACTIVE_FALSE,
} from "features/profile/constants";
import { User } from "pb/api_pb";
import { dateTimeFormatter, timestamp2Date } from "utils/date";
import { timeAgo } from "utils/timeAgo";

interface Props {
  user: User.AsObject;
}

export const LabelsReferencesLastActive = ({ user }: Props) => (
  <>
    <LabelAndText label={REFERENCES} text={`${user.numReferences || 0}`} />
    <LabelAndText
      label={LAST_ACTIVE}
      text={
        user.lastActive
          ? timeAgo(timestamp2Date(user.lastActive))
          : LAST_ACTIVE_FALSE
      }
    />
  </>
);

export const RemainingAboutLabels = ({ user }: Props) => (
  <>
    <LabelAndText
      label={AGE_GENDER}
      text={`${user.age} / ${user.gender} ${
        user.pronouns ? `(${user.pronouns})` : ""
      }`}
    />
    <LabelAndText
      label={LANGUAGES_FLUENT}
      text={
        user.languagesList.toString().replace(",", ", ") ||
        LANGUAGES_FLUENT_FALSE
      }
    />
    <LabelAndText label={HOMETOWN} text={user.hometown} />
    <LabelAndText label={OCCUPATION} text={user.occupation} />
    <LabelAndText label={EDUCATION} text={user.education} />
    <LabelAndText
      label={JOINED}
      text={
        user.joined ? dateTimeFormatter.format(timestamp2Date(user.joined)) : ""
      }
    />
  </>
);
